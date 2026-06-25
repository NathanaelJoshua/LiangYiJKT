import "dotenv/config";
import { sql, defaultPages, defaultCompany } from "./db";
import { services, articles, pricing, plans, testimonials } from "../lib/content";

/**
 * Refresh the content that became bilingual (services, articles, page content,
 * pricing, testimonials, company tagline/positioning) to the new { en, id }
 * shape. Leaves users, locations, physicians and partners untouched.
 * Run with `npm run db:reseed`.
 */
async function run() {
  await sql`delete from cms_services`;
  let i = 0;
  for (const s of services) {
    await sql`insert into cms_services (id, sort, data) values (${s.id}, ${i++}, ${JSON.stringify(s)})`;
  }

  await sql`delete from cms_articles`;
  i = 0;
  for (const a of articles) {
    await sql`insert into cms_articles (slug, sort, data) values (${a.slug}, ${i++}, ${JSON.stringify(a)})`;
  }

  await sql`delete from cms_testimonials`;
  i = 0;
  for (const t of testimonials) {
    const id = `tess-${i}`;
    await sql`insert into cms_testimonials (id, sort, data) values (${id}, ${i++}, ${JSON.stringify({ id, ...t })})`;
  }

  const settings: [string, unknown][] = [
    ["pages", defaultPages],
    ["pricing", { groups: pricing, plans }],
    ["company", defaultCompany],
  ];
  for (const [key, value] of settings) {
    await sql`insert into cms_settings (key, value, updated_at)
      values (${key}, ${JSON.stringify(value)}, now())
      on conflict (key) do update set value = excluded.value, updated_at = now()`;
  }

  console.log("Re-seeded services, articles, page content, pricing, testimonials and company (bilingual).");
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
