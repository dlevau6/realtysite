/**
 * DR Horton community directory — seeded from Section 3 of the client's
 * spec doc. Data is verified only where the spec marks "Selling"; entries
 * marked "Verify" require confirmation on drhorton.com before the button
 * goes live per Section 3's verification instructions.
 *
 * As of 2026-07-26: the COMMUNITIES array below is the static default /
 * fallback. The live site reads from Supabase's `communities` table
 * first (see getAllCommunities below), which is what /admin/content
 * writes to — so Eric can add, edit, or remove communities himself
 * without a redeploy. See supabase/schema-drh-v5.sql.
 */

import { getSupabaseServiceClient } from "@/lib/supabase";

export type CommunityStatus =
  | "selling" // Selling now, build a lead button
  | "coming-soon" // Coming soon, "join the first-to-know" button
  | "final-homes" // Final homes remaining, time-limited button
  | "verify" // Real community, name/pricing needs confirming
  | "sold-out"; // No button — replaced by "recently sold" note

export interface Community {
  slug: string;
  name: string;
  citySlug: string;
  status: CommunityStatus;
  /** Starting price, formatted as "from the $300s" or "from the low $400s" */
  startingPrice?: string;
  /** One-line context for the button subtitle */
  descriptor?: string;
  /** DR Horton corporate page — optional but recommended */
  drHortonUrl?: string;
}

