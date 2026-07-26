/**
 * Single source of truth for the LakeNormanRealtor1 / DR Horton
 * specialist site.
 *
 * Branding follows the spec doc's page header: LakeNormanRealtor1 is the
 * brand; Eric Fisher (Southern Homes of the Carolinas) is the operating
 * licensed agent; the site's positioning is "your D.R. Horton new
 * construction specialist."
 */

import {
  CITY_PHOTOS,
  COMMUNITY_PHOTO_POOL,
  type PhotoCredit,
} from "./photo-credits";

export const SITE = {
  brandName: "LakeNormanRealtor1",
  positioning: "Your D.R. Horton new construction specialist",
  legalDisclaimer:
    "This website is operated by Eric Fisher, an independent licensed real estate professional with Southern Homes of the Carolinas, and is used to market D.R. Horton new construction homes with the builder's permission. This site is not owned, operated, endorsed, or sponsored by D.R. Horton, Inc.",

  agentName: "Eric Fisher",
  agentTitle: "Realtor® / Broker",
  licenseNumber: "NC #362747",
  brokerage: "Southern Homes of the Carolinas",
  partnerName: "Melissa Fisher",

  tagline: "Your D.R. Horton new construction specialist",
  headline:
    "Your D.R. Horton new construction specialist for Charlotte, Lake Norman, the Triangle, the Triad, the Cape Fear coast and the Sandhills.",
  description:
    "Eric Fisher — LakeNormanRealtor1 — is your D.R. Horton new construction specialist across 19 North Carolina cities. See available floor plans, pricing, and move-in dates. List with us for only 1.5% when you buy a new D.R. Horton home.",

  // The signature value prop — his differentiator vs any other agent.
  listingRatePromise: {
    rate: "1.5%",
    // "I will list and sell their home for only 1.5% if they buy a new home."
    // — Eric's exact language.
    line: "List and sell your current home for only 1.5% when you buy a new D.R. Horton home with us.",
  },

  phone: "704-495-2241",
  email: "LakeNormanRealtor1@gmail.com",
  address: {
    street: "19900 W. Catawba Avenue, Suite 206",
    city: "Cornelius",
    state: "NC",
    zip: "28031",
  },

  url: "https://www.drhortonnchomes.com",

  // 19 cities organized into six metro clusters, per Eric's July 2026
  // guide (ALL-19-Cities-DR-Horton-Master-Guide.docx). Replaces the prior
  // 14-city list: drops Hickory, Kannapolis, Sherrills Ford; adds Bolivia,
  // Clayton, Fayetteville, Fuquay-Varina, Kernersville, Leland, Wilmington,
  // Winston-Salem. Order inside each cluster follows Eric's #1-#19 ranking.
  metros: [
    {
      slug: "charlotte-metro",
      name: "Charlotte metro",
      blurb: "Uptown, banking, sports, restaurants — the fastest-growing metro in the Southeast.",
      cities: [
        { slug: "charlotte", name: "Charlotte" },
        { slug: "monroe", name: "Monroe" },
        { slug: "concord", name: "Concord" },
        { slug: "huntersville", name: "Huntersville" },
        { slug: "indian-trail", name: "Indian Trail" },
      ],
    },
    {
      slug: "lake-norman",
      name: "Lake Norman / I-77 corridor",
      blurb: "520 miles of shoreline, lake living, and easy Charlotte access.",
      cities: [
        { slug: "mooresville", name: "Mooresville" },
        { slug: "troutman", name: "Troutman" },
        { slug: "statesville", name: "Statesville" },
        { slug: "denver", name: "Denver" },
      ],
    },
    {
      slug: "triangle",
      name: "Research Triangle",
      blurb: "Raleigh, Durham, Fuquay-Varina, Clayton — top-ranked schools and job growth.",
      cities: [
        { slug: "raleigh", name: "Raleigh" },
        { slug: "durham", name: "Durham" },
        { slug: "fuquay-varina", name: "Fuquay-Varina" },
        { slug: "clayton", name: "Clayton" },
      ],
    },
    {
      slug: "cape-fear-coast",
      name: "Cape Fear coast",
      blurb: "Wilmington, Leland, Bolivia — coastal living from the mid $200Ks.",
      cities: [
        { slug: "wilmington", name: "Wilmington" },
        { slug: "leland", name: "Leland" },
        { slug: "bolivia", name: "Bolivia" },
      ],
    },
    {
      slug: "piedmont-triad",
      name: "Piedmont Triad",
      blurb: "Winston-Salem and Kernersville — arts, biotech, and the Toyota megasite corridor.",
      cities: [
        { slug: "winston-salem", name: "Winston-Salem" },
        { slug: "kernersville", name: "Kernersville" },
      ],
    },
    {
      slug: "sandhills",
      name: "Sandhills",
      blurb: "Fayetteville — Fort Liberty and VA-loan-friendly new construction.",
      cities: [{ slug: "fayetteville", name: "Fayetteville" }],
    },
  ],
} as const;

export interface CityRef {
  slug: string;
  name: string;
}

/** Flat city list — useful for iteration, sitemap, footer, etc. */
export const ALL_CITIES: readonly CityRef[] = SITE.metros.flatMap(
  (m) => m.cities as readonly CityRef[]
);

/** Trust markers shown under the primary CTA */
export const TRUST_LINE =
  "Free · No obligation · Matches sent by text in 60 seconds";

/** TCPA-compliant SMS consent language — required on all lead forms */
export const SMS_CONSENT_TEXT =
  "I agree to receive text messages about home listings from LakeNormanRealtor1. Message and data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help.";

