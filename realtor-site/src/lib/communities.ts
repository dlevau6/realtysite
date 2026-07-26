/**
 * DR Horton community directory — seeded from Section 3 of the client's
 * spec doc. Data is verified only where the spec marks "Selling"; entries
 * marked "Verify" require confirmation on drhorton.com before the button
 * goes live per Section 3's verification instructions.
 *
 * When Eric adds/removes communities we can move this into a Supabase
 * table so he can edit from the admin panel — for now this is a static
 * seed to ship the demo. Adding new communities means editing this file.
 */

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

  // KANNAPOLIS
  { slug: "frontier-pointe", name: "Frontier Pointe", citySlug: "kannapolis", status: "selling", descriptor: "Confirm pricing at launch" },

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

  // SHERRILLS FORD
  { slug: "chestnut-at-laurelbrook", name: "Chestnut at Laurelbrook", citySlug: "sherrills-ford", status: "selling", startingPrice: "from the low $300s", descriptor: "2-5 beds, resort amenities" },
  { slug: "sherrills-stream", name: "Sherrill's Stream", citySlug: "sherrills-ford", status: "verify", descriptor: "Confirm pricing and availability" },
  { slug: "blackstone-bay-townhomes", name: "Blackstone Bay Townhomes", citySlug: "sherrills-ford", status: "sold-out" },

  // HICKORY
  { slug: "falls-at-hickory", name: "Falls at Hickory", citySlug: "hickory", status: "selling", startingPrice: "from the mid $300s" },
  { slug: "huffman-ridge", name: "Huffman Ridge", citySlug: "hickory", status: "selling", startingPrice: "from the high $200s", descriptor: "Near I-40 and Hwy 321" },
  { slug: "trivium-meadows", name: "Trivium Meadows", citySlug: "hickory", status: "verify", descriptor: "Confirm status before launch" },

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
];

export function getCommunitiesForCity(citySlug: string): Community[] {
  return COMMUNITIES.filter((c) => c.citySlug === citySlug);
}

/** Communities to feature on the homepage carousel — only "selling now"
 *  with real prices, sampled across metros. */
export function getFeaturedCommunities(): Community[] {
  return COMMUNITIES.filter(
    (c) => c.status === "selling" && c.startingPrice
  );
}

export function getCommunityBySlug(
  citySlug: string,
  communitySlug: string
): Community | null {
  return (
    COMMUNITIES.find(
      (c) => c.citySlug === citySlug && c.slug === communitySlug
    ) ?? null
  );
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
