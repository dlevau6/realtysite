-- Sample data seed for the demo state.
--
-- Run this AFTER schema.sql to give the site something to show before
-- the real Spark IDX feed is wired up. Every row here is placeholder
-- content that should be removed once real MLS data starts flowing —
-- delete with:
--
--   delete from listings where mls_number like 'SAMPLE-%';
--   delete from neighborhoods where slug in ('lake-norman', 'cornelius', 'sherrills-ford', 'charlotte-uptown', 'cherryville', 'denver-nc');
--
-- Notes on assets:
--   - Cherryville listing uses photos extracted from the client's
--     open-house flyer for the Cherryville property (his actual listing).
--   - Other listings use Unsplash direct URLs. If any URL fails to
--     resolve, the site falls back to a clean empty-photo state.

-- ---------- NEIGHBORHOODS ----------

insert into neighborhoods (slug, name, city, state, summary, body, hero_image_url) values
(
  'lake-norman',
  'Lake Norman',
  'Cornelius',
  'NC',
  'The largest man-made lake in North Carolina — 520 miles of shoreline, four bordering counties, and one of the most sought-after residential markets in the Carolinas.',
  'Lake Norman stretches from Mooresville down to Cornelius and across to Denver, giving buyers real range: quiet coves for retirees, family neighborhoods with community docks, and full-shore estates for those chasing the lifestyle at scale.

The lake formed in 1963 when Duke Energy dammed the Catawba, and the towns around it have grown up around the water ever since. Expect boat slips, waterfront restaurants, and a real weekend culture — this isn''t a lake people just look at.

**Typical price ranges (2026):** interior lots start in the $400s, waterfront begins around $850k, and full-shore estates run $2M and up.',
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&auto=format&fit=crop&q=80'
),
(
  'cornelius',
  'Cornelius',
  'Cornelius',
  'NC',
  'Anchor town of the Lake Norman market and home base for Southern Homes of the Carolinas — walkable, waterfront-adjacent, and 20 minutes from uptown Charlotte.',
  'Cornelius sits on the southeastern shore of Lake Norman and has done the rare thing of growing without losing its downtown. Antiquers Village, Peninsula Village, and the Jetton Road corridor give the town more real character than its size suggests.

For buyers, the appeal is the mix: single-family neighborhoods off West Catawba, condos and townhouses walkable to restaurants, and lakefront homes for the buyers who came here for the water in the first place.

**Commute:** ~25 min to uptown Charlotte via I-77 (with traffic — plan accordingly).',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&auto=format&fit=crop&q=80'
),
(
  'sherrills-ford',
  'Sherrills Ford',
  'Sherrills Ford',
  'NC',
  'The Catawba County side of Lake Norman — newer construction, larger lots, and better price-per-square-foot than the Mecklenburg side.',
  'Sherrills Ford has become the go-to for buyers priced out of the Cornelius/Davidson stretch but who still want lake access. The trade is real: 15–20 more minutes to Charlotte in exchange for noticeably more house.

New construction has driven most of the recent growth, with builders like Cline, Toll Brothers, and Eastwood putting up communities in the $500k–$900k range along the Highway 150 corridor.

**What to know:** most homes here are within a short drive of a public lake access point or private community dock, but true waterfront is limited and moves fast.',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80'
),
(
  'charlotte-uptown',
  'Charlotte Uptown',
  'Charlotte',
  'NC',
  'The urban option for lake-area clients who want a weekday city footprint — condos, high-rises, and walkable neighborhoods.',
  'Uptown Charlotte works well as a secondary residence for Lake Norman buyers who work in the city, or as a first home for younger buyers still building toward the lake move.

The four uptown wards each have their own personality: First Ward around the arena, Second Ward around Levine Museum and the light rail, Third Ward for Bank of America Stadium, and Fourth Ward for the historic residential streets.

**Watch for:** HOA and building fees on high-rise condos can run $500–$1,200/mo — worth working into the affordability math up front.',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1600&auto=format&fit=crop&q=80'
),
(
  'cherryville',
  'Cherryville',
  'Cherryville',
  'NC',
  'Small-town Gaston County living, 45 minutes west of Charlotte — affordable, tight-knit, and increasingly popular with first-time buyers priced out of the metro.',
  'Cherryville stays true to its small-town roots: a real Main Street, the annual New Year''s Eve Shooters tradition, and a school system families move here specifically for.

For buyers, the appeal is straightforward: a starter home here runs $200k–$300k when the Charlotte equivalent runs $400k+. The commute is a real 45 minutes each way, but for hybrid workers or single-earner households it pencils out.',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&auto=format&fit=crop&q=80'
),
(
  'denver-nc',
  'Denver',
  'Denver',
  'NC',
  'Lincoln County waterfront and interior — quieter than Cornelius, faster-growing than most people realize.',
  'Denver sits on the west side of Lake Norman across from Cornelius, with the same water access but a more rural feel. The Highway 16 corridor is the growth spine — new subdivisions, retail centers, and a still-under-construction bypass that''ll shave the Charlotte commute meaningfully once complete.

**Good fit for:** families who want lake proximity without Mecklenburg County tax rates, buyers looking for larger lots, and anyone comfortable being 5–10 minutes further from I-77.',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&auto=format&fit=crop&q=80'
);

