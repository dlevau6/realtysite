# DR Horton NC Homes — Buyer Landing Funnel

Next.js (App Router) lead-generation site for D.R. Horton new construction
homes across 14 North Carolina markets. Built for the Google-Ads-driven
strategy in the client's guides.

Eric Fisher (Southern Homes of the Carolinas) is the operating agent.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Supabase** (Postgres) — leads storage
- **Vercel** — hosting

Deliberately NOT using: WordPress + Elementor, Heyflow (form built natively),
Follow Up Boss (Supabase for now), Homebot. See "What's next" for when to
layer these in.

## Getting on GitHub → Vercel → Supabase

1. **GitHub**: `git init && git add -A && git commit -m "DR Horton pivot" &&
   git remote add origin <your-repo-url> && git push -u origin main`.
2. **Supabase**: In the SQL Editor run **both** `supabase/schema.sql`
   (base schema) and `supabase/schema-drh.sql` (adds DR Horton lead fields).
   Copy the URL + both API keys from Project Settings → API.
3. **Vercel**: Import the repo, drop the env vars from `.env.example` into
   Project Settings → Environment Variables, deploy.

Cron is currently set to daily (Hobby plan compatible) — leave it or remove
the block from `vercel.json` if you're not syncing MLS data.

## Environment variables

Only Supabase is required for the buyer funnel to work. Spark API vars can
stay empty until you decide to layer MLS data back in.

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | required |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | required |
| `SUPABASE_URL` | required (same as above, server side) |
| `SUPABASE_SERVICE_ROLE_KEY` | required (keep secret) |
| `CRON_SECRET` | required if you keep the cron block in `vercel.json` |
| `SPARK_ACCESS_TOKEN` / `SPARK_OFFICE_ID` | leave empty for now |

## What's built

- **Homepage** (`/`) — buyer landing with hero + embedded 3-step form,
  no top nav (per Chapter 4 rules), city grid, testimonials, second CTA
- **City pages** (`/new-homes/[city]`) — one per market, all 14 statically
  generated at build time. Headline localized. Captures UTM params from
  ad clicks for CRM attribution.
- **3-step buyer funnel** (`src/components/BuyerFunnel.tsx`) — Variation A
  ("Unreleased Inventory & Price Drops"). Micro-commitment flow: budget →
  home contingency (+ optional trade-in address) → contact + TCPA consent.
  Partial capture fires on Step 2→3 transition if seller signal is present.
- **`/api/lead`** — full submission with CRM routing tag (`DRH-[City]-Buyer`
  or `Organic-Seller-[City]`)
- **`/api/lead-partial`** — the "seller trap"; captures the trade-in
  address even when Step 3 is abandoned
- **`/thank-you-buyer`** — conversion page with Google Ads pixel stub
- **Footer** — Chapter 0 DR Horton legal disclosure, brokerage info,
  Equal Housing marker, all 14 city links for local SEO

## What's next (deferred to future turns)

- **Form Variations B & C** — Rate Buy-Down and Smart Trade-Up flows. The
  `BuyerFunnel` component already accepts a `variant` prop; Step 1 and
  Step 2 question sets for B and C need to be added.
- **Landing page templates 4 & 5** — Floor Plan Matchmaker and VIP List
  variants of the city page
- **Google Places API** — bind autocomplete to `#seller-property-address`
  on Step 2 for cleanly formatted NC addresses
- **Exit-intent modal** — Step 3 abandonment recovery
- **Dynamic URL-param content** — e.g., `?model=cali` prioritizes that
  floor plan on the page
- **`/home-value` seller funnel** — mirror of the buyer flow for organic
  seller lead-gen
- **Legal pages** — `/privacy` and `/terms` (links exist in footer but
  routes not built yet)
- **Structurely wiring** — hit their webhook from `/api/lead` for
  60-second AI SMS reply
- **Google Ads conversion IDs** — replace `AW-CONVERSION_ID/CONVERSION_LABEL`
  placeholders in `/thank-you-buyer` once the Ads account is set up
- **DR Horton written authorization** — get it from Eric's DR Horton
  contact before real launch (Chapter 0)
