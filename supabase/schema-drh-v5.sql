-- Run AFTER schema-drh-v4.sql. Adds the two tables behind the new
-- /admin/content editor, so Eric (or Melissa) can edit city copy and
-- community listings themselves without a code deploy.
--
-- Both tables are service-role only, same pattern as `settings` — no
-- public policy. All reads/writes go through the app's server routes
-- with the service key, which is what enforces the field-level
-- guardrails (allowed status values, character limits, etc.) — the
-- database itself only enforces the coarse constraints below.
--
-- IMPORTANT: this table intentionally does NOT include anything that's
-- legally/compliance load-bearing (the equal-prominence header, TCPA
-- consent language, IDX disclaimers, JSON-LD schema). Those stay
-- hardcoded in components — see ComplianceHeader.tsx and Schema.tsx.
-- Don't add columns here for that content without re-reading Section 5
-- of the client's spec doc first.
--
-- Until you run this + the seed script, the site keeps working exactly
-- as before — city-content.ts and communities.ts are the fallback data
-- source whenever a row is missing here.

create table if not exists city_content (
  city_slug text primary key,
  meta_description text not null,
  intro text not null,
  -- [{ "title": "...", "body": "..." }, ...]
  highlights jsonb not null default '[]'::jsonb,
  -- [{ "name": "...", "drHortonUrl": "...", "bullets": ["...", ...] }, ...]
  community_groups jsonb,
  updated_at timestamptz not null default now()
);

alter table city_content enable row level security;
-- No public policy: service-role only, same as settings.

create table if not exists communities (
  id uuid primary key default gen_random_uuid(),
  city_slug text not null,
  slug text not null,
  name text not null,
  status text not null check (
    status in ('selling', 'coming-soon', 'final-homes', 'verify', 'sold-out')
  ),
  starting_price text,
  descriptor text,
  dr_horton_url text,
  updated_at timestamptz not null default now(),
  unique (city_slug, slug)
);

alter table communities enable row level security;
-- No public policy: service-role only, same as settings.

create index if not exists communities_city_slug_idx on communities (city_slug);

-- Seed data is intentionally NOT included here — after running this
-- file, run `scripts/seed-content.ts` (see that file's header for exact
-- command) to push the existing 19 cities' worth of content straight out
-- of src/lib/city-content.ts and src/lib/communities.ts, so nothing gets
-- hand-retyped or drifts from what's already live.
