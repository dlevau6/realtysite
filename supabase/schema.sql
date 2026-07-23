-- Run this in the Supabase SQL editor (or via `supabase db push`) after
-- creating the project. Sets up the three core tables plus RLS policies
-- so the public anon key can only read active listings/neighborhoods,
-- never write, and never read leads.

create extension if not exists "pgcrypto";

create table if not exists neighborhoods (
  slug text primary key,
  name text not null,
  city text not null,
  state text not null,
  summary text not null default '',
  body text not null default '',
  hero_image_url text,
  latitude double precision,
  longitude double precision
);

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  mls_number text unique not null,
  slug text unique not null,
  status text not null default 'Active',
  list_price numeric not null,
  address_line text not null,
  city text not null,
  state text not null,
  zip text not null,
  neighborhood_slug text references neighborhoods(slug),
  bedrooms int not null default 0,
  bathrooms numeric not null default 0,
  square_feet int not null default 0,
  lot_size_acres numeric,
  year_built int,
  description text not null default '',
  latitude double precision,
  longitude double precision,
  primary_photo_url text,
  photo_urls text[] not null default '{}',
  listing_agent_name text not null default '',
  listing_office_name text not null default '',
  mls_name text not null default '',
  idx_disclaimer text not null default '',
  last_synced_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text,
  listing_id uuid references listings(id),
  source_page text not null,
  created_at timestamptz not null default now()
);

alter table listings enable row level security;
alter table neighborhoods enable row level security;
alter table leads enable row level security;

-- Public (anon key) can read active listings and all neighborhoods,
-- but cannot write to either table.
create policy "Public can read active listings"
  on listings for select
  using (status in ('Active', 'Coming Soon'));

create policy "Public can read neighborhoods"
  on neighborhoods for select
  using (true);

-- No public policies on `leads` at all — only the service role
-- (used server-side in /api/lead and the sync job) can read/write it.

create index if not exists listings_status_idx on listings (status);
create index if not exists listings_neighborhood_idx on listings (neighborhood_slug);
create index if not exists listings_city_idx on listings (city);
