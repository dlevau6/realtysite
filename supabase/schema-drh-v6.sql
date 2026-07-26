-- Run this AFTER schema-drh-v5.sql. Adds lead-source tracking so the
-- existing /admin/leads table can show BOTH leads captured by our own
-- forms AND leads iHomefinder's native IDX search widget captures on
-- Eric's behalf (once/if that forwarding mechanism is confirmed and
-- turned on) — see src/lib/ihomefinder.ts for the full "what's real vs.
-- placeholder" explanation. Safe to re-run — uses IF NOT EXISTS.

alter table leads
  add column if not exists lead_source text not null default 'site',
  -- 'site' = came in through our own buyer/seller funnels (existing rows
  -- default here). 'ihomefinder_native' = pulled in from iHomefinder's
  -- own search-widget lead capture via the inbound webhook receiver.
  add column if not exists ihomefinder_contact_id text,
  -- iHomefinder's ID for this person, once we've successfully pushed
  -- (or received) a matching contact. Null until synced either direction.
  add column if not exists synced_to_ihomefinder_at timestamptz;
  -- Set when a *site* lead has been successfully pushed to iHomefinder's
  -- CRM. Left null for ihomefinder_native rows (they originated there).

comment on column leads.lead_source is
  'site = our own funnels; ihomefinder_native = iHomefinder search widget lead, pulled in via /api/webhooks/ihomefinder';

create index if not exists leads_lead_source_idx on leads (lead_source);

-- Settings rows for the iHomefinder integration. All blank/disabled by
-- default — nothing fires until Eric gets real API credentials and
-- endpoint docs from his iHomefinder account rep and these are filled
-- in from /admin/settings. See src/lib/ihomefinder.ts header comment.
insert into settings (key, value, description, is_secret) values
  ('ihomefinder_sync_enabled', 'false', 'Master switch for the iHomefinder CRM sync. Must be exactly "true" to push/pull anything — leave "false" until the integration below has been tested with real credentials.', false),
  ('ihomefinder_push_endpoint', null, 'UNCONFIRMED — full URL iHomefinder gives you for creating/updating a contact via their Client API or Lead Forwarding API. Get this from Eric''s iHomefinder account rep; do not guess.', false),
  ('ihomefinder_api_key', null, 'UNCONFIRMED — API key/Bearer token for the endpoint above, from Eric''s iHomefinder account.', true),
  ('ihomefinder_webhook_secret', null, 'Shared secret WE generate (e.g. openssl rand -hex 20) and give to iHomefinder support to append as ?secret=... on the URL they forward native leads to. Protects /api/webhooks/ihomefinder from randoms.', true)
on conflict (key) do nothing;
