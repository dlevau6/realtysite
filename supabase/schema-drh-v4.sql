-- Run AFTER schema-drh-v3.sql to add Meta Pixel to the settings panel.
-- Safe to re-run.

insert into settings (key, value, description, is_secret) values
  ('meta_pixel_id', null, 'Meta (Facebook) Pixel ID for retargeting — e.g. 1234567890', false)
on conflict (key) do nothing;
