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

/**
 * Background photo URL for each city button. Currently uses generic
 * Unsplash stock — replace with Eric's own photography or licensed
 * NC-specific stock before real launch.
 *
 * We alternate landmarks (skylines, lake shots, greenways, downtowns)
 * to give the 14 buttons visual variety when displayed together.
 */
export function cityPhoto(citySlug: string): string {
  const map: Record<string, string> = {
    charlotte:
      "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=1600&auto=format&fit=crop&q=80",
    huntersville:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&auto=format&fit=crop&q=80",
    concord:
      "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=1600&auto=format&fit=crop&q=80",
    kannapolis:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1600&auto=format&fit=crop&q=80",
    "indian-trail":
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80",
    monroe:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&auto=format&fit=crop&q=80",
    mooresville:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&auto=format&fit=crop&q=80",
    troutman:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&auto=format&fit=crop&q=80",
    statesville:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1600&auto=format&fit=crop&q=80",
    denver:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&auto=format&fit=crop&q=80",
    "sherrills-ford":
      "https://images.unsplash.com/photo-1523472721958-3b4a17a3a72f?w=1600&auto=format&fit=crop&q=80",
    hickory:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&auto=format&fit=crop&q=80",
    raleigh:
      "https://images.unsplash.com/photo-1608096275195-01e2d3f8c1f8?w=1600&auto=format&fit=crop&q=80",
    durham:
      "https://images.unsplash.com/photo-1541423408874-99f27e93b12d?w=1600&auto=format&fit=crop&q=80",
  };
  return (
    map[citySlug] ??
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&auto=format&fit=crop&q=80"
  );
}
