/**
 * Single source of truth for the LakeNormanRealtor1 / DR Horton
 * specialist site.
 *
 * Branding follows the spec doc's page header: LakeNormanRealtor1 is the
 * brand; Eric Fisher (Southern Homes of the Carolinas) is the operating
 * licensed agent; the site's positioning is "your D.R. Horton new
 * construction specialist."
 */

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
    "Your D.R. Horton new construction specialist for Charlotte, Lake Norman and the Triangle.",
  description:
    "Eric Fisher — LakeNormanRealtor1 — is your D.R. Horton new construction specialist across 14 North Carolina cities. See available floor plans, pricing, and move-in dates. List with us for only 1.5% when you buy a new D.R. Horton home.",

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

  // 14 cities organized into the four metro clusters from the spec doc's
  // Section 2. The order inside each cluster matches the spec table.
  metros: [
    {
      slug: "charlotte-metro",
      name: "Charlotte metro",
      blurb: "Uptown, banking, sports, restaurants — the fastest-growing metro in the Southeast.",
      cities: [
        { slug: "charlotte", name: "Charlotte" },
        { slug: "huntersville", name: "Huntersville" },
        { slug: "concord", name: "Concord" },
        { slug: "kannapolis", name: "Kannapolis" },
        { slug: "indian-trail", name: "Indian Trail" },
        { slug: "monroe", name: "Monroe" },
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
        { slug: "sherrills-ford", name: "Sherrills Ford" },
      ],
    },
    {
      slug: "catawba-valley",
      name: "Catawba Valley",
      blurb: "Foothills, furniture heritage, and value pricing.",
      cities: [{ slug: "hickory", name: "Hickory" }],
    },
    {
      slug: "triangle",
      name: "Research Triangle",
      blurb: "Raleigh, Durham, RTP — top-ranked schools and job growth.",
      cities: [
        { slug: "raleigh", name: "Raleigh" },
        { slug: "durham", name: "Durham" },
      ],
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
    kannapolis: "Downtown ballpark district",
    "indian-trail": "Union County suburbs",
    monroe: "Historic downtown",
    mooresville: "Race City lakefront",
    troutman: "Lake Norman State Park",
    statesville: "Historic courthouse",
    denver: "Lake Norman west shore",
    "sherrills-ford": "Lakeside marina",
    hickory: "Foothills and downtown",
    raleigh: "State capitol district",
    durham: "American Tobacco Campus",
  };
  return map[citySlug] ?? "";
}
