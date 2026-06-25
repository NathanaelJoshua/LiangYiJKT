import "dotenv/config";
import { ensureSchema, seedIfEmpty } from "./db";

/** One-shot: create tables + seed from current site content. `npm run db:setup` */
async function run() {
  console.log("Creating schema…");
  await ensureSchema();
  console.log("Seeding (only if empty)…");
  await seedIfEmpty();
  console.log("Done. Default logins: admin@liangyi.sg / editor@liangyi.sg — password 'liangyi'.");
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
