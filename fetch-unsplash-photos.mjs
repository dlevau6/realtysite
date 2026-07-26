// One-off Unsplash sourcing script for the LakeNormanRealtor1 site.
//
// Run this on a machine with real internet access (your laptop, not the
// Cowork sandbox — api.unsplash.com isn't reachable from there).
//
// Usage:
//   UNSPLASH_ACCESS_KEY=your_access_key node fetch-unsplash-photos.mjs
//
// Requires Node 18+ (built-in fetch, no npm install needed).
//
// What it does:
//   1. Searches one relevant photo per city (19 total) for the site's
//      city buttons / city page heroes.
//   2. Searches a small pool of generic "new construction home" photos
//      for the community tiles (D.R. Horton's own community photos are
//      off-limits until Eric gets permission — these are just stand-ins).
//   3. Triggers Unsplash's required "download" tracking ping for every
//      photo actually selected (API Guideline #2 — required when a photo
//      is chosen for permanent placement, not just casual hotlinking).
//   4. Writes everything — photo URL + required photographer attribution
//      — to city-photos.generated.json in this same folder.
//
// Send the resulting city-photos.generated.json back and it gets wired
// into src/lib/site-config.ts + the photo attribution UI.

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error("Set UNSPLASH_ACCESS_KEY first, e.g.:\n  UNSPLASH_ACCESS_KEY=xxxx node fetch-unsplash-photos.mjs");
  process.exit(1);
}

const APP_NAME = "lakenormanrealtor1"; // used in required UTM attribution links

// city slug -> search query. Small towns get a query likely to return
// something usable; if a search comes back empty we fall back to a
// generic NC query further down.
const CITY_QUERIES = {
  charlotte: "Charlotte North Carolina skyline",
  monroe: "Monroe North Carolina downtown",
  concord: "Concord North Carolina",
  huntersville: "Huntersville North Carolina",
  "indian-trail": "Union County North Carolina suburb",
  mooresville: "Lake Norman North Carolina",
  troutman: "Lake Norman State Park North Carolina",
  statesville: "Statesville North Carolina downtown",
  denver: "Lake Norman North Carolina sunset",
  raleigh: "Raleigh North Carolina skyline",
  durham: "Durham North Carolina downtown",
  "fuquay-varina": "Fuquay-Varina North Carolina Main Street",
  clayton: "Clayton North Carolina downtown",
  wilmington: "Wilmington North Carolina riverwalk",
  leland: "Cape Fear River North Carolina",
  bolivia: "Oak Island North Carolina coast",
  "winston-salem": "Winston-Salem North Carolina skyline",
  kernersville: "Piedmont North Carolina downtown",
  fayetteville: "Fayetteville North Carolina downtown",
};

const FALLBACK_QUERY = "small town North Carolina Main Street";

const COMMUNITY_QUERIES = [
  "new construction home exterior",
  "modern suburban house daylight",
];

async function searchOne(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&per_page=3&orientation=landscape`;
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });
  if (!res.ok) {
    throw new Error(`Search failed (${res.status}) for "${query}": ${await res.text()}`);
  }
  const data = await res.json();
  return data.results ?? [];
}

async function triggerDownload(photo) {
  // Required by Unsplash API Guideline #2 whenever a photo is selected
  // for permanent use, not just a one-off hotlink.
  try {
    await fetch(`${photo.links.download_location}&client_id=${ACCESS_KEY}`);
  } catch {
    // Non-fatal — don't block the script over a tracking ping failing.
  }
}

function toEntry(photo) {
  return {
    id: photo.id,
    url: photo.urls.regular, // includes required ixid param
    photographerName: photo.user.name,
    photographerLink: `${photo.user.links.html}?utm_source=${APP_NAME}&utm_medium=referral`,
  };
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const cityPhotos = {};
  const communityPool = [];

  console.log("Fetching city photos...");
  for (const [slug, query] of Object.entries(CITY_QUERIES)) {
    let results = await searchOne(query);
    if (results.length === 0) {
      console.log(`  ${slug}: no results for "${query}", falling back...`);
      results = await searchOne(FALLBACK_QUERY);
    }
    const photo = results[0];
    if (!photo) {
      console.warn(`  ${slug}: NO PHOTO FOUND — leave this one for manual pick`);
      continue;
    }
    await triggerDownload(photo);
    cityPhotos[slug] = toEntry(photo);
    console.log(`  ${slug}: ${photo.id} (by ${photo.user.name})`);
    await sleep(200); // stay well under the 50 req/hr demo rate limit
  }

  console.log("\nFetching community stock pool...");
  for (const query of COMMUNITY_QUERIES) {
    const results = await searchOne(query);
    for (const photo of results) {
      await triggerDownload(photo);
      communityPool.push(toEntry(photo));
      console.log(`  pool: ${photo.id} (by ${photo.user.name})`);
      await sleep(200);
    }
  }

  const fs = await import("node:fs/promises");
  await fs.writeFile(
    "city-photos.generated.json",
    JSON.stringify({ cityPhotos, communityPool }, null, 2)
  );
  console.log("\nDone. Wrote city-photos.generated.json — send this file back.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});