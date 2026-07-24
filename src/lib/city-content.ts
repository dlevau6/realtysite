/**
 * Per-city unique content, extracted from the client's 14 landing-page
 * spec docs. This is the material that keeps Google from treating our
 * 14 city pages as thin/templated — every city gets its own 4-5
 * "relocation highlights" plus a lead-in paragraph.
 *
 * Copy is the client's own from his spec doc; adding a new city means
 * adding a new entry here.
 */

export interface CityHighlight {
  /** Short bold lead-in (2-4 words) */
  title: string;
  /** One-sentence body */
  body: string;
}

export interface CityContent {
  /** SEO-optimized meta description sentence */
  metaDescription: string;
  /** Intro paragraph rendered above the highlights block */
  intro: string;
  /** 4-5 relocation reasons */
  highlights: CityHighlight[];
}

export const CITY_CONTENT: Record<string, CityContent> = {
  charlotte: {
    metaDescription:
      "See available D.R. Horton new construction homes in Charlotte, NC — floor plans, pricing, and builder incentives from the low $400s. Matches by text in 60 seconds.",
    intro:
      "Charlotte is the anchor of the Southeast's fastest-growing metro — a banking capital with a big-league lifestyle and enough neighborhood variety to fit every buyer profile.",
    highlights: [
      { title: "Banking powerhouse", body: "One of the nation's largest banking centers, anchoring a deep job market for relocating professionals." },
      { title: "Big-league lifestyle", body: "Panthers football, Hornets basketball, Charlotte FC, and a booming brewery and dining scene." },
      { title: "Easy connectivity", body: "Charlotte Douglas International Airport and the LYNX light rail make travel and commuting simple." },
      { title: "Neighborhood variety", body: "From NoDa's arts district to leafy south Charlotte suburbs, there is a fit for every buyer profile." },
      { title: "Value for a major metro", body: "Cost of living runs below most comparable big cities, stretching new-construction budgets further." },
    ],
  },
  huntersville: {
    metaDescription:
      "D.R. Horton new construction homes in Huntersville, NC — Lake Norman living, top schools, and 15 miles from Uptown Charlotte. Real prices and current availability.",
    intro:
      "Huntersville puts Lake Norman living and easy Charlotte access in the same address — minutes from the water, minutes from Uptown, and centered on Birkdale Village.",
    highlights: [
      { title: "Lake Norman living", body: "Minutes from marinas, boating, and waterfront dining on North Carolina's largest lake." },
      { title: "Birkdale Village", body: "Walkable shopping, restaurants, and entertainment that anchors the town's social life." },
      { title: "Strong schools", body: "Highly regarded public and charter options, including Lake Norman Charter." },
      { title: "Quick city access", body: "Roughly 15 miles up I-77 from Uptown Charlotte for an easy commute." },
    ],
  },
  concord: {
    metaDescription:
      "D.R. Horton new construction homes in Concord, NC — Motorsports capital with meaningfully better price-per-square-foot than Charlotte. Real prices and current status.",
    intro:
      "Concord trades a few extra minutes on I-85 for meaningfully more home — with race-week energy, a genuine historic downtown, and Charlotte's job market a short commute away.",
    highlights: [
      { title: "Motorsports capital", body: "Home of Charlotte Motor Speedway and race-week energy all year long." },
      { title: "Concord Mills", body: "One of the state's biggest shopping and entertainment destinations." },
      { title: "Historic downtown", body: "A charming, revitalized main street with local restaurants and events." },
      { title: "More home for the money", body: "Meaningfully better price-per-square-foot than Charlotte proper with an easy I-85 commute." },
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
      "D.R. Horton new construction homes in Indian Trail, NC — top-ranked Union County schools, fast-growing family suburb, minutes from Uptown Charlotte.",
    intro:
      "Indian Trail is one of the metro's most popular landing spots for relocating families — Union County schools, small-town feel, and Uptown Charlotte within an easy drive.",
    highlights: [
      { title: "Union County schools", body: "Consistently among the top-performing districts in North Carolina." },
      { title: "Fast-growing family suburb", body: "One of the metro's most popular landing spots for relocating families." },
      { title: "Small-town feel, city access", body: "US-74 and I-485 put Uptown Charlotte and the airport within an easy drive." },
      { title: "Parks and recreation", body: "Crooked Creek Park and community events give it a genuine hometown rhythm." },
    ],
  },
  monroe: {
    metaDescription:
      "D.R. Horton new construction homes in Monroe, NC — historic Union County charm and some of the lowest new-construction price points in the metro.",
    intro:
      "Monroe blends courthouse-square historic charm with some of the lowest new-construction prices in the Charlotte metro, all in one of the state's strongest school districts.",
    highlights: [
      { title: "Historic charm", body: "A classic Carolina courthouse downtown with local dining and festivals." },
      { title: "Budget stretcher", body: "Some of the lowest new-construction price points in the metro." },
      { title: "Union County schools", body: "Access to one of the state's strongest school systems." },
      { title: "Weekend character", body: "Treehouse Vineyards, local breweries, and golf minutes from home." },
    ],
  },
  mooresville: {
    metaDescription:
      "D.R. Horton new construction homes in Mooresville, NC — Race City USA lakefront living, Lowe's corporate anchor, and lower Iredell County taxes.",
    intro:
      "Mooresville is Lake Norman's Race City — NASCAR teams, Lowe's corporate headquarters, and lower Iredell County taxes make it one of the strongest new-construction markets in the state.",
    highlights: [
      { title: "Race City USA", body: "Home base for NASCAR teams and the NASCAR Technical Institute." },
      { title: "Lake Norman waterfront", body: "Marinas, lake parks, and waterfront dining define the lifestyle." },
      { title: "Corporate anchor", body: "Lowe's corporate headquarters keeps the local job market strong." },
      { title: "Lower Iredell taxes", body: "Iredell County's property tax rates are a genuine relocation draw." },
      { title: "Main Street revival", body: "A lively downtown with breweries, boutiques, and events." },
    ],
  },
  troutman: {
    metaDescription:
      "D.R. Horton new construction homes in Troutman, NC — Lake Norman State Park living, walkable Main Street, small-town pricing on the I-77 corridor.",
    intro:
      "Troutman gives buyers Lake Norman State Park as a backyard, a walkable Main Street, and small-town pricing that undercuts most of the Lake Norman corridor.",
    highlights: [
      { title: "Lake Norman State Park", body: "Miles of trails, swim beach, camping, and lake access next door." },
      { title: "Walkable Main Street", body: "Coffee shops, restaurants, and Troutman Park within steps of new townhomes." },
      { title: "I-77 convenience", body: "Quick runs to Mooresville, Statesville, and Charlotte." },
      { title: "Small-town value", body: "New construction pricing that undercuts most of the Lake Norman corridor." },
    ],
  },
  statesville: {
    metaDescription:
      "D.R. Horton new construction homes in Statesville, NC — I-77/I-40 crossroads location, historic downtown, and among the best new-construction values in the corridor.",
    intro:
      "Statesville sits where I-77 meets I-40 — a crossroads location with a genuine historic downtown, the Carolina BalloonFest, and attainable pricing across the I-77 corridor.",
    highlights: [
      { title: "Crossroads location", body: "I-77 meets I-40, putting Charlotte, Winston-Salem, and Hickory all within reach." },
      { title: "Historic downtown", body: "A genuine, walkable historic district with local restaurants and events." },
      { title: "Carolina BalloonFest", body: "One of the nation's longest-running hot air balloon festivals." },
      { title: "Attainable pricing", body: "Among the best new-construction values in the I-77 corridor." },
    ],
  },
  denver: {
    metaDescription:
      "D.R. Horton new construction homes in Denver, NC — Lake Norman's quieter west shore, lower Lincoln County taxes, and Uptown Charlotte within 30 minutes.",
    intro:
      "Denver puts you on Lake Norman's quieter west shore — lower Lincoln County property taxes, growing retail nearby, and Uptown Charlotte roughly half an hour away via NC-16.",
    highlights: [
      { title: "West shore lifestyle", body: "Lake Norman's quieter side, with marinas and lakeside dining." },
      { title: "Lincoln County taxes", body: "Lower property tax rates than Mecklenburg, a real monthly savings." },
      { title: "Charlotte in 30", body: "NC-16 puts Uptown Charlotte roughly half an hour away." },
      { title: "Booming retail", body: "New grocery-anchored shopping keeps daily errands close to home." },
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
      "D.R. Horton new construction homes in Raleigh, NC — Research Triangle jobs, top best-places-to-live rankings, and 10,000+ acres of parkland.",
    intro:
      "Raleigh routinely tops national best-places-to-live rankings — a Research Triangle job market, university energy from NC State, and more than 180 miles of greenway trails.",
    highlights: [
      { title: "Research Triangle jobs", body: "Tech, life sciences, and government anchor one of the country's strongest job markets." },
      { title: "Perennial best-places winner", body: "Raleigh routinely tops national best-places-to-live rankings." },
      { title: "A city in a park", body: "More than 10,000 acres of parkland and 180+ miles of greenway trails." },
      { title: "University energy", body: "NC State plus nearby Duke and UNC feed talent, culture, and sports." },
      { title: "RDU connectivity", body: "A major airport with direct flights nationwide." },
    ],
  },
  durham: {
    metaDescription:
      "D.R. Horton new construction homes in Durham, NC — Duke University medicine, Research Triangle Park tech and biotech jobs, and the Bull City's cultural revival.",
    intro:
      "Durham is Bull City through and through — Duke University, Research Triangle Park at its doorstep, DPAC and American Tobacco Campus downtown, and a food scene that's earned national attention.",
    highlights: [
      { title: "Duke University and medicine", body: "World-class university and one of the nation's top medical centers." },
      { title: "Research Triangle Park", body: "The famous RTP tech and biotech hub sits at Durham's doorstep." },
      { title: "Downtown renaissance", body: "DPAC theater, the American Tobacco Campus, and an award-winning food scene." },
      { title: "Bull City character", body: "Durham Bulls baseball and a creative, historic downtown culture." },
    ],
  },
};

export function getCityContent(citySlug: string): CityContent | null {
  return CITY_CONTENT[citySlug] ?? null;
}