export const COMMUNITIES: Community[] = [
  // CHARLOTTE
  { slug: "reedy-creek-preserve", name: "Reedy Creek Preserve", citySlug: "charlotte", status: "selling", startingPrice: "from the low $400s", descriptor: "Single-family, NE Charlotte" },
  { slug: "cardinal-creek", name: "Cardinal Creek", citySlug: "charlotte", status: "selling", startingPrice: "from the high $300s", descriptor: "Single-family, NE Charlotte" },
  { slug: "anderson-street-townhomes", name: "Anderson Street Townhomes", citySlug: "charlotte", status: "selling", startingPrice: "from the high $430s", descriptor: "NoDa 4-story townhomes" },
  { slug: "kingman-townhomes", name: "Kingman Townhomes", citySlug: "charlotte", status: "selling", startingPrice: "from the low $400s", descriptor: "Near Uptown" },
  { slug: "haney-townhomes", name: "Haney Townhomes", citySlug: "charlotte", status: "coming-soon", descriptor: "3-story townhomes" },
  { slug: "mallard-creek-townhomes", name: "Mallard Creek Townhomes", citySlug: "charlotte", status: "verify", descriptor: "University City" },
  { slug: "royall-townes", name: "Royall Townes", citySlug: "charlotte", status: "verify", descriptor: "North Charlotte" },

  // HUNTERSVILLE
  { slug: "oak-grove-hill", name: "Oak Grove Hill", citySlug: "huntersville", status: "selling", startingPrice: "from the mid $300s", descriptor: "3-5 beds, near Lake Norman" },
  { slug: "the-oaks-at-skybrook-north", name: "The Oaks at Skybrook North", citySlug: "huntersville", status: "selling", startingPrice: "from the mid $700s", descriptor: "Luxury homes" },

  // CONCORD
  { slug: "skybrook-corners-townhomes", name: "Skybrook Corners Townhomes", citySlug: "concord", status: "verify", descriptor: "Confirm selling status before launch" },

  // INDIAN TRAIL
  { slug: "sanctuary-at-southgate", name: "Sanctuary at Southgate", citySlug: "indian-trail", status: "selling", startingPrice: "from the mid $300s", descriptor: "Single-family" },
  { slug: "sanctuary-at-southgate-townhomes", name: "Sanctuary at Southgate Townhomes", citySlug: "indian-trail", status: "selling", startingPrice: "from the mid $300s", descriptor: "Townhomes" },

  // MONROE
  { slug: "secrest-commons", name: "Secrest Commons", citySlug: "monroe", status: "selling", startingPrice: "from the high $300s", descriptor: "Pool and pickleball" },
  { slug: "second-monroe-community", name: "Second Monroe community", citySlug: "monroe", status: "verify", descriptor: "Name pending verification" },

  // MOORESVILLE
  { slug: "brantley", name: "Brantley", citySlug: "mooresville", status: "selling", startingPrice: "from the high $480s", descriptor: "Single-family" },
  { slug: "the-townes-at-lake-norman", name: "The Townes at Lake Norman", citySlug: "mooresville", status: "selling", descriptor: "3-story townhomes" },
  { slug: "lakeshore-at-windstone", name: "Lakeshore at Windstone", citySlug: "mooresville", status: "sold-out" },

  // TROUTMAN
  { slug: "brookside", name: "Brookside", citySlug: "troutman", status: "selling", startingPrice: "from the mid $300s", descriptor: "Single-family" },
  { slug: "the-townes-at-troutman", name: "The Townes at Troutman", citySlug: "troutman", status: "coming-soon", startingPrice: "low $300s", descriptor: "Townhomes" },
  { slug: "calvin-creek", name: "Calvin Creek", citySlug: "troutman", status: "final-homes", startingPrice: "from the $360s", descriptor: "Last opportunities" },

  // STATESVILLE
  { slug: "wallace-springs", name: "Wallace Springs", citySlug: "statesville", status: "selling", startingPrice: "from the low $300s" },
  { slug: "bristol-terrace", name: "Bristol Terrace", citySlug: "statesville", status: "selling", descriptor: "Near Lake Norman — confirm pricing" },
  { slug: "third-statesville-community", name: "Third Statesville community", citySlug: "statesville", status: "verify", descriptor: "Name pending verification" },

  // DENVER
  { slug: "sylvan-creek", name: "Sylvan Creek", citySlug: "denver", status: "selling", startingPrice: "from the low $400s" },
  { slug: "second-denver-community", name: "Second Denver community", citySlug: "denver", status: "verify", descriptor: "Name pending verification" },

  // RALEIGH
  { slug: "barwell-park", name: "Barwell Park", citySlug: "raleigh", status: "selling", startingPrice: "from the low $360s", descriptor: "Single-family, SE Raleigh" },
  { slug: "thornton-townes", name: "Thornton Townes", citySlug: "raleigh", status: "selling", startingPrice: "from the high $200s", descriptor: "Townhomes, N Raleigh" },
  { slug: "chapel-townes", name: "Chapel Townes", citySlug: "raleigh", status: "selling", startingPrice: "from the low $300s", descriptor: "Townhomes" },
  { slug: "new-raleigh-community", name: "New Raleigh community", citySlug: "raleigh", status: "coming-soon", descriptor: "Join the first-to-know list" },

  // DURHAM
  { slug: "copper-run-south", name: "Copper Run South", citySlug: "durham", status: "selling", startingPrice: "from the high $330s", descriptor: "Townhomes off Angier Ave" },
  { slug: "fletchers-mill", name: "Fletchers Mill", citySlug: "durham", status: "sold-out" },
  { slug: "trevino-townes", name: "Trevino Townes", citySlug: "durham", status: "sold-out" },
  { slug: "nichols-farm", name: "Nichols Farm", citySlug: "durham", status: "sold-out" },

  // FUQUAY-VARINA
  { slug: "woodgrove", name: "Woodgrove", citySlug: "fuquay-varina", status: "selling", startingPrice: "from the mid $300s", descriptor: "230 homes, pool and cabana off US-401" },
  { slug: "madden-west", name: "Madden West", citySlug: "fuquay-varina", status: "selling", startingPrice: "from the mid $300s", descriptor: "Beckett, Haywood, Wesley plans" },
  { slug: "the-townes-at-madden-west", name: "The Townes at Madden West", citySlug: "fuquay-varina", status: "selling", startingPrice: "from the low $230s", descriptor: "Triangle's entry-level benchmark" },

  // CLAYTON
  { slug: "clayton-27520-cluster", name: "Clayton 27520 community cluster", citySlug: "clayton", status: "verify", startingPrice: "from around $304K", descriptor: "Six-plus communities — confirm individual names" },

  // WILMINGTON
  { slug: "sidbury-station", name: "Sidbury Station", citySlug: "wilmington", status: "selling", startingPrice: "from the low $330s", descriptor: "North Wilmington master-planned" },
  { slug: "the-grove-at-blake-farm", name: "The Grove at Blake Farm", citySlug: "wilmington", status: "selling", startingPrice: "from the high $200s", descriptor: "Wilmington-Hampstead corridor" },
  { slug: "cape-fear-riverfront-townhomes", name: "Cape Fear riverfront community", citySlug: "wilmington", status: "verify", descriptor: "Pleasure Island gateway — confirm name and pricing" },

  // LELAND
  { slug: "grayson-park", name: "Grayson Park", citySlug: "leland", status: "selling", startingPrice: "from the mid $300s", descriptor: "Established, pool and sidewalks" },
  { slug: "vineyard-grove", name: "Vineyard Grove", citySlug: "leland", status: "verify", descriptor: "Newest Leland neighborhood — confirm pricing" },

  // BOLIVIA
  { slug: "bella-point", name: "Bella Point", citySlug: "bolivia", status: "selling", startingPrice: "from the high $200s", descriptor: "Central Brunswick County" },
  { slug: "eagle-creek", name: "Eagle Creek", citySlug: "bolivia", status: "selling", startingPrice: "from the mid $200s", descriptor: "Beach access in three directions" },

  // WINSTON-SALEM
  { slug: "fiddlers-landing", name: "Fiddlers Landing", citySlug: "winston-salem", status: "selling", startingPrice: "from the low $300s", descriptor: "5.2 mi from downtown", drHortonUrl: "https://www.drhorton.com/north-carolina/greensboro-winston-salem/winston-salem/fiddlers-landing" },
  { slug: "fishel-village", name: "Fishel Village", citySlug: "winston-salem", status: "selling", startingPrice: "from the high $200s", descriptor: "South Winston-Salem (27107)" },
  { slug: "winston-salem-townhomes", name: "Winston-Salem townhome community", citySlug: "winston-salem", status: "verify", startingPrice: "from the low $240s", descriptor: "Confirm name before launch" },

  // KERNERSVILLE
  { slug: "glennview", name: "Glennview", citySlug: "kernersville", status: "selling", startingPrice: "from the mid $200s", descriptor: "3-5 beds, I-40 corridor" },
  { slug: "the-grove-at-glennview", name: "The Grove at Glennview", citySlug: "kernersville", status: "selling", startingPrice: "from the high $200s", descriptor: "Sister community, early phases" },

  // FAYETTEVILLE
  { slug: "fayetteville-metro-cluster", name: "Fayetteville metro communities (28306/28311)", citySlug: "fayetteville", status: "verify", descriptor: "Five-plus communities, VA-loan sweet spot — confirm individual names" },
];

