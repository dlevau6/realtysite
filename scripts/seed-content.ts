/**
 * One-time (but safe to re-run) migration: pushes the existing static
 * content from src/lib/city-content.ts and src/lib/communities.ts into
 * the city_content / communities Supabase tables added by
 * supabase/schema-drh-v5.sql.
 *
 * Run AFTER applying schema-drh-v5.sql in the Supabase SQL editor.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/seed-content.ts
 *
 * (Same two env vars already used server-side — copy them out of
 * .env.local or Vercel's env settings.)
 *
 * Safe to re-run: every insert is an upsert keyed on the same slug the
 * site already uses, so running this again just re-syncs the DB back to
 * whatever's currently in the static files. That also means: once Eric
 * has edited something in /admin/content, re-running this script will
 * OVERWRITE his edit with the static default. Only re-run this if you
 * genuinely want to reset content back to the code defaults.
 */

import { createClient } from "@supabase/supabase-js";
import { CITY_CONTENT } from "../src/lib/city-content";
import { COMMUNITIES } from "../src/lib/communities";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first, e.g.:\n" +
      "  SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/seed-content.ts"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

async function seedCityContent() {
  const rows = Object.entries(CITY_CONTENT).map(([citySlug, content]) => ({
    city_slug: citySlug,
    meta_description: content.metaDescription,
    intro: content.intro,
    highlights: content.highlights,
    community_groups: content.communityGroups ?? null,
  }));

  console.log(`Seeding city_content: ${rows.length} cities...`);
  const { error } = await supabase.from("city_content").upsert(rows, {
    onConflict: "city_slug",
  });
  if (error) throw new Error(`city_content upsert failed: ${error.message}`);
  console.log("  done.");
}

async function seedCommunities() {
  const rows = COMMUNITIES.map((c) => ({
    city_slug: c.citySlug,
    slug: c.slug,
    name: c.name,
    status: c.status,
    starting_price: c.startingPrice ?? null,
    descriptor: c.descriptor ?? null,
    dr_horton_url: c.drHortonUrl ?? null,
  }));

  console.log(`Seeding communities: ${rows.length} rows...`);
  const { error } = await supabase.from("communities").upsert(rows, {
    onConflict: "city_slug,slug",
  });
  if (error) throw new Error(`communities upsert failed: ${error.message}`);
  console.log("  done.");
}

async function main() {
  await seedCityContent();
  await seedCommunities();
  console.log("\nSeed complete. /admin/content now reads from Supabase.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
