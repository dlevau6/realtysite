/**
 * Real, API-sourced Unsplash photos for city buttons + community tiles.
 * Generated 2026-07-26 via a one-off sourcing script (fetch-unsplash-
 * photos.mjs, not part of this repo — run locally by Daimon since the
 * Cowork sandbox can't reach api.unsplash.com directly) using Eric's
 * own Unsplash developer Access Key.
 *
 * Because these came through the Unsplash API (not casual hotlinking of
 * a photo picked by browsing the site), Unsplash's API Guidelines require
 * visible attribution — photographer name + a link back to their profile
 * with UTM params — wherever the photo is used. See CityPhotoButton.tsx
 * and CommunityTileButton.tsx for where that's rendered.
 *
 * IMPORTANT: URLs below keep the `ixid` param exactly as the API returned
 * it — Unsplash's guidelines require it stay on any resized/manipulated
 * version of the URL (it's how photo views get attributed back to the
 * photographer). Only the `w` param was changed, which is an allowed
 * resize.
 *
 * Coverage: the sourcing script found a good match for 11 of 19 cities.
 * The other 8 (indian-trail, mooresville, troutman, statesville, durham,
 * fuquay-varina, leland, fayetteville) came back with no usable search
 * result even after a generic fallback query, so they're not in here —
 * cityPhoto() in site-config.ts falls back to the old generic stock pool
 * for any slug missing from CITY_PHOTOS. Re-run the script with more
 * specific queries for just those 8 to fill the gap, or hand-pick them.
 */

export interface PhotoCredit {
  url: string;
  photographerName: string;
  photographerLink: string;
}