-- ---------- LISTINGS ----------

insert into listings (
  mls_number, slug, status, list_price,
  address_line, city, state, zip, neighborhood_slug,
  bedrooms, bathrooms, square_feet, lot_size_acres, year_built,
  description,
  latitude, longitude,
  primary_photo_url, photo_urls,
  listing_agent_name, listing_office_name, mls_name, idx_disclaimer
) values

-- 1. The Cherryville property from the client's own open-house flyer.
(
  'SAMPLE-001',
  '412-mountain-view-road-cherryville-28021',
  'Active',
  249900,
  '412 Mountain View Road',
  'Cherryville', 'NC', '28021', 'cherryville',
  3, 2, 1133, 0.28, 2018,
  'Beautifully designed for comfortable everyday living. Three bedrooms, two full baths, and 1,133 square feet on a level 0.28-acre lot in an established Cherryville neighborhood. Open living/kitchen concept with luxury vinyl plank throughout the main living areas, a functional kitchen with stainless appliances and a center island that seats three, and a primary suite with an en-suite bath. Covered front porch and a rear utility yard round it out. Recently reduced $5,000 — priced to move.',
  35.3799, -81.3776,
  '/sample/cherryville/1-exterior.jpg',
  ARRAY[
    '/sample/cherryville/1-exterior.jpg',
    '/sample/cherryville/2-living-room.jpg',
    '/sample/cherryville/3-kitchen.jpg',
    '/sample/cherryville/4-bedroom.jpg',
    '/sample/cherryville/5-bathroom.jpg'
  ],
  'Eric Fisher',
  'Southern Homes of the Carolinas',
  'Canopy MLS',
  'Listing courtesy of Southern Homes of the Carolinas. Data provided by Canopy MLS. Information deemed reliable but not guaranteed.'
),

-- 2. Cornelius waterfront
(
  'SAMPLE-002',
  '18420-peninsula-club-drive-cornelius-28031',
  'Active',
  1249000,
  '18420 Peninsula Club Drive',
  'Cornelius', 'NC', '28031', 'cornelius',
  4, 3, 3280, 0.42, 2007,
  'Peninsula lakefront with year-round main-channel views, a private covered dock with boat lift, and 87 feet of shoreline. Four bedrooms and three baths across 3,280 square feet, with a primary on the main and a walk-out lower level built for entertaining. Recent updates include a redesigned kitchen with quartz and Thermador appliances, refinished hardwoods throughout the main level, and new exterior lighting. Golf-cart distance to The Peninsula Club.',
  35.4696, -80.8710,
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&auto=format&fit=crop&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop&q=80'
  ],
  'Eric Fisher',
  'Southern Homes of the Carolinas',
  'Canopy MLS',
  'Listing courtesy of Southern Homes of the Carolinas. Data provided by Canopy MLS. Information deemed reliable but not guaranteed.'
),

