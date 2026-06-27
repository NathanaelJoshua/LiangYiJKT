import type { IncomingMessage, ServerResponse } from "node:http";

// Vercel routes every /api/* request here. We import the Express app lazily so an
// import-time failure (e.g. missing DATABASE_URL) surfaces as a readable JSON error
// instead of an opaque FUNCTION_INVOCATION_FAILED crash.
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const mod = await import("../src/server/index");
    await mod.ready;
    return (mod.default as unknown as (req: IncomingMessage, res: ServerResponse) => void)(req, res);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ error: "Server init failed", detail: message }));
  }
}
