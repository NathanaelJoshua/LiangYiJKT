-- Liang Yi CMS schema (Neon / Postgres)
-- Run against your Neon database (psql, Neon SQL editor, or `npm run db:setup`).

create table if not exists cms_users (
  id            text primary key,
  name          text not null,
  email         text not null unique,
  role          text not null default 'Editor',
  active        boolean not null default true,
  password_hash text not null,
  created_at    timestamptz not null default now()
);

-- Singletons (company profile, page content, pricing) stored by key.
create table if not exists cms_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists cms_services (
  id         text primary key,
  sort       integer not null default 0,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists cms_articles (
  slug       text primary key,
  sort       integer not null default 0,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists cms_locations (
  id         text primary key,
  sort       integer not null default 0,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists cms_physicians (
  id         text primary key,
  sort       integer not null default 0,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists cms_partners (
  id         text primary key,
  sort       integer not null default 0,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists cms_testimonials (
  id         text primary key,
  sort       integer not null default 0,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);
