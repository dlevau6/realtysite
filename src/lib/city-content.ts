/**
 * Per-city unique content, extracted from the client's July 2026 D.R.
 * Horton city guides. Every city entry keeps Google from treating our
 * 19 city pages as thin/templated — each carries 4-5 unique highlights
 * plus a "communities overview" block that summarizes the D.R. Horton
 * community set in that city.
 *
 * Source: ALL-19-Cities-DR-Horton-Master-Guide.docx, Eric's definitive
 * final city list (received 2026-07-25). Replaces the prior 14-city set:
 * dropped Hickory, Kannapolis, Sherrills Ford (not on Eric's list); added
 * Bolivia, Clayton, Fayetteville, Fuquay-Varina, Kernersville, Leland,
 * Wilmington, Winston-Salem.
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

  "fuquay-varina": {
    metaDescription:
      "D.R. Horton new construction homes in Fuquay-Varina, NC — the Triangle's true entry-level price point, townhomes from the low $230Ks, 25 minutes from downtown Raleigh.",
    intro:
      "Fuquay-Varina has roughly doubled in population since 2010 and holds the Triangle's true entry-level price point — D.R. Horton townhomes from the low $230Ks — with twin historic downtowns, breweries, and festivals 25 minutes from Raleigh. NC-540's completion has slashed commute times across southern Wake County.",
    highlights: [
      { title: "One of NC's fastest-growing towns", body: "Population has roughly doubled since 2010." },
      { title: "The Triangle's true entry-level price point", body: "D.R. Horton townhomes from the low $230Ks." },
      { title: "Charming twin historic downtowns", body: "Breweries and festivals, 25 minutes from downtown Raleigh." },
      { title: "NC-540 loop completion", body: "Has slashed commute times across southern Wake County." },
      { title: "Heaviest D.R. Horton concentration in the Triangle's south", body: "Woodgrove, Madden West, and the Townes at Madden West selling simultaneously." },
    ],
    communityGroups: [
      {
        name: "Woodgrove",
        bullets: [
          "230 planned homes just off US-401.",
          "Pool and cabana amenities.",
          "Mid-$300Ks to low $400Ks; effortless commutes to Raleigh, Holly Springs, and Lillington.",
        ],
      },
      {
        name: "Madden West",
        bullets: [
          "Popular Beckett, Haywood, and Wesley ranch and two-story plans.",
          "1,599–1,983 sq ft, mid-$300Ks to high $400Ks.",
          "Model-home showcase community for the area.",
        ],
      },
      {
        name: "The Townes at Madden West",
        bullets: [
          "Townhomes from the low $230Ks — the Triangle's entry-level benchmark.",
          "1,418–1,614 sq ft low-maintenance plans.",
          "First-time-buyer and investor sweet spot.",
        ],
      },
    ],
  },

  clayton: {
    metaDescription:
      "D.R. Horton new construction homes in Clayton, NC — the Triangle's best value corridor from around $300K, 20 minutes to downtown Raleigh, powered by the $4B+ Novo Nordisk expansion.",
    intro:
      "Clayton anchors Johnston County's growth, powered by Novo Nordisk's $4B+ pharmaceutical expansion — with D.R. Horton pricing from around $300K, 20 minutes to downtown Raleigh, and lower property taxes than Wake County.",
    highlights: [
      { title: "Powered by a $4B+ pharma expansion", body: "Novo Nordisk's Johnston County investment makes this one of NC's fastest-growing counties." },
      { title: "The Triangle's best value corridor", body: "D.R. Horton homes from around $300K." },
      { title: "20 minutes to downtown Raleigh", body: "Small-town parks, greenways, and the Clayton Center arts venue." },
      { title: "Lower property taxes", body: "Johnston County taxes run below Wake County's." },
    ],
    communityGroups: [
      {
        name: "Clayton 27520 community cluster",
        bullets: [
          "Six-plus active communities — the highest count in Johnston County.",
          "Full price ladder: roughly $304K starters up to $483K executive homes with 3,112–3,490 sq ft.",
          "Ranch and two-story options from 1,497 to 2,824 sq ft.",
          "Several communities showing 'recently reduced' pricing — negotiating leverage right now.",
        ],
      },
    ],
  },

  wilmington: {
    metaDescription:
      "D.R. Horton new construction homes in Wilmington, NC — coastal living near Wrightsville, Carolina, and Kure beaches from the high $200Ks. The largest coastal new-home operation in NC with 22 communities.",
    intro:
      "Wilmington puts you where people vacation — a historic riverfront downtown minutes from Wrightsville, Carolina, and Kure beaches, powered by port expansion, a growing film industry, and Novant/NHRMC healthcare. D.R. Horton pricing starts in the high $200Ks, well below inland big-city equivalents, across 22 communities — the largest coastal new-home operation in North Carolina.",
    highlights: [
      { title: "Live where people vacation", body: "Historic riverfront downtown with Wrightsville, Carolina, and Kure beaches all within 20 minutes." },
      { title: "Booming coastal economy", body: "Port expansion, a growing film industry ('Hollywood East'), and Novant/NHRMC healthcare anchor the job base." },
      { title: "Coastal pricing from the high $200Ks", body: "New construction well below what inland big cities charge for a fraction of the lifestyle." },
      { title: "College-town energy", body: "UNCW brings arts, continuing education, and a younger population mix to the metro." },
      { title: "Largest coastal new-home operation in NC", body: "22 D.R. Horton communities across the metro — more coastal inventory than anywhere else in the state." },
    ],
    communityGroups: [
      {
        name: "Sidbury Station",
        bullets: [
          "North Wilmington master-planned community — newest phase now selling.",
          "From the low $330Ks starting at 1,618 sq ft.",
          "Community amenities coming; strong appreciation corridor.",
        ],
      },
      {
        name: "The Grove at Blake Farm",
        bullets: [
          "High $200Ks to mid $400Ks — one of the widest price spans in the Wilmington division.",
          "Fast-growing corridor between Wilmington and Hampstead.",
          "Open-concept plans with smart-home tech standard.",
        ],
      },
      {
        name: "Cape Fear riverfront townhome community",
        bullets: [
          "Townhomes at the Pleasure Island gateway — coastal water access at townhome pricing.",
          "Prime Wilmington–Carolina Beach positioning.",
          "All active communities listed on the D.R. Horton city page.",
        ],
      },
    ],
  },

  leland: {
    metaDescription:
      "D.R. Horton new construction homes in Leland, NC — 15 minutes to downtown Wilmington, Brunswick County's lower taxes, and NC's fastest-growing county.",
    intro:
      "Leland is the fastest-growing town in the Wilmington region — 15 minutes to downtown Wilmington across the river, with Brunswick County taxes running well below New Hanover's for the same coastal lifestyle.",
    highlights: [
      { title: "Fastest-growing town in the Wilmington region", body: "15 minutes to downtown Wilmington across the river." },
      { title: "NC's fastest-growing county", body: "Brunswick County repeatedly ranks as the fastest-growing county in the state." },
      { title: "Dramatically lower taxes", body: "Brunswick County taxes run well below New Hanover's — same lifestyle, lower carrying cost." },
      { title: "Beaches, golf, and marinas", body: "30–40 minutes to a half-dozen different beaches, plus golf, marinas, and the Intracoastal." },
    ],
    communityGroups: [
      {
        name: "Grayson Park",
        bullets: [
          "Established amenity community with pool and sidewalks.",
          "Mid-$300Ks to low $400Ks.",
          "15 minutes to downtown Wilmington.",
        ],
      },
      {
        name: "Vineyard Grove",
        bullets: [
          "Off Leland School Road.",
          "About 15 minutes to downtown Wilmington; roughly 30 to Wrightsville Beach or Oak Island.",
          "One of Leland's newest neighborhoods — early-phase opportunity.",
        ],
      },
    ],
  },

  bolivia: {
    metaDescription:
      "D.R. Horton new construction homes in Bolivia, NC — coastal Brunswick County pricing from the mid $200Ks, 20-30 minutes to Oak Island, Holden Beach, and Southport.",
    intro:
      "Bolivia is the value epicenter of NC's coastal boom — oceanside-county living at inland prices, roughly 20-30 minutes to Oak Island, Holden Beach, and Southport, anchoring the 17-community Bolivia/Brunswick search radius at the heart of D.R. Horton's coastal buildout.",
    highlights: [
      { title: "The value epicenter of NC's coastal boom", body: "Oceanside-county living at inland prices." },
      { title: "Central Brunswick location", body: "Roughly 20-30 minutes to Oak Island, Holden Beach, and Southport." },
      { title: "Low taxes, mild winters", body: "Strong appreciation potential as the county keeps growing." },
      { title: "Heart of the coastal buildout", body: "The 17-community Bolivia/Brunswick search radius is D.R. Horton's coastal stronghold." },
    ],
    communityGroups: [
      {
        name: "Bella Point",
        bullets: [
          "Single-family from the high $200Ks to mid $300Ks.",
          "Central Brunswick County convenience.",
          "Smart-home package standard.",
        ],
      },
      {
        name: "Eagle Creek",
        bullets: [
          "From the mid-$200Ks — arguably the lowest-priced new single-family construction in any NC coastal county.",
          "Quiet setting with new county services expanding nearby.",
          "Beach access in three directions.",
        ],
      },
    ],
  },

  "winston-salem": {
    metaDescription:
      "D.R. Horton new construction homes in Winston-Salem, NC — 'City of Arts and Innovation' pricing from the low $240Ks, Wake Forest University and Old Salem history. Up to 22 communities in the Triad's D.R. Horton hub.",
    intro:
      "Winston-Salem is the Triad's D.R. Horton hub — Wake Forest University, Atrium Health Wake Forest Baptist, and the Innovation Quarter biotech district anchor an economy with new construction pricing from the low $240Ks, among the lowest of any sizable U.S. metro.",
    highlights: [
      { title: "City of Arts and Innovation", body: "Wake Forest University, Atrium Health Wake Forest Baptist, and the Innovation Quarter biotech district." },
      { title: "Among the lowest new-construction prices nationally", body: "Pricing from the low $240Ks in a metro of this size is rare." },
      { title: "Rich culture", body: "Old Salem historic district, a top-rated food scene, and downtown minor-league baseball." },
      { title: "Well below the national cost of living", body: "A meaningfully lower cost of living than most comparable metros." },
      { title: "The Triad's D.R. Horton hub", body: "Up to 22 communities in the Winston-Salem search radius." },
    ],
    communityGroups: [
      {
        name: "Fiddlers Landing",
        drHortonUrl: "https://www.drhorton.com/north-carolina/greensboro-winston-salem/winston-salem/fiddlers-landing",
        bullets: [
          "5.2 miles from downtown Winston-Salem; 3.5 from Salem Lake Trail and UNC School of the Arts.",
          "Single-family from the low $300Ks, 1,902–3,108 sq ft.",
          "Near Reynolds Park, golf courses, and I-40 for the Triad commute.",
        ],
      },
      {
        name: "Fishel Village",
        bullets: [
          "125 homes from roughly $272K–$330K — remarkable pricing for a metro of this size.",
          "South Winston-Salem (27107) convenience.",
        ],
      },
      {
        name: "Winston-Salem townhome communities",
        bullets: [
          "Townhomes from the low $240Ks (1,416–1,429 sq ft) — ideal first-time-buyer product.",
          "All communities listed on the D.R. Horton city page.",
        ],
      },
    ],
  },

  kernersville: {
    metaDescription:
      "D.R. Horton new construction homes in Kernersville, NC — the Triad's perfect midpoint from the mid $200Ks, near the Toyota battery megasite and PTI airport aerospace hub.",
    intro:
      "Kernersville sits at the Triad's perfect midpoint — about 20 minutes to Winston-Salem, Greensboro, and High Point job centers — with new D.R. Horton pricing from the mid $200Ks and thousands of incoming jobs from the Toyota battery megasite and PTI airport aerospace hub.",
    highlights: [
      { title: "The Triad's perfect midpoint", body: "About 20 minutes to Winston-Salem, Greensboro, AND High Point job centers." },
      { title: "Extraordinary affordability", body: "New D.R. Horton homes from the mid-$200Ks." },
      { title: "Major incoming job catalyst", body: "Near the Toyota battery megasite corridor and PTI airport aerospace hub (Boom Supersonic, HondaJet, FedEx)." },
      { title: "Small-town charm, big-metro convenience", body: "A walkable downtown with big-metro job access." },
    ],
    communityGroups: [
      {
        name: "Glennview",
        bullets: [
          "From the mid-$200Ks.",
          "3–5 bedroom plans from 1,497 to 2,644 sq ft.",
          "Commuter-perfect location off the I-40 corridor.",
        ],
      },
      {
        name: "The Grove at Glennview",
        bullets: [
          "Sister community from the high $200Ks.",
          "Same proven floorplan library.",
          "Early phases in an appreciating corridor.",
        ],
      },
    ],
  },

  fayetteville: {
    metaDescription:
      "D.R. Horton new construction homes in Fayetteville, NC — VA-loan-friendly pricing near Fort Liberty, the state's most affordable D.R. Horton markets, 1 hour to Raleigh.",
    intro:
      "Fayetteville is anchored by Fort Liberty (Fort Bragg), one of the world's largest military installations, giving the market a recession-resistant economy and some of the most affordable D.R. Horton pricing in North Carolina — with VA-loan-friendly buying and dedicated military benefits.",
    highlights: [
      { title: "Fort Liberty anchor", body: "One of the world's largest military installations provides a rock-solid, recession-resistant economy." },
      { title: "Among the most affordable D.R. Horton markets in NC", body: "VA-loan-friendly buying and dedicated military benefits." },
      { title: "I-95 location", body: "1 hour to Raleigh, 2 hours to the beach, easy East Coast travel." },
      { title: "Revitalized downtown", body: "Minor-league baseball (Woodpeckers) at Segra Stadium." },
      { title: "Strong rental-demand backup", body: "For owners who are ever reassigned." },
    ],
    communityGroups: [
      {
        name: "Fayetteville metro communities (28306 and 28311 / Pine Forest corridors)",
        bullets: [
          "Five-plus active communities in the metro's most desirable growth corridors.",
          "Popular plans include the Aiken, Camden, Madison, McKimmon, and Greenville.",
          "Pricing targets the VA-loan sweet spot; no-down-payment promotions appear frequently.",
          "D.R. Horton military benefits program applies.",
        ],
      },
    ],
  },
};

export function getCityContent(citySlug: string): CityContent | null {
  return CITY_CONTENT[citySlug] ?? null;
}