-- 3. Sherrills Ford new construction
(
  'SAMPLE-003',
  '7245-northshore-ridge-sherrills-ford-28673',
  'Active',
  689000,
  '7245 Northshore Ridge Drive',
  'Sherrills Ford', 'NC', '28673', 'sherrills-ford',
  4, 3, 2840, 0.34, 2025,
  'New construction just completed in Northshore Ridge — a 46-home community with private lake access and a community boat slip program. Four bedrooms, three full baths, and 2,840 square feet with a first-floor primary, a dedicated home office, and an oversized upstairs bonus. Standard features are anything but: 10-foot ceilings on the main, hardwood throughout, quartz counters, and a covered rear porch pre-wired for outdoor TV. Builder warranty transfers.',
  35.5850, -80.9720,
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop&q=80'
  ],
  'Eric Fisher',
  'Southern Homes of the Carolinas',
  'Canopy MLS',
  'Listing courtesy of Southern Homes of the Carolinas. Data provided by Canopy MLS. Information deemed reliable but not guaranteed.'
),

-- 4. Charlotte Uptown condo
(
  'SAMPLE-004',
  '215-north-pine-street-2408-charlotte-28202',
  'Active',
  429000,
  '215 North Pine Street, Unit 2408',
  'Charlotte', 'NC', '28202', 'charlotte-uptown',
  2, 2, 1385, null, 2019,
  'Twenty-fourth floor Fourth Ward condo with clean southern light and a partial skyline view. Two bedrooms split by the living space — better for roommates or a work-from-home setup than most two-bed layouts. Floor-to-ceiling windows in the main living area, primary suite with a walk-in and dual vanity, deeded parking spot in the attached garage. Building amenities include rooftop pool, gym, and a 24-hour concierge. HOA covers water, trash, and building insurance.',
  35.2280, -80.8460,
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1600&auto=format&fit=crop&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600&auto=format&fit=crop&q=80'
  ],
  'Eric Fisher',
  'Southern Homes of the Carolinas',
  'Canopy MLS',
  'Listing courtesy of Southern Homes of the Carolinas. Data provided by Canopy MLS. Information deemed reliable but not guaranteed.'
),

-- 5. Lake Norman luxury
(
  'SAMPLE-005',
  '19012-mariner-pointe-cornelius-28031',
  'Coming Soon',
  2395000,
  '19012 Mariner Pointe',
  'Cornelius', 'NC', '28031', 'lake-norman',
  5, 5, 5480, 0.68, 2015,
  'Full-shore Lake Norman estate on 0.68 acres with 165 feet of shoreline and long views down the main channel. Five bedrooms, five full baths, and 5,480 square feet — a primary on the main plus a guest suite, three additional bedrooms up, and a fully finished lower level with wet bar, home theater, and bunk room. Outdoor: covered dock with two lifts, saltwater pool, and a screened porch with a wood-burning fireplace. Coming to market next week — showings begin Saturday.',
  35.4750, -80.8850,
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format&fit=crop&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&auto=format&fit=crop&q=80'
  ],
  'Eric Fisher',
  'Southern Homes of the Carolinas',
  'Canopy MLS',
  'Listing courtesy of Southern Homes of the Carolinas. Data provided by Canopy MLS. Information deemed reliable but not guaranteed.'
),

-- 6. Denver, NC family home
(
  'SAMPLE-006',
  '2831-catawba-creek-lane-denver-28037',
  'Active',
  524900,
  '2831 Catawba Creek Lane',
  'Denver', 'NC', '28037', 'denver-nc',
  4, 2.5, 2420, 0.58, 2020,
  'Four-bedroom Denver home on a level, well-treed 0.58-acre lot in a neighborhood with a community pool, playground, and walking trails. Open main floor with the kitchen at the center — quartz counters, a farmhouse sink, and a walk-in pantry. Primary up with two closets and a garden tub. Two-car garage, screened rear porch, and a fenced backyard. Twenty minutes to the Cornelius bridge, forty to uptown.',
  35.5150, -81.0330,
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&auto=format&fit=crop&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop&q=80'
  ],
  'Eric Fisher',
  'Southern Homes of the Carolinas',
  'Canopy MLS',
  'Listing courtesy of Southern Homes of the Carolinas. Data provided by Canopy MLS. Information deemed reliable but not guaranteed.'
);
