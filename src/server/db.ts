import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import {
  services as seedServices,
  articles as seedArticles,
  pricing as seedPricing,
  plans as seedPlans,
  clinics as seedClinics,
  physicians as seedPhysicians,
  partners as seedPartners,
  testimonials as seedTestimonials,
  loc,
  BRAND,
} from "../lib/content";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env and add your Neon connection string.");
}

export const sql = neon(process.env.DATABASE_URL);

const DEMO_PASSWORD = process.env.ADMIN_PASSWORD || "liangyi";

export const defaultCompany = {
  name: BRAND.name,
  est: BRAND.est,
  tagline: BRAND.tagline,
  positioning: BRAND.positioning,
  email: BRAND.email,
  phone: BRAND.phone,
  whatsapp: BRAND.whatsapp,
  address: "12 clinics islandwide, Singapore",
  hours: "10am – 10pm daily · Consultations 11am – 8pm",
  socials: BRAND.socials,
};

export const defaultPages = {
  Home: {
    "Hero badge": loc("Awarded TCM centre · Est. 2016"),
    "Hero headline": loc("Our greatest wealth is health."),
    "Hero intro": BRAND.positioning,
    "Services heading": loc("Result-oriented TCM for your health needs"),
    "Testimonials heading": loc("Words of praise from our patients."),
  },
  About: {
    Eyebrow: loc("About us"),
    Headline: loc("Trusted expertise, tailored care, and lasting wellness."),
    Intro: loc(
      "Established in 2016, Liang Yi has blended a 2,000-year tradition with modern rigour to create a truly calming TCM experience."
    ),
  },
  Services: {
    Eyebrow: loc("Our services"),
    Headline: loc("Result-oriented TCM for your health needs"),
  },
  Locations: {
    Eyebrow: loc("Clinic Locations"),
    Headline: loc("Find us, wherever you are in Singapore"),
  },
  Insights: { Eyebrow: loc("Insights"), Headline: loc("Notes from the clinic") },
  Contact: { Eyebrow: loc("Contact us"), Headline: loc("Let's talk about your health") },
};

export async function ensureSchema() {
  await sql`create table if not exists cms_users (
    id text primary key,
    name text not null,
    email text not null unique,
    role text not null default 'Editor',
    active boolean not null default true,
    password_hash text not null,
    created_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_settings (
    key text primary key,
    value jsonb not null,
    updated_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_services (
    id text primary key,
    sort integer not null default 0,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_articles (
    slug text primary key,
    sort integer not null default 0,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_locations (
    id text primary key,
    sort integer not null default 0,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_physicians (
    id text primary key,
    sort integer not null default 0,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_partners (
    id text primary key,
    sort integer not null default 0,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_testimonials (
    id text primary key,
    sort integer not null default 0,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
}

export async function seedIfEmpty() {
  // Users
  const users = (await sql`select count(*)::int as n from cms_users`) as { n: number }[];
  if (users[0].n === 0) {
    const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
    await sql`insert into cms_users (id, name, email, role, active, password_hash)
      values ('u1', 'Site Admin', 'admin@liangyi.sg', 'Admin', true, ${hash}),
             ('u2', 'Editorial', 'editor@liangyi.sg', 'Editor', true, ${hash})`;
  }

  // Settings
  const settings = (await sql`select count(*)::int as n from cms_settings`) as { n: number }[];
  if (settings[0].n === 0) {
    await sql`insert into cms_settings (key, value) values ('company', ${JSON.stringify(defaultCompany)})`;
    await sql`insert into cms_settings (key, value) values ('pages', ${JSON.stringify(defaultPages)})`;
    await sql`insert into cms_settings (key, value) values ('pricing', ${JSON.stringify({ groups: seedPricing, plans: seedPlans })})`;
  }

  // Services
  const svc = (await sql`select count(*)::int as n from cms_services`) as { n: number }[];
  if (svc[0].n === 0) {
    let i = 0;
    for (const s of seedServices) {
      await sql`insert into cms_services (id, sort, data) values (${s.id}, ${i++}, ${JSON.stringify(s)})`;
    }
  }

  // Articles
  const art = (await sql`select count(*)::int as n from cms_articles`) as { n: number }[];
  if (art[0].n === 0) {
    let i = 0;
    for (const a of seedArticles) {
      await sql`insert into cms_articles (slug, sort, data) values (${a.slug}, ${i++}, ${JSON.stringify(a)})`;
    }
  }

  // Locations
  const loc = (await sql`select count(*)::int as n from cms_locations`) as { n: number }[];
  if (loc[0].n === 0) {
    let i = 0;
    for (const c of seedClinics) {
      const id = `loc-${i}`;
      await sql`insert into cms_locations (id, sort, data) values (${id}, ${i}, ${JSON.stringify({ id, ...c })})`;
      i++;
    }
  }

  // Physicians
  const phys = (await sql`select count(*)::int as n from cms_physicians`) as { n: number }[];
  if (phys[0].n === 0) {
    let i = 0;
    for (const p of seedPhysicians) {
      const id = `phys-${i}`;
      await sql`insert into cms_physicians (id, sort, data) values (${id}, ${i}, ${JSON.stringify({ id, ...p })})`;
      i++;
    }
  }

  // Partners
  const part = (await sql`select count(*)::int as n from cms_partners`) as { n: number }[];
  if (part[0].n === 0) {
    let i = 0;
    for (const p of seedPartners) {
      const id = `partner-${i}`;
      const data = { id, name: p.name, image: `https://cdn.simpleicons.org/${p.slug}/52e7ce` };
      await sql`insert into cms_partners (id, sort, data) values (${id}, ${i}, ${JSON.stringify(data)})`;
      i++;
    }
  }

  // Testimonials
  const tess = (await sql`select count(*)::int as n from cms_testimonials`) as { n: number }[];
  if (tess[0].n === 0) {
    let i = 0;
    for (const t of seedTestimonials) {
      const id = `tess-${i}`;
      await sql`insert into cms_testimonials (id, sort, data) values (${id}, ${i}, ${JSON.stringify({ id, ...t })})`;
      i++;
    }
  }
}
