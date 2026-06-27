import type { IncomingMessage, ServerResponse } from "node:http";
import app, { ready } from "./index";

/**
 * Vercel serverless entry. This file is bundled by esbuild into
 * `api/[...path].js` at build time (see package.json "build:api"), so all the
 * relative server imports are inlined — no runtime module resolution needed.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    await ready;
    return (app as unknown as (req: IncomingMessage, res: ServerResponse) => void)(req, res);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ error: "Server init failed", detail: message }));
  }
}
