import "dotenv/config";
import path from "node:path";
import { mkdirSync, unlinkSync } from "node:fs";
import { fileURLToPath } from "node:url";
import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sql, ensureSchema, seedIfEmpty, defaultPages } from "./db";

const PORT = Number(process.env.PORT) || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

/* ---------- file uploads ---------- */

// On Vercel the deployment filesystem is read-only except /tmp (and ephemeral).
const uploadsDir = process.env.VERCEL
  ? "/tmp/uploads"
  : fileURLToPath(new URL("../../uploads", import.meta.url));
mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    cb(null, `${base}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB (covers short videos)
  fileFilter: (_req, file, cb) => {
    const ok = /^(image|video)\//.test(file.mimetype);
    cb(ok ? null : new Error("Only image and video files are allowed"), ok);
  },
});

// Serve uploaded files (proxied via /api in dev).
app.use("/api/uploads", express.static(uploadsDir));

/* ---------- helpers ---------- */

async function getSetting<T>(key: string): Promise<T | null> {
  const rows = (await sql`select value from cms_settings where key = ${key}`) as { value: T }[];
  return rows[0]?.value ?? null;
}

/** Deep-merge stored page content over the seed defaults (stored values win). */
function mergePages(stored: Record<string, Record<string, unknown>> | null) {
  const out: Record<string, Record<string, unknown>> = {};
  const pageNames = new Set([...Object.keys(defaultPages), ...Object.keys(stored ?? {})]);
  for (const page of pageNames) {
    const def = (defaultPages as Record<string, Record<string, unknown>>)[page] ?? {};
    const cur = stored?.[page] ?? {};
    out[page] = { ...def, ...cur };
  }
  return out;
}

async function putSetting(key: string, value: unknown) {
  await sql`insert into cms_settings (key, value, updated_at)
    values (${key}, ${JSON.stringify(value)}, now())
    on conflict (key) do update set value = excluded.value, updated_at = now()`;
}

interface AuthedRequest extends Request {
  user?: { email: string; role: string };
}

function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    req.user = jwt.verify(token, JWT_SECRET) as { email: string; role: string };
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
}

const wrap =
  (fn: (req: AuthedRequest, res: Response) => Promise<unknown>) =>
  (req: Request, res: Response) =>
    fn(req, res).catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });

/* ---------- auth ---------- */

app.post(
  "/api/auth/login",
  wrap(async (req, res) => {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    const rows = (await sql`select id, name, email, role, active, password_hash
      from cms_users where lower(email) = lower(${email})`) as {
      id: string;
      name: string;
      email: string;
      role: string;
      active: boolean;
      password_hash: string;
    }[];
    const user = rows[0];
    if (!user || !user.active) return res.status(401).json({ error: "No active account with that email" });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Incorrect password" });
    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "12h" });
    return res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  })
);

/* ---------- bootstrap (public read) ---------- */

app.get(
  "/api/bootstrap",
  wrap(async (_req, res) => {
    const [company, storedPages, pricing] = await Promise.all([
      getSetting("company"),
      getSetting<Record<string, Record<string, unknown>>>("pages"),
      getSetting("pricing"),
    ]);
    // Merge default page fields with stored overrides so newly-added fields
    // appear in the admin/public even when the DB was seeded earlier (stored wins).
    const pages = mergePages(storedPages);
    const services = (await sql`select data from cms_services order by sort, id`) as { data: unknown }[];
    const articles = (await sql`select data from cms_articles order by sort, slug`) as { data: unknown }[];
    const locations = (await sql`select data from cms_locations order by sort, id`) as { data: unknown }[];
    const physicians = (await sql`select data from cms_physicians order by sort, id`) as { data: unknown }[];
    const partners = (await sql`select data from cms_partners order by sort, id`) as { data: unknown }[];
    const testimonials = (await sql`select data from cms_testimonials order by sort, id`) as { data: unknown }[];
    const users = await sql`select id, name, email, role, active from cms_users order by created_at`;
    res.json({
      company,
      pages,
      pricing,
      services: services.map((r) => r.data),
      articles: articles.map((r) => r.data),
      locations: locations.map((r) => r.data),
      physicians: physicians.map((r) => r.data),
      partners: partners.map((r) => r.data),
      testimonials: testimonials.map((r) => r.data),
      users,
    });
  })
);

/* ---------- settings ---------- */

app.put("/api/company", requireAuth, wrap(async (req, res) => {
  await putSetting("company", req.body);
  res.json({ ok: true });
}));

app.put("/api/pages", requireAuth, wrap(async (req, res) => {
  await putSetting("pages", req.body);
  res.json({ ok: true });
}));

app.put("/api/pricing", requireAuth, wrap(async (req, res) => {
  await putSetting("pricing", req.body);
  res.json({ ok: true });
}));

/* ---------- users ---------- */

app.post("/api/users", requireAuth, wrap(async (req, res) => {
  const { id, name, email, role, active, password } = req.body ?? {};
  const hash = await bcrypt.hash(password || "liangyi", 10);
  await sql`insert into cms_users (id, name, email, role, active, password_hash)
    values (${id}, ${name}, ${email}, ${role}, ${active ?? true}, ${hash})`;
  res.json({ ok: true });
}));

app.put("/api/users/:id", requireAuth, wrap(async (req, res) => {
  const { name, email, role, active, password } = req.body ?? {};
  if (password) {
    const hash = await bcrypt.hash(password, 10);
    await sql`update cms_users set name=${name}, email=${email}, role=${role}, active=${active}, password_hash=${hash} where id=${req.params.id}`;
  } else {
    await sql`update cms_users set name=${name}, email=${email}, role=${role}, active=${active} where id=${req.params.id}`;
  }
  res.json({ ok: true });
}));

app.delete("/api/users/:id", requireAuth, wrap(async (req, res) => {
  const rows = (await sql`select role from cms_users where id=${req.params.id}`) as { role: string }[];
  if (rows[0]?.role === "Admin") return res.status(403).json({ error: "Admin accounts cannot be deleted" });
  await sql`delete from cms_users where id=${req.params.id}`;
  res.json({ ok: true });
}));

/* ---------- services ---------- */

app.post("/api/services", requireAuth, wrap(async (req, res) => {
  const s = req.body ?? {};
  const next = (await sql`select coalesce(max(sort), -1) + 1 as n from cms_services`) as { n: number }[];
  await sql`insert into cms_services (id, sort, data) values (${s.id}, ${next[0].n}, ${JSON.stringify(s)})`;
  res.json({ ok: true });
}));

app.put("/api/services/:id", requireAuth, wrap(async (req, res) => {
  await sql`update cms_services set data=${JSON.stringify(req.body)}, updated_at=now() where id=${req.params.id}`;
  res.json({ ok: true });
}));

app.delete("/api/services/:id", requireAuth, wrap(async (req, res) => {
  await sql`delete from cms_services where id=${req.params.id}`;
  res.json({ ok: true });
}));

/* ---------- articles ---------- */

app.post("/api/articles", requireAuth, wrap(async (req, res) => {
  const a = req.body ?? {};
  const next = (await sql`select coalesce(max(sort), -1) + 1 as n from cms_articles`) as { n: number }[];
  await sql`insert into cms_articles (slug, sort, data) values (${a.slug}, ${next[0].n}, ${JSON.stringify(a)})`;
  res.json({ ok: true });
}));

app.put("/api/articles/:slug", requireAuth, wrap(async (req, res) => {
  await sql`update cms_articles set data=${JSON.stringify(req.body)}, updated_at=now() where slug=${req.params.slug}`;
  res.json({ ok: true });
}));

app.delete("/api/articles/:slug", requireAuth, wrap(async (req, res) => {
  await sql`delete from cms_articles where slug=${req.params.slug}`;
  res.json({ ok: true });
}));

/* ---------- locations ---------- */

app.post("/api/locations", requireAuth, wrap(async (req, res) => {
  const l = req.body ?? {};
  const next = (await sql`select coalesce(max(sort), -1) + 1 as n from cms_locations`) as { n: number }[];
  await sql`insert into cms_locations (id, sort, data) values (${l.id}, ${next[0].n}, ${JSON.stringify(l)})`;
  res.json({ ok: true });
}));

app.put("/api/locations/:id", requireAuth, wrap(async (req, res) => {
  await sql`update cms_locations set data=${JSON.stringify(req.body)}, updated_at=now() where id=${req.params.id}`;
  res.json({ ok: true });
}));

app.delete("/api/locations/:id", requireAuth, wrap(async (req, res) => {
  await sql`delete from cms_locations where id=${req.params.id}`;
  res.json({ ok: true });
}));

/* ---------- physicians ---------- */

app.post("/api/physicians", requireAuth, wrap(async (req, res) => {
  const p = req.body ?? {};
  const next = (await sql`select coalesce(max(sort), -1) + 1 as n from cms_physicians`) as { n: number }[];
  await sql`insert into cms_physicians (id, sort, data) values (${p.id}, ${next[0].n}, ${JSON.stringify(p)})`;
  res.json({ ok: true });
}));

app.put("/api/physicians/:id", requireAuth, wrap(async (req, res) => {
  await sql`update cms_physicians set data=${JSON.stringify(req.body)}, updated_at=now() where id=${req.params.id}`;
  res.json({ ok: true });
}));

app.delete("/api/physicians/:id", requireAuth, wrap(async (req, res) => {
  await sql`delete from cms_physicians where id=${req.params.id}`;
  res.json({ ok: true });
}));

/* ---------- partners ---------- */

app.post("/api/partners", requireAuth, wrap(async (req, res) => {
  const p = req.body ?? {};
  const next = (await sql`select coalesce(max(sort), -1) + 1 as n from cms_partners`) as { n: number }[];
  await sql`insert into cms_partners (id, sort, data) values (${p.id}, ${next[0].n}, ${JSON.stringify(p)})`;
  res.json({ ok: true });
}));

app.put("/api/partners/:id", requireAuth, wrap(async (req, res) => {
  await sql`update cms_partners set data=${JSON.stringify(req.body)}, updated_at=now() where id=${req.params.id}`;
  res.json({ ok: true });
}));

app.delete("/api/partners/:id", requireAuth, wrap(async (req, res) => {
  await sql`delete from cms_partners where id=${req.params.id}`;
  res.json({ ok: true });
}));

/* ---------- testimonials ---------- */

app.post("/api/testimonials", requireAuth, wrap(async (req, res) => {
  const t = req.body ?? {};
  const next = (await sql`select coalesce(max(sort), -1) + 1 as n from cms_testimonials`) as { n: number }[];
  await sql`insert into cms_testimonials (id, sort, data) values (${t.id}, ${next[0].n}, ${JSON.stringify(t)})`;
  res.json({ ok: true });
}));

app.put("/api/testimonials/:id", requireAuth, wrap(async (req, res) => {
  await sql`update cms_testimonials set data=${JSON.stringify(req.body)}, updated_at=now() where id=${req.params.id}`;
  res.json({ ok: true });
}));

app.delete("/api/testimonials/:id", requireAuth, wrap(async (req, res) => {
  await sql`delete from cms_testimonials where id=${req.params.id}`;
  res.json({ ok: true });
}));

/* ---------- upload ---------- */

// Multer runs first so the request body is fully consumed before we respond —
// responding to an unread upload stream resets the socket (ERR_CONNECTION_ABORTED).
app.post("/api/upload", upload.single("file"), (req: AuthedRequest, res: Response) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  try {
    if (!token) throw new Error("no token");
    req.user = jwt.verify(token, JWT_SECRET) as { email: string; role: string };
  } catch {
    if (req.file) {
      try {
        unlinkSync(req.file.path);
      } catch {
        /* ignore */
      }
    }
    return res.status(401).json({ error: "Not authenticated" });
  }
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ url: `/api/uploads/${req.file.filename}`, type: req.file.mimetype });
});

// JSON error handler (e.g. file too large / wrong type)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(400).json({ error: err.message || "Request error" });
});

/* ---------- boot ---------- */

// Runs once per process (incl. each serverless cold start) before requests are served.
export const ready: Promise<void> = (async () => {
  await ensureSchema();
  await seedIfEmpty();
})();

// Local dev: start a long-running HTTP server. On Vercel the app is exported and
// invoked per-request as a serverless function instead (see api/[...path].ts).
if (!process.env.VERCEL) {
  ready
    .then(() => app.listen(PORT, () => console.log(`CMS API on http://localhost:${PORT}`)))
    .catch((err) => {
      console.error("Failed to start server:", err);
      process.exit(1);
    });
}

export default app;
