-- Run AFTER schema-drh-v2.sql. Adds the settings table used by the admin
-- control panel to store webhook URLs, analytics IDs, and notification
-- addresses without needing to redeploy on env-var changes.
--
-- The table is service-role only — no public policy. All reads go through
-- the app's server routes with the service key.

create table if not exists settings (
  key text primary key,
  value text,
  description text,
  is_secret boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table settings enable row level security;
-- No public policy: settings is service-role only.

-- Pre-populate the keys the admin panel expects, so the settings page
-- can render sections even before Eric fills anything in.
insert into settings (key, value, description, is_secret) values
  ('structurely_webhook_url', null, 'Structurely (AI SMS) inbound webhook — leads POSTed here for 60-second SMS follow-up', true),
  ('followupboss_webhook_url', null, 'Follow Up Boss inbound webhook — leads POSTed here to appear in FUB', true),
  ('homebot_webhook_url', null, 'Homebot enrollment webhook — seller leads POSTed here for monthly equity digests', true),
  ('notification_email', null, 'Email address that gets a new-lead notification (leave blank to disable)', false),
  ('google_ads_conversion_id', null, 'Google Ads conversion ID, e.g. AW-123456789', false),
  ('google_ads_buyer_label', null, 'Google Ads buyer form conversion label', false),
  ('google_ads_seller_label', null, 'Google Ads seller form conversion label', false),
  ('ga4_measurement_id', null, 'Google Analytics 4 measurement ID, e.g. G-XXXXXXXXXX', false)
on conflict (key) do nothing;
