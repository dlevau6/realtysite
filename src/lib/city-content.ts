/**
 * Per-city unique content, extracted from the client's July 2026 D.R.
 * Horton city guides. Every city entry keeps Google from treating our
 * 14 city pages as thin/templated — each carries 4-5 unique highlights
 * plus a "communities overview" block that summarizes the D.R. Horton
 * community set in that city.
 *
 * Source: 19 city guide docs Eric sent this session. Cities in his new
 * guide that don't overlap with our current 14 (Bolivia, Clayton,
 * Fayetteville, Fuquay-Varina, Kernersville, Leland, Wilmington,
 * Winston-Salem) are not present here yet — awaiting decision on
 * whether to expand the city list.
 */

export interface CityHighlight {
  /** Short bold lead-in (2-4 words) */
  title: string;
  /** One-sentence body */
  body: string;
}

export interface CommunityGroup {
  /** Community or region name — used as the section heading */
  name: string;
  /** Optional direct DR Horton corporate page for this community */
  drHortonUrl?: string;
  /** Feature bullets — 3-5 sentences of unique content */
  bullets: string[];
}

export interface CityContent {
  /** SEO-optimized meta description sentence */
  metaDescription: string;
  /** Intro paragraph rendered above the highlights block */
  intro: string;
  /** 4-5 relocation reasons */
  highlights: CityHighlight[];
  /** Grouped D.R. Horton community overview from Eric's guides */
  communityGroups?: CommunityGroup[];
}

