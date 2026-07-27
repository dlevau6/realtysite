-- Run this AFTER schema-drh-v6.sql. Fixes the Follow Up Boss integration:
-- it was previously wired as a generic webhook URL, but FUB's real API
-- requires a fixed endpoint + Basic Auth with an API key (see
-- src/lib/followupboss.ts). Safe to re-run.

insert into settings (key, value, description, is_secret) values
  ('followupboss_api_key', null, 'Follow Up Boss API key (Admin -> API in FUB). Used to POST leads to the real FUB API — see src/lib/followupboss.ts.', true)
on conflict (key) do nothing;

-- The old generic webhook field is no longer read anywhere in the code.
-- Left in place (not dropped) rather than deleting the row, so nothing
-- breaks if something external still references the key name; just
-- relabeled so it's not confusing in the settings table or admin UI.
update settings
set description = 'DEPRECATED — no longer used. Follow Up Boss now uses followupboss_api_key with their real documented API instead of a generic webhook URL.'
where key = 'followupboss_webhook_url';
