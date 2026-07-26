-- Run this AFTER the original schema.sql to add DR Horton NC Homes fields
-- to the existing leads table. Safe to re-run — uses IF NOT EXISTS.

-- Expand leads with DR Horton-specific tracking fields.
alter table leads
  add column if not exists city_slug text,           -- charlotte, mooresville, etc.
  add column if not exists variant text,             -- form variant: A, B, or C
  add column if not exists is_organic_seller boolean not null default false,
  add column if not exists home_contingency text,    -- yes-need-sell / owns-no-need / renting / browsing
  add column if not exists trade_in_address text,    -- from Step 2 of variants B & C
  add column if not exists budget text,              -- under-350 / 350-450 / 450-plus / move-in-ready
  add column if not exists timeline text,            -- immediate / 30-90 / 6-plus
  add column if not exists move_in_ready boolean,
  add column if not exists crm_routing_tag text,     -- DRH-[City]-Buyer or Organic-Seller-[City]
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term text,
  add column if not exists sms_consent boolean not null default false,
  add column if not exists status text not null default 'complete';
  -- status values: 'complete' (all 3 steps), 'partial' (bailed at step 3)

comment on column leads.status is
  'complete = full form submission with contact info; partial = step-2 abandon with seller address captured';

create index if not exists leads_city_slug_idx on leads (city_slug);
create index if not exists leads_status_idx on leads (status);
create index if not exists leads_organic_seller_idx on leads (is_organic_seller)
  where is_organic_seller = true;
create index if not exists leads_routing_tag_idx on leads (crm_routing_tag);

-- No change needed to RLS: leads remain service-role-only.