export const CITY_PHOTOS: Record<string, PhotoCredit> = {
  charlotte: {
    url: "https://images.unsplash.com/photo-1562762394-3acfba62a48e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8MXx8Q2hhcmxvdHRlJTIwTm9ydGglMjBDYXJvbGluYSUyMHNreWxpbmV8ZW58MHwwfHx8MTc4NTA0MDIyN3ww&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Wes Hicks",
    photographerLink: "https://unsplash.com/@sickhews?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  monroe: {
    url: "https://images.unsplash.com/photo-1590457322136-5380536935fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8MXx8TW9ucm9lJTIwTm9ydGglMjBDYXJvbGluYSUyMGRvd250b3dufGVufDB8MHx8fDE3ODUwNDAyMjh8MA&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Jarvik Joshi",
    photographerLink: "https://unsplash.com/@kivraj?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  concord: {
    url: "https://images.unsplash.com/photo-1663131058546-df1ac0d05b87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8MXx8Q29uY29yZCUyME5vcnRoJTIwQ2Fyb2xpbmF8ZW58MHwwfHx8MTc4NTA0MDIyOXww&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Zac Gudakov",
    photographerLink: "https://unsplash.com/@zacgudakov?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  huntersville: {
    url: "https://images.unsplash.com/photo-1604601638310-a8a4b8648fbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8MXx8SHVudGVyc3ZpbGxlJTIwTm9ydGglMjBDYXJvbGluYXxlbnwwfDB8fHwxNzg1MDQwMjMwfDA&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Ella de Kross",
    photographerLink: "https://unsplash.com/@elladekross?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  denver: {
    url: "https://images.unsplash.com/photo-1555811531-ef20d6010f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8MXx8TGFrZSUyME5vcm1hbiUyME5vcnRoJTIwQ2Fyb2xpbmElMjBzdW5zZXR8ZW58MHwwfHx8MTc4NTA0MDIzM3ww&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Clint Patterson",
    photographerLink: "https://unsplash.com/@cbpsc1?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  raleigh: {
    url: "https://images.unsplash.com/photo-1676934556859-624fa21e2588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8MXx8UmFsZWlnaCUyME5vcnRoJTIwQ2Fyb2xpbmElMjBza3lsaW5lfGVufDB8MHx8fDE3ODUwNDAyMzN8MA&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Reba Spike",
    photographerLink: "https://unsplash.com/@rebaspike?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  clayton: {
    url: "https://images.unsplash.com/photo-1644013974938-12bdf141bd11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8MXx8Q2xheXRvbiUyME5vcnRoJTIwQ2Fyb2xpbmElMjBkb3dudG93bnxlbnwwfDB8fHwxNzg1MDQwMjM1fDA&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Elijah Mears",
    photographerLink: "https://unsplash.com/@elijahjmears?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  wilmington: {
    url: "https://images.unsplash.com/photo-1735231179264-ab53db8b2f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8MXx8V2lsbWluZ3RvbiUyME5vcnRoJTIwQ2Fyb2xpbmElMjByaXZlcndhbGt8ZW58MHwwfHx8MTc4NTA0MDIzNnww&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Josh Austin",
    photographerLink: "https://unsplash.com/@nextjoshaustin?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  bolivia: {
    url: "https://images.unsplash.com/photo-1575561723050-3a69691d9700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8MXx8T2FrJTIwSXNsYW5kJTIwTm9ydGglMjBDYXJvbGluYSUyMGNvYXN0fGVufDB8MHx8fDE3ODUwNDAyMzd8MA&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Dominic Sansotta",
    photographerLink: "https://unsplash.com/@dsan_nowsay?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  "winston-salem": {
    url: "https://images.unsplash.com/photo-1631803025020-5112aa51845d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8MXx8V2luc3Rvbi1TYWxlbSUyME5vcnRoJTIwQ2Fyb2xpbmElMjBza3lsaW5lfGVufDB8MHx8fDE3ODUwNDAyMzh8MA&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Ian McIlwraith",
    photographerLink: "https://unsplash.com/@iankmcilwraith?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  kernersville: {
    url: "https://images.unsplash.com/photo-1603568993078-39a1f2c032c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8MXx8UGllZG1vbnQlMjBOb3J0aCUyMENhcm9saW5hJTIwZG93bnRvd258ZW58MHwwfHx8MTc4NTA0MDIzOXww&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Gene Gallin",
    photographerLink: "https://unsplash.com/@genefoto?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
};

/** Generic "new construction home" stock pool for community tiles —
 *  explicitly not D.R. Horton photos, see CommunityTileButton.tsx. */
export const COMMUNITY_PHOTO_POOL: PhotoCredit[] = [
  {
    url: "https://images.unsplash.com/photo-1647579350413-a6ada4e480ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8MXx8bmV3JTIwY29uc3RydWN0aW9uJTIwaG9tZSUyMGV4dGVyaW9yfGVufDB8MHx8fDE3ODUwNDAyNDB8MA&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Eric Ardito",
    photographerLink: "https://unsplash.com/@ericardito?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  {
    url: "https://images.unsplash.com/photo-1672627170267-fca17bb54156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8Mnx8bmV3JTIwY29uc3RydWN0aW9uJTIwaG9tZSUyMGV4dGVyaW9yfGVufDB8MHx8fDE3ODUwNDAyNDB8MA&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Ernie Journeys",
    photographerLink: "https://unsplash.com/@erniejourneys?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  {
    url: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8M3x8bmV3JTIwY29uc3RydWN0aW9uJTIwaG9tZSUyMGV4dGVyaW9yfGVufDB8MHx8fDE3ODUwNDAyNDB8MA&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Zac Gudakov",
    photographerLink: "https://unsplash.com/@zacgudakov?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  {
    url: "https://images.unsplash.com/photo-1765124540406-0d354ca6b536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8MXx8bW9kZXJuJTIwc3VidXJiYW4lMjBob3VzZSUyMGRheWxpZ2h0fGVufDB8MHx8fDE3ODUwNDAyNDF8MA&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Patrick Shaun",
    photographerLink: "https://unsplash.com/@xiexianghua?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  {
    url: "https://images.unsplash.com/photo-1704457030855-9d7e726e48a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8Mnx8bW9kZXJuJTIwc3VidXJiYW4lMjBob3VzZSUyMGRheWxpZ2h0fGVufDB8MHx8fDE3ODUwNDAyNDF8MA&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Yudiono Putranto",
    photographerLink: "https://unsplash.com/@yudiono182?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
  {
    url: "https://images.unsplash.com/photo-1780047662497-10addafaaba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDA2NjcxfDB8MXxzZWFyY2h8M3x8bW9kZXJuJTIwc3VidXJiYW4lMjBob3VzZSUyMGRheWxpZ2h0fGVufDB8MHx8fDE3ODUwNDAyNDF8MA&ixlib=rb-4.1.0&q=80&w=1600",
    photographerName: "Hiboy",
    photographerLink: "https://unsplash.com/@hiboyofficial?utm_source=lakenormanrealtor1&utm_medium=referral",
  },
];
