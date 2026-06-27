import type { IncomingMessage, ServerResponse } from "node:http";
import app, { ready } from "../src/server/index";

// Vercel routes every /api/* request here. We await schema/seed readiness once,
// then hand the request to the Express app (which matches on the original /api/... URL).
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  await ready;
  return (app as unknown as (req: IncomingMessage, res: ServerResponse) => void)(req, res);
}
