-- Run this AFTER schema-drh.sql to add seller-funnel fields.
-- Safe to re-run — uses IF NOT EXISTS.

alter table leads
  add column if not exists lead_type text not null default 'buyer',
  -- 'buyer' from the 3-step buyer funnel; 'seller' from /home-value
  add column if not exists property_condition_tags text[],
  -- e.g. ['renovated-kitchen', 'new-roof-hvac', 'updated-baths']
  add column if not exists also_looking_to_buy boolean;

comment on column leads.lead_type is
  'buyer = came in via 3-step buyer funnel; seller = came in via /home-value';

create index if not exists leads_lead_type_idx on leads (lead_type);
