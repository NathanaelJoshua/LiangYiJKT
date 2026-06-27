import type { IncomingMessage, ServerResponse } from "node:http";
import app, { ready } from "../src/server/index";

// Vercel routes every /api/* request here. Static import (above) ensures the server
// code is bundled into the function; the try/catch surfaces runtime init errors as JSON.
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
