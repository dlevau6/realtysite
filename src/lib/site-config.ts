/**
 * Single source of truth for the DR Horton NC Homes site.
 *
 * The site is a lead-gen property for D.R. Horton new-construction homes
 * across North Carolina. Eric Fisher (Southern Homes of the Carolinas)
 * is the operating licensed agent.
 *
 * IMPORTANT: Before launch, replace TODO fields with client-confirmed
 * values, and add the DR Horton written-authorization file path once
 * received (Chapter 0 of the strategy guide).
 */
export const SITE = {
  brandName: "DR Horton NC Homes",
  legalDisclaimer:
    "This website is operated by Eric Fisher, an independent licensed real estate professional with Southern Homes of the Carolinas, and is used to market D.R. Horton new construction homes with the builder's permission. This site is not owned or operated by D.R. Horton, Inc.",

  agentName: "Eric Fisher",
  agentTitle: "Realtor® / Broker",
  licenseNumber: "NC #362747",
  brokerage: "Southern Homes of the Carolinas",

  tagline: "New Construction Homes Across North Carolina",
  headline: "New D.R. Horton Homes in North Carolina — Starting from the $200s",
  subheadline:
    "See available floor plans, pricing, and move-in dates in 60 seconds.",
  description:
    "Find available D.R. Horton new construction homes across North Carolina — floor plans, pricing, builder incentives, and move-in dates. Free, no obligation, matches sent by text in 60 seconds.",

  phone: "704-495-2241",
  email: "LakeNormanRealtor1@gmail.com",
  address: {
    street: "19900 W. Catawba Ave. Suite 206",
    city: "Cornelius",
    state: "NC",
    zip: "28031",
  },

  // Production URL — swap when the client confirms domain setup
  url: "https://www.drhortonnchomes.com",

  // The 14 target cities from the Google-verified landing-pages guide.
  // Each entry drives /new-homes/[slug] page generation, form dynamic
  // text, and CRM routing tags. Keep alphabetical.
  cities: [
    { slug: "charlotte", name: "Charlotte" },
    { slug: "concord", name: "Concord" },
    { slug: "denver", name: "Denver" },
    { slug: "durham", name: "Durham" },
    { slug: "hickory", name: "Hickory" },
    { slug: "huntersville", name: "Huntersville" },
    { slug: "indian-trail", name: "Indian Trail" },
    { slug: "kannapolis", name: "Kannapolis" },
    { slug: "monroe", name: "Monroe" },
    { slug: "mooresville", name: "Mooresville" },
    { slug: "raleigh", name: "Raleigh" },
    { slug: "sherrills-ford", name: "Sherrills Ford" },
    { slug: "statesville", name: "Statesville" },
    { slug: "troutman", name: "Troutman" },
  ],
} as const;

/** Trust markers shown under the primary CTA */
export const TRUST_LINE =
  "Free · No obligation · Matches sent by text in 60 seconds";

/** TCPA-compliant SMS consent language — required on all lead forms */
export const SMS_CONSENT_TEXT =
  "I agree to receive text messages about home listings from DR Horton NC Homes. Message and data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help.";

/** Look up a city config by its URL slug. Returns null on unknown slug. */
export function getCityBySlug(slug: string) {
  return SITE.cities.find((c) => c.slug === slug) ?? null;
}

/** Build the CRM routing tag for a lead. */
export function buildRoutingTag(
  citySlug: string,
  isOrganicSeller: boolean
): string {
  const city = getCityBySlug(citySlug);
  if (!city) return isOrganicSeller ? "Organic-Seller-Unknown" : "DRH-Unknown-Buyer";
  // PascalCase city name (Indian Trail → IndianTrail, Sherrills Ford → SherrillsFord)
  const cityTagPart = city.name.replace(/\s+/g, "");
  return isOrganicSeller
    ? `Organic-Seller-${cityTagPart}`
    : `DRH-${cityTagPart}-Buyer`;
}