/**
 * All communities, Supabase-first with a static fallback to the
 * COMMUNITIES array above. Same pattern as getCityContent() in
 * city-content.ts — see that file's comment for why. Once
 * scripts/seed-content.ts has been run, Supabase is authoritative:
 * anything Eric adds, edits, or removes in /admin/content shows up here,
 * including brand-new communities that don't exist in the static array
 * at all.
 */
export async function getAllCommunities(): Promise<Community[]> {
  try {
    const supabase = getSupabaseServiceClient();
    const { data, error } = await supabase.from("communities").select("*");
    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        slug: row.slug,
        name: row.name,
        citySlug: row.city_slug,
        status: row.status,
        startingPrice: row.starting_price ?? undefined,
        descriptor: row.descriptor ?? undefined,
        drHortonUrl: row.dr_horton_url ?? undefined,
      }));
    }
  } catch {
    // Missing env vars, table not migrated yet, network hiccup — fall
    // through to the static default rather than breaking the page.
  }
  return COMMUNITIES;
}

export async function getCommunitiesForCity(citySlug: string): Promise<Community[]> {
  const all = await getAllCommunities();
  return all.filter((c) => c.citySlug === citySlug);
}

/** Communities to feature on the homepage carousel — only "selling now"
 *  with real prices, sampled across metros. */
export async function getFeaturedCommunities(): Promise<Community[]> {
  const all = await getAllCommunities();
  return all.filter((c) => c.status === "selling" && c.startingPrice);
}

export async function getCommunityBySlug(
  citySlug: string,
  communitySlug: string
): Promise<Community | null> {
  const all = await getAllCommunities();
  return (
    all.find((c) => c.citySlug === citySlug && c.slug === communitySlug) ??
    null
  );
}

// ---------------------------------------------------------------------
// Admin write helpers — used by /api/admin/content routes only. Every
// caller here is already behind the HMAC admin session check in
// middleware.ts, so these don't re-check auth themselves (same pattern
// as setSetting() in lib/settings.ts).
// ---------------------------------------------------------------------

/** Create or update a single community. `slug` + `citySlug` together are
 *  the natural key (unique constraint in the DB) — passing an existing
 *  pair updates that row instead of creating a duplicate. */
export async function upsertCommunity(
  community: Community
): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("communities").upsert(
    {
      city_slug: community.citySlug,
      slug: community.slug,
      name: community.name,
      status: community.status,
      starting_price: community.startingPrice ?? null,
      descriptor: community.descriptor ?? null,
      dr_horton_url: community.drHortonUrl ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "city_slug,slug" }
  );
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function deleteCommunity(
  citySlug: string,
  slug: string
): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase
    .from("communities")
    .delete()
    .eq("city_slug", citySlug)
    .eq("slug", slug);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Human label for status - used in badges and button copy. */
export function statusLabel(status: CommunityStatus): string {
  switch (status) {
    case "selling":
      return "Selling now";
    case "coming-soon":
      return "Coming soon";
    case "final-homes":
      return "Final homes";
    case "verify":
      return "Verify availability";
    case "sold-out":
      return "Sold out";
  }
}