/** Look up a city config by its URL slug across all metros. */
export function getCityBySlug(slug: string): CityRef | null {
  return ALL_CITIES.find((c) => c.slug === slug) ?? null;
}

/** Return the metro name a given city slug lives in. */
export function getMetroForCity(citySlug: string): string | null {
  for (const m of SITE.metros) {
    if (m.cities.some((c) => c.slug === citySlug)) return m.name;
  }
  return null;
}

/** Build the CRM routing tag for a lead. */
export function buildRoutingTag(
  citySlug: string,
  isOrganicSeller: boolean
): string {
  const city = getCityBySlug(citySlug);
  if (!city) return isOrganicSeller ? "Organic-Seller-Unknown" : "DRH-Unknown-Buyer";
  const cityTagPart = city.name.replace(/\s+/g, "");
  return isOrganicSeller
    ? `Organic-Seller-${cityTagPart}`
    : `DRH-${cityTagPart}-Buyer`;
}

/**
 * Rough labels for a city's key or landmark used in photo captions /
 * meta descriptions. Falls back to the city name.
 */
export function cityLandmark(citySlug: string): string {
  const map: Record<string, string> = {
    charlotte: "Uptown skyline",
    huntersville: "Lake Norman greenway",
    concord: "Charlotte Motor Speedway area",
    "indian-trail": "Union County suburbs",
    monroe: "Historic downtown",
    mooresville: "Race City lakefront",
    troutman: "Lake Norman State Park",
    statesville: "Historic courthouse",
    denver: "Lake Norman west shore",
    raleigh: "State capitol district",
    durham: "American Tobacco Campus",
    "fuquay-varina": "Historic Main Street",
    clayton: "Downtown Clayton",
    wilmington: "Riverwalk and Cape Fear River",
    leland: "Brunswick riverfront",
    bolivia: "Brunswick County coast",
    "winston-salem": "Old Salem historic district",
    kernersville: "Körner's Folly district",
    fayetteville: "Segra Stadium downtown",
  };
  return map[citySlug] ?? "";
}

/**
 * Shared pool of known-working, license-verified stock photos (Unsplash —
 * free for commercial use, no attribution required: unsplash.com/license).
 * Every ID in this pool has been confirmed to resolve on Unsplash's CDN.
 *
 * IMPORTANT: do not add IDs to this pool without confirming them in a
 * browser first. A previous version had made-up IDs that 404'd — see
 * "Recent bugs resolved" in the handoff doc. This session (2026-07-26)
 * we tried to source additional real per-city landmark photos but this
 * sandbox has no direct internet access for verifying new Unsplash/Pexels
 * IDs (bash networking is blocked; the fetch tool can't distinguish a
 * valid photo response from a 404 for binary content). Rather than risk
 * reintroducing the 404 bug, both city and community tiles below reuse
 * this same verified pool until real photos are sourced.
 *
 * TODO before real launch: swap for Eric's licensed photography, an NC-
 * specific stock package, or city CVB media kit photos (see Section 5 /
 * city guide notes). Two ways to get real per-city + per-community photos
 * safely: (1) get a free Unsplash or Pexels API developer key so photo
 * IDs come back guaranteed-valid, or (2) browse Unsplash/Pexels in a
 * browser, hand-pick images, and self-host them in /public/images so
 * there's no hotlink/ID risk at all. Ask Daimon which he wants before
 * spending more time on this.
 */
const STOCK_PHOTO_POOL = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&auto=format&fit=crop&q=80",
];

/** Deterministic string hash so a given slug always maps to the same photo. */
function hashSlug(slug: string, seed = 0): number {
  let hash = seed;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * Background photo URL for each city button. See STOCK_PHOTO_POOL note
 * above — generic verified stock, not city landmarks, until real photos
 * are sourced.
 */
export function cityPhoto(citySlug: string): string {
  const curated = CITY_PHOTOS[citySlug];
  if (curated) return curated.url;
  return STOCK_PHOTO_POOL[hashSlug(citySlug) % STOCK_PHOTO_POOL.length];
}

/**
 * Attribution for a city's photo, when it came from the curated
 * Unsplash-API-sourced set (CITY_PHOTOS in photo-credits.ts). Returns
 * null for cities still on the generic hash-pool fallback — those
 * weren't sourced via the API, so no attribution obligation applies.
 */
export function cityPhotoCredit(citySlug: string): PhotoCredit | null {
  return CITY_PHOTOS[citySlug] ?? null;
}

/**
 * Background photo URL for each community tile. Explicitly NOT a D.R.
 * Horton community photo — those are the builder's copyrighted assets
 * and are off-limits until Eric gets photo-use permission (Section 5).
 * Uses the curated Unsplash-API-sourced pool when available, seeded
 * differently from cityPhoto() so a community tile doesn't visually
 * repeat its own city page's hero image.
 */
export function communityPhoto(communitySlug: string): string {
  if (COMMUNITY_PHOTO_POOL.length > 0) {
    return COMMUNITY_PHOTO_POOL[hashSlug(communitySlug, 7) % COMMUNITY_PHOTO_POOL.length].url;
  }
  return STOCK_PHOTO_POOL[hashSlug(communitySlug, 7) % STOCK_PHOTO_POOL.length];
}

/** Attribution for a community tile's photo — null if it fell back to
 *  the non-curated generic pool (no attribution obligation there). */
export function communityPhotoCredit(communitySlug: string): PhotoCredit | null {
  if (COMMUNITY_PHOTO_POOL.length === 0) return null;
  return COMMUNITY_PHOTO_POOL[hashSlug(communitySlug, 7) % COMMUNITY_PHOTO_POOL.length];
}