export const CITY_CONTENT: Record<string, CityContent> = {
  charlotte: {
    metaDescription:
      "D.R. Horton new construction homes in Charlotte, NC from the $300Ks — the second-largest U.S. banking center with major-league sports and a top-3 airport. Matches by text in 60 seconds.",
    intro:
      "Charlotte is one of America's fastest-growing big cities — yet D.R. Horton pricing here still starts in the $300Ks, far below what buyers see in Atlanta, Austin, or Nashville. The banking capital, world-class airport, and Panthers/Hornets/Charlotte FC lifestyle are the draw; the value is the difference.",
    highlights: [
      { title: "Second-largest banking center in the U.S.", body: "Bank of America, Truist, and Wells Fargo's East Coast HQ create a massive, stable job engine." },
      { title: "Fast-growing metro, still affordable", body: "One of America's fastest-growing big cities — but D.R. Horton homes start in the $300Ks, far below Atlanta, Austin, or Nashville equivalents." },
      { title: "Major-league lifestyle", body: "Panthers, Hornets, Charlotte FC, world-class CLT airport, and a thriving Uptown dining and culture scene." },
      { title: "Wealth-friendly tax structure", body: "No state estate tax and a flat, declining NC income tax make Charlotte a wealth-friendly relocation target." },
    ],
    communityGroups: [
      {
        name: "Riverbend",
        bullets: [
          "Single-family homes from the low $400Ks to low $500Ks on the Catawba River side of the city.",
          "America's Smart Home technology standard in every home.",
          "Convenient west-Charlotte location with quick Uptown access.",
        ],
      },
      {
        name: "Additional Charlotte communities (University City, East, Southwest)",
        bullets: [
          "Approximately 19 active communities across Mecklenburg County.",
          "Townhomes, entry-level Express product, and plans over 3,400 sq ft up to roughly $670K.",
          "15–25 minutes from Uptown banking jobs from most locations.",
          "All listed live on the D.R. Horton city hub page.",
        ],
      },
    ],
  },

  huntersville: {
    metaDescription:
      "D.R. Horton new construction homes in Huntersville, NC — 20 minutes to Uptown Charlotte, Birkdale Village lifestyle, Lake Norman access. Six active communities.",
    intro:
      "Huntersville is North Mecklenburg's premier boomtown — about 20 minutes up I-77 from Uptown Charlotte's banking jobs, anchored by Birkdale Village's walkable shopping and dining, with Lake Norman minutes away.",
    highlights: [
      { title: "North Mecklenburg's premier boomtown", body: "Roughly 20 minutes up I-77 from Uptown Charlotte's banking jobs." },
      { title: "Birkdale Village lifestyle", body: "Walkable shopping, dining, and entertainment that anchors the whole Lake Norman corridor." },
      { title: "Lake Norman access", body: "Boating and waterfront dining minutes from most neighborhoods." },
      { title: "Top schools", body: "Among the most sought-after schools in the Charlotte-Mecklenburg system's northern feeder patterns." },
      { title: "Six D.R. Horton communities", body: "Townhome-scale product through premium single-family — one of Huntersville's deepest new-construction selections." },
    ],
    communityGroups: [
      {
        name: "Oak Grove Hill",
        drHortonUrl: "https://www.drhorton.com/north-carolina/charlotte/huntersville/oak-grove-hill",
        bullets: [
          "Brand-new premium community — Grand Opening celebrated January 28, 2026, with pricing starting around $439,990.",
          "Spacious luxury single-family homes with 3–5 bedrooms, staggered cabinets with crown molding, granite countertops, and stainless appliances.",
          "Community amenities include cornhole, a playground with tot lot, and a gazebo.",
          "Feeds Long Creek Elementary (0.3 miles away) and Hopewell High.",
          "Located off Beatties Ford Road with quick I-485 access.",
        ],
      },
      {
        name: "Additional Huntersville communities",
        bullets: [
          "A 4–6 bedroom single-family community (28078) from roughly $361,990 with plans from 1,613 to 3,108 sq ft.",
          "A lower-maintenance product from about $409,000 with efficient 1,349–1,557 sq ft plans.",
          "Roughly six active D.R. Horton communities in Huntersville — all listed on the city hub page.",
        ],
      },
    ],
  },

  concord: {
    metaDescription:
      "D.R. Horton new construction homes in Concord, NC — Charlotte Motor Speedway, Concord Mills, and Cox Mill schools. Seven active communities including Skybrook Corners Townhomes.",
    intro:
      "Concord is Cabarrus County's powerhouse — Charlotte Motor Speedway, Concord Mills (NC's most-visited attraction), and rapid logistics-driven job growth, all 25 minutes from Uptown Charlotte via I-85.",
    highlights: [
      { title: "Cabarrus County powerhouse", body: "Charlotte Motor Speedway, Concord Mills (NC's most-visited attraction), and major logistics job growth." },
      { title: "25 minutes to Uptown Charlotte", body: "Quick airport-corridor access via I-85 and I-485." },
      { title: "Historic downtown renaissance", body: "Walkable historic square with a growing dining scene; highly regarded Cox Mill-area schools." },
      { title: "Seven D.R. Horton communities", body: "From affordable townhomes to family-size single-family homes." },
    ],
    communityGroups: [
      {
        name: "Skybrook Corners Townhomes",
        drHortonUrl: "https://www.drhorton.com/north-carolina/charlotte/concord/skybrook-corners-townhomes",
        bullets: [
          "2-car-garage townhomes off Huntersville-Concord Road.",
          "Easy access to I-485/I-77, Concord Mills, the Speedway, and CLT airport.",
          "Feeds highly rated Cox Mill High School.",
          "Smart-home package standard.",
        ],
      },
      {
        name: "Express at Hallstead",
        drHortonUrl: "https://www.drhorton.com/north-carolina/charlotte/concord/express-hallstead",
        bullets: [
          "Entry-level Express Homes pricing in a premium county.",
          "Proven floorplans engineered for value.",
          "Strong first-time-buyer fit.",
        ],
      },
      {
        name: "Additional Concord communities",
        bullets: [
          "Roughly 7 active communities across price points.",
          "Closing-cost promotions (up to $9,500 with DHI Mortgage) run regularly in this division.",
          "All listed on the D.R. Horton city page.",
        ],
      },
    ],
  },

  kannapolis: {
    metaDescription:
      "D.R. Horton new construction homes in Kannapolis, NC — reborn downtown, life-sciences campus, and among the most attainable price points in the Charlotte metro.",
    intro:
      "Kannapolis has become one of the metro's most affordable landing spots for new construction — with a revitalized downtown, a growing life-sciences campus, and an easy I-85 commute to Charlotte.",
    highlights: [
      { title: "Reborn downtown", body: "A hundreds-of-millions-dollar downtown revitalization centered on Atrium Health Ballpark and the Cannon Ballers." },
      { title: "NC Research Campus", body: "A life-sciences hub bringing research and health-industry jobs to town." },
      { title: "Affordable entry point", body: "Among the most attainable price points in the Charlotte metro for new construction." },
      { title: "Commuter friendly", body: "Direct I-85 access puts Charlotte's job centers within reach." },
    ],
  },

  "indian-trail": {
    metaDescription:
      "D.R. Horton new construction homes in Indian Trail, NC — one of America's fastest-growing suburbs, top-ranked Union County schools, 10 miles from Charlotte.",
    intro:
      "Indian Trail has grown from 1,942 residents in 1990 to nearly 40,000 by 2020 and is still climbing. Ten miles southeast of Charlotte with US-74 and Monroe Expressway access, it's a Union County address with some of the state's top-ranked schools.",
    highlights: [
      { title: "Fastest-growing suburb", body: "From 1,942 residents in 1990 to nearly 40,000 by 2020, and still climbing." },
      { title: "10 miles from Charlotte", body: "US-74 and the Monroe Expressway make for a fast Uptown commute." },
      { title: "Top Union County schools", body: "Union County means access to some of North Carolina's top-ranked public schools." },
      { title: "Small-town roots, big-suburb amenities", body: "Historic rail depot and local festivals with big shopping and dining built around them." },
      { title: "Six D.R. Horton communities", body: "Townhomes through 4,400+ sq ft executive homes — a full price-point range." },
    ],
    communityGroups: [
      {
        name: "Sanctuary at Southgate",
        drHortonUrl: "https://www.drhorton.com/north-carolina/charlotte/indian-trail/sanctuary-at-southgate",
        bullets: [
          "Brand-new tree-lined community — Grand Opening October 22, 2025, with single-family pricing from about $455,990.",
          "10 ranch and two-story floor plans ranging from 1,902 to 4,426 sq ft — one of the widest plan spreads in the division.",
          "Planned amenities include a pool with cabana, playground, and walking trails.",
          "Three decorated model homes; smart home technology standard.",
        ],
      },
      {
        name: "Sanctuary at Southgate Townhomes",
        drHortonUrl: "https://www.drhorton.com/north-carolina/charlotte/indian-trail/sanctuary-at-southgate-townhomes",
        bullets: [
          "Two-story townhomes from about $347,990 — the attainable entry into this premium Union County location.",
          "Approximately 1,820 sq ft with a 2-car garage — rare at this townhome price point.",
          "Same community amenities and smart-home package as the single-family side.",
        ],
      },
      {
        name: "Additional Indian Trail communities",
        bullets: [
          "An executive community (28079) from roughly $485,990 with 4–5 bedroom plans from 2,706 to 4,432 sq ft.",
          "Value single-family options in the $335,000–$380,000 range.",
          "All active communities listed on the D.R. Horton city page.",
        ],
      },
    ],
  },

  monroe: {
    metaDescription:
      "D.R. Horton new construction homes in Monroe, NC — top Union County schools, townhomes from the mid-$200Ks, 35 minutes to Uptown Charlotte. Eleven communities.",
    intro:
      "Monroe is a Union County school-district magnet with the deepest D.R. Horton selection in the Charlotte division — eleven active communities. Townhomes start in the mid-$200Ks and single-family in the low $300Ks, all 35 minutes from Uptown via the Monroe Expressway.",
    highlights: [
      { title: "Top Union County schools", body: "Consistently ranks among North Carolina's top school districts — a genuine family magnet." },
      { title: "Deep price range", body: "D.R. Horton townhomes from the mid-$200Ks and single-family from the low $300Ks." },
      { title: "35 minutes to Uptown Charlotte", body: "The Monroe Expressway toll road makes the Charlotte commute fast and predictable." },
      { title: "Historic downtown", body: "Courthouse-square historic center with a growing restaurant scene." },
      { title: "Eleven D.R. Horton communities", body: "The deepest selection in the entire Charlotte division." },
    ],
    communityGroups: [
      {
        name: "Secrest Commons",
        drHortonUrl: "https://www.drhorton.com/north-carolina/charlotte/monroe/secrest-commons",
        bullets: [
          "9 floorplans from 1,618 to 2,824 sq ft with 3–5 bedrooms; ranch, two-story, and primary-down options.",
          "Pool with cabana, pickleball, playground, and natural walking trails.",
          "Birch cabinets with crown molding, quartz countertops, stainless appliances standard.",
          "Minutes from US-74 for direct Charlotte access; Union County schools.",
        ],
      },
      {
        name: "Monroe townhome community (28112)",
        bullets: [
          "3-bedroom townhomes from the mid-$250Ks — among the cheapest new construction in the metro.",
          "1,416–1,429 sq ft low-maintenance plans.",
          "Ideal first-time-buyer or investor product.",
        ],
      },
      {
        name: "Monroe move-up communities",
        bullets: [
          "Single-family plans up to 3,639 sq ft from $339K.",
          "Full amenity packages in select communities.",
          "All 11 active communities listed on the D.R. Horton city page.",
        ],
      },
    ],
  },

  mooresville: {
    metaDescription:
      "D.R. Horton new construction homes in Mooresville, NC — Race City USA lakefront living, Lowe's HQ, and lower Iredell County taxes. Pricing from the mid-$300Ks.",
    intro:
      "Mooresville is Lake Norman's Race City — NASCAR teams headquartered here alongside Lowe's corporate HQ, feeding a high-paying local job base. Lake Norman lifestyle at D.R. Horton pricing from the mid-$300Ks, with Iredell County taxes running meaningfully below Mecklenburg's.",
    highlights: [
      { title: "Race City USA", body: "NASCAR team headquarters plus Lowe's corporate HQ mean high-paying local jobs." },
      { title: "Lake Norman lifestyle", body: "Boating, waterfront dining, lake parks — with D.R. Horton pricing from the mid-$300Ks." },
      { title: "Lower Iredell County taxes", body: "Property tax rates run meaningfully below Mecklenburg's." },
      { title: "Downtown booming", body: "Mooresville Graded School District is a state technology leader; downtown is in the middle of a genuine revival." },
    ],
    communityGroups: [
      {
        name: "Mooresville east-side communities (28115)",
        bullets: [
          "Single-family plans from 1,418 sq ft at the area's most accessible price points.",
          "Close to downtown Mooresville's shops and restaurants.",
          "Commuter-friendly to I-77.",
        ],
      },
      {
        name: "Mooresville Lake Norman-side communities (28117)",
        bullets: [
          "Minutes from Lake Norman boat launches and waterfront dining.",
          "3–5 bed plans from 1,418 to 3,108+ sq ft, mid-$300Ks and up.",
          "'Coming soon' pipeline offers early-phase pricing opportunities.",
          "Approximately 9 total communities — all listed on the D.R. Horton city page.",
        ],
      },
    ],
  },

  troutman: {
    metaDescription:
      "D.R. Horton new construction homes in Troutman, NC — hidden-gem Lake Norman corridor town, some of the lowest prices in the corridor, next to Lake Norman State Park.",
    intro:
      "Troutman is the Charlotte region's hidden-gem growth story — small-town pricing 10 minutes from Mooresville and Lake Norman, with the state park practically in the backyard. Eight active D.R. Horton communities make it a full-selection market despite its size.",
    highlights: [
      { title: "Hidden-gem growth story", body: "Small-town pricing 10 minutes from Mooresville and Lake Norman." },
      { title: "Lowest prices in the Lake Norman corridor", body: "Some of the lowest D.R. Horton price points in the entire Lake Norman corridor." },
      { title: "Lake Norman State Park", body: "The lake's largest public shoreline, swim beach, and 30+ miles of trails — essentially in the backyard." },
      { title: "Charlotte in 40 minutes", body: "Direct I-77 access puts Charlotte within about 40 minutes." },
      { title: "Eight active communities", body: "A full-selection market despite the town's small footprint." },
    ],
    communityGroups: [
      {
        name: "Brookside",
        drHortonUrl: "https://www.drhorton.com/north-carolina/charlotte/troutman/brookside",
        bullets: [
          "Ranch plans including the Bristol and Clifton with open-concept designs.",
          "Gourmet kitchens with stainless appliances and shaker cabinets.",
          "Classic single-story living at accessible pricing.",
        ],
      },
      {
        name: "The Enclave at Falls Cove",
        drHortonUrl: "https://www.drhorton.com/north-carolina/charlotte/troutman/falls-cove",
        bullets: [
          "The division's luxury play: up to 5 bedrooms / 4 baths with 3-car garages.",
          "Near Lake Norman for boating, swimming, and lakeside dining.",
          "Short drive to I-77 for Charlotte or Mooresville.",
        ],
      },
      {
        name: "The Townes at Troutman",
        drHortonUrl: "https://www.drhorton.com/north-carolina/charlotte/troutman/the-townes-at-troutman",
        bullets: [
          "Walkable-to-downtown townhomes from 1,418 sq ft.",
          "Minutes from Lake Norman and Charlotte.",
          "Strong entry price point for the corridor.",
        ],
      },
    ],
  },

  statesville: {
    metaDescription:
      "D.R. Horton new construction homes in Statesville, NC — I-77/I-40 crossroads, historic downtown with Carolina BalloonFest, and among the best pricing in the Charlotte division.",
    intro:
      "Statesville sits at the crossroads of I-77 and I-40 — commute flexibility toward Charlotte, Hickory, or Winston-Salem — with among the most affordable D.R. Horton pricing in the Charlotte division and low Iredell County taxes.",
    highlights: [
      { title: "Crossroads location", body: "I-77 meets I-40 — commute flexibility toward Charlotte, Hickory, or Winston-Salem." },
      { title: "Best value in the division", body: "Among the most affordable D.R. Horton markets in the Charlotte division — maximum square footage per dollar." },
      { title: "Historic downtown events", body: "Home to Carolina BalloonFest, the Pumpkin Festival, and Full Bloom Film Festival." },
      { title: "Strong local job base", body: "Manufacturing and logistics anchors plus low Iredell County taxes." },
    ],
    communityGroups: [
      {
        name: "Wallace Springs",
        drHortonUrl: "https://www.drhorton.com/north-carolina/charlotte/statesville/wallace-springs",
        bullets: [
          "Full amenity package: clubhouse, pool, golf, tennis, and tot lot.",
          "A few miles from Lake Norman with easy access to Mooresville, Troutman, and Charlotte.",
          "Resort-style living at Statesville pricing.",
        ],
      },
      {
        name: "Bristol Terrace",
        drHortonUrl: "https://www.drhorton.com/north-carolina/charlotte/statesville/bristol-terrace",
        bullets: [
          "Ranch and two-story homes with 3–5 bedrooms.",
          "Extra-wide homesites providing real space between neighbors.",
          "Smart-home technology standard.",
        ],
      },
      {
        name: "Additional Statesville communities",
        bullets: [
          "Approximately 6 active communities at region-low price points.",
          "All listed on the D.R. Horton city page.",
        ],
      },
    ],
  },

  denver: {
    metaDescription:
      "D.R. Horton new construction homes in Denver, NC — Lake Norman's west shore with lower Lincoln County taxes, golf-course communities, and Uptown Charlotte in 30 minutes.",
    intro:
      "Denver puts you on Lake Norman's quieter west shore — Lincoln County property taxes below Mecklenburg's, two full-service golf clubs in town, and Uptown Charlotte roughly 30 minutes away via Hwy 16.",
    highlights: [
      { title: "West shore of Lake Norman", body: "Lake living with a serene, small-town feel on the quieter side of the lake." },
      { title: "Lower Lincoln County taxes", body: "Property taxes run below Mecklenburg's while keeping an easy Hwy 16 commute to Charlotte." },
      { title: "Golfer's paradise", body: "Verdict Ridge Golf & Country Club and Westport Golf Club are both public and both local." },
      { title: "Regional employer access", body: "Duke Energy, Lowe's global HQ (Mooresville), Atrium Health, Penske Racing, Corning Optical all nearby." },
      { title: "State park in the backyard", body: "Lake Norman State Park's boating, kayaking, fishing, and trails are minutes away." },
    ],
    communityGroups: [
      {
        name: "Westport / Westport Townhomes (BRAND NEW)",
        bullets: [
          "D.R. Horton's newest Denver community, built inside the established, golf-anchored Westport neighborhood near the lake.",
          "Brand-new floorplan lineup includes the Cedar (1.5-story split plan with front porch), Tillery, Birch, Greenwood (5-bedroom open kitchen), and Norman.",
          "Stylish gray or white kitchen cabinets with quartz countertops; new townhome product joins the single-family offering.",
          "Walkable to Westport Golf Club with Lake Norman just beyond — an established-community setting most new construction can't match.",
          "As the newest release, expect early-phase pricing opportunities.",
        ],
      },
      {
        name: "Sylvan Creek",
        drHortonUrl: "https://www.drhorton.com/north-carolina/charlotte/denver/sylvan-creek",
        bullets: [
          "Single-family homes up to the 5-bed/4-bath Hampshire plan with a 3-car garage and 3,781 sq ft.",
          "Chef-friendly kitchens: shaker cabinets, granite countertops, center island, tile backsplash, stainless appliances.",
          "Minutes to Lake Norman State Park and Denver's golf courses.",
          "Up to $10,000 in closing costs on Charlotte-division purchases (promotional, verify current terms).",
        ],
      },
      {
        name: "Covington at Lake Norman Estates",
        drHortonUrl: "https://www.drhorton.com/North-Carolina/Charlotte/Denver/Covington-at-Lake-Norman-Estates",
        bullets: [
          "Estate-style homesites in the Lake Norman Estates area of Denver.",
          "Lake-proximate location on the quieter west shore.",
          "Verify current phase availability on the community page.",
        ],
      },
    ],
  },

  "sherrills-ford": {
    metaDescription:
      "D.R. Horton new construction homes in Sherrills Ford, NC — Lake Norman's northwest shore, Catawba County schools, and under 40 minutes to Charlotte Douglas.",
    intro:
      "Sherrills Ford is Lake Norman's hidden-gem town — a genuinely peaceful pace on the northwest shore with well-regarded Catawba County schools and new retail growth catching up.",
    highlights: [
      { title: "Hidden-gem lake town", body: "Northwest shore of Lake Norman with a genuinely peaceful pace." },
      { title: "Catawba County schools", body: "Well-regarded schools serving the new-home communities." },
      { title: "New retail growth", body: "Grocery-anchored development is bringing conveniences to the lake's quiet side." },
      { title: "Airport in 40", body: "Under 40 minutes to Charlotte Douglas International for travelers." },
    ],
  },

  hickory: {
    metaDescription:
      "D.R. Horton new construction homes in Hickory, NC — nationally-ranked affordability, foothills living between Charlotte and Asheville, from the high $200s.",
    intro:
      "Hickory regularly ranks among the country's most affordable metros — foothills living, an hour from both Charlotte and Asheville, with a maker heritage and a reinvented downtown.",
    highlights: [
      { title: "National affordability standout", body: "Regularly ranked among the most affordable metro areas in the country." },
      { title: "Between Charlotte and Asheville", body: "Foothills living about an hour from each along I-40." },
      { title: "Craftsmanship heritage", body: "The famous furniture and manufacturing tradition shapes a maker-friendly culture." },
      { title: "Reinvented downtown", body: "The City Walk and Hickory Trail connect parks, breweries, and a lively town center." },
      { title: "Lake Hickory", body: "Boating and lakefront parks minutes from every neighborhood." },
    ],
  },

  raleigh: {
    metaDescription:
      "D.R. Horton new construction homes in Raleigh, NC — Research Triangle jobs, top best-places rankings, townhomes from under $300K. 38 communities across the RDU division.",
    intro:
      "Raleigh anchors the Research Triangle — routinely a top-3 U.S. metro for jobs, tech growth, and quality of life. D.R. Horton townhomes and single-family homes start under $300K in a metro where resale medians run far higher.",
    highlights: [
      { title: "Research Triangle anchor", body: "Routinely a top-3 U.S. metro for jobs, tech growth, and quality of life." },
      { title: "Capital-city stability", body: "Government, healthcare, universities, plus Apple and Google Triangle expansions." },
      { title: "Under $300K entry point", body: "D.R. Horton townhomes and single-family from under $300K in a metro where resale medians run far higher." },
      { title: "Top Wake County schools", body: "Top-tier Wake County schools and 180+ miles of greenway trails." },
      { title: "Biggest NC operation", body: "38 communities across the Raleigh-Durham division — D.R. Horton's biggest NC operation." },
    ],
    communityGroups: [
      {
        name: "Barwell Park",
        bullets: [
          "Southeast Raleigh single-family from the high $200Ks — in-city new construction is rare at this price.",
          "3–5 bed plans from 1,764 to 2,818 sq ft.",
          "Quick access to I-40 and downtown.",
        ],
      },
      {
        name: "North Raleigh communities (27616)",
        bullets: [
          "4–5 bedroom plans from the low $300Ks to $430Ks.",
          "Established retail/commuter corridor near US-401 and I-540.",
          "Family-size plans up to 2,511 sq ft.",
        ],
      },
      {
        name: "Division-wide selection",
        bullets: [
          "Every community is inside or commutable to the Triangle's nation-leading job market.",
          "Full current list on the D.R. Horton division hub page.",
        ],
      },
    ],
  },

  durham: {
    metaDescription:
      "D.R. Horton new construction homes in Durham, NC — Duke, Duke Health, and Research Triangle Park. Nine communities from the low $300Ks minutes from RTP jobs.",
    intro:
      "Durham is Bull City — Duke University, Duke Health, and Research Triangle Park at its doorstep, with a nationally-celebrated food scene and a revitalized downtown. Nine D.R. Horton communities from the low $300Ks put you minutes from RTP jobs.",
    highlights: [
      { title: "Duke and RTP", body: "Home of Duke University, Duke Health, and Research Triangle Park — the largest research park in the U.S." },
      { title: "Nationally-celebrated food scene", body: "Revitalized downtown centered on the American Tobacco Campus and DPAC." },
      { title: "Low $300Ks from RTP", body: "New D.R. Horton construction from the low $300Ks minutes from RTP jobs — an unbeatable commute-cost equation." },
      { title: "Nine communities in Durham County", body: "Buy new for less than many Durham resales." },
    ],
    communityGroups: [
      {
        name: "Fletchers Mill",
        bullets: [
          "East Durham (27703), minutes from RTP and the Apple campus corridor.",
          "Single-family plans from roughly $353K, 1,764–2,824 sq ft.",
          "RDU airport and Brier Creek convenience.",
        ],
      },
      {
        name: "East Durham 27703 corridor communities",
        bullets: [
          "Townhome products (Bell Heather Road area) plus single-family options.",
          "3–5 bed plans serving the RTP workforce.",
          "All 9 county communities listed on the D.R. Horton city page.",
        ],
      },
    ],
  },
};

export function getCityContent(citySlug: string): CityContent | null {
  return CITY_CONTENT[citySlug] ?? null;
}
