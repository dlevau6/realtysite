# LakeNormanRealtor1 — DR Horton NC specialist site

Next.js (App Router) lead-generation site for Eric Fisher — the
LakeNormanRealtor1 brand — as a D.R. Horton new construction specialist
across 19 North Carolina cities.

Eric Fisher (NC License #362747) is the operating agent through Southern
Homes of the Carolinas. Melissa Fisher is featured as his partner.

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
2. **Supabase**: In the SQL Editor run these files in order:
   `supabase/schema.sql` → `supabase/schema-drh.sql` → `supabase/schema-drh-v2.sql`
   → `supabase/schema-drh-v3.sql` → `supabase/schema-drh-v4.sql` →
   `supabase/schema-drh-v5.sql` → `supabase/schema-drh-v6.sql` →
   `supabase/schema-drh-v7.sql`. Each is safe to skip if already run.
   v3 adds the `settings` table used by the admin panel; v5 adds
   `city_content` + `communities`, the tables behind `/admin/content`;
   v6 adds lead-source tracking + settings rows for the (currently
   disabled, placeholder) iHomefinder sync; v7 fixes Follow Up Boss to
   use their real API instead of a generic webhook URL.
   After v5, run `scripts/seed-content.ts` once (see that file's header)
   to push the existing city/community copy into Supabase so
   `/admin/content` has something to show and edit.
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
| `ADMIN_PASSWORD` | password Eric enters at `/admin/login` |
| `ADMIN_SESSION_SECRET` | HMAC key for admin cookies (`openssl rand -hex 32`) |

## Admin panel

Eric signs in at **`/admin/login`** with `ADMIN_PASSWORD`. Session lasts
12 hours; cookie is HTTP-only, SameSite=Strict, HMAC-signed with
`ADMIN_SESSION_SECRET`. Middleware protects all `/admin/*` and
`/api/admin/*` routes.

- **`/admin`** — dashboard with today / week / all-time lead counts,
  buyer vs seller split, complete vs partial split, organic-seller
  count, top cities, and the 8 most-recent leads
- **`/admin/leads`** — filterable table (by type, status, city, source,
  organic-seller flag, or search across name/email/phone/address).
  "Source" distinguishes leads from our own forms (`site`) vs. leads
  pulled in from iHomefinder's search widget (`ihomefinder_native`) —
  see the iHomefinder section below.
- **`/admin/content`** — per-city editor for intro copy, relocation
  highlights, community write-ups, and the community button tiles
  (name/status/price/descriptor/link) — add, edit, or remove communities
  without a redeploy. Reads/writes the `city_content` and `communities`
  Supabase tables; falls back to the static defaults in
  `src/lib/city-content.ts` / `src/lib/communities.ts` for anything not
  yet in the database. Deliberately does NOT expose legal/compliance
  copy (equal-prominence header, TCPA consent text, IDX disclaimers,
  schema markup) — those stay code-controlled.
- **`/admin/settings`** — integrations control panel. All values stored
  in the Supabase `settings` table and read at request time — no
  redeploy needed to change them. Covers:
  - Structurely / Homebot webhook URLs (Homebot only fires for seller
    leads)
  - Follow Up Boss API key (their real API, not a webhook URL — see
    below)
  - Notification email
  - Google Ads conversion ID + buyer/seller labels
  - GA4 measurement ID

After each successful form submission the API routes POST the lead
payload to any webhook URL configured in Settings (fire-and-forget, 5s
timeout, no impact on user response time). Thank-you pages read the
Google Ads / GA4 IDs from settings and inject the correct gtag base +
conversion event automatically.

### Follow Up Boss (real, working integration)

Unlike the other integrations below, this one is built against Follow Up
Boss's actual public API docs
(https://docs.followupboss.com/reference/events-post), not a guess:
`src/lib/followupboss.ts` POSTs to `https://api.followupboss.com/v1/events`
with HTTP Basic Auth (the API key), in the exact payload shape FUB
documents. It fires automatically after every buyer/seller lead save —
nothing else to build. To turn it on: in Eric's Follow Up Boss account go
to **Admin → API**, generate a key, paste it into `/admin/settings` under
"Follow Up Boss CRM." The older `followupboss_webhook_url` setting is
deprecated and no longer read by anything.

### iHomefinder MAX sync (placeholder — not live)

Eric chose iHomefinder MAX as his CRM. The scaffolding for a
bidirectional sync is in place but **intentionally does nothing until
you flip `ihomefinder_sync_enabled` to `true`** in `/admin/settings`,
because the actual API contract is unconfirmed:

- **Push** (`src/lib/ihomefinder.ts`) — fires after every buyer/seller
  lead is saved, same fire-and-forget pattern as the other webhooks.
  Posts to whatever URL is in `ihomefinder_push_endpoint` with
  `ihomefinder_api_key` as a Bearer token. The endpoint and request body
  are a best guess, not a confirmed contract — a document Eric forwarded
  named an endpoint that doesn't match iHomefinder's publicly documented
  APIs, so don't trust it. Get the real endpoint/auth/payload from
  Eric's iHomefinder account rep before enabling.
- **Pull** (`/api/webhooks/ihomefinder`) — a receiver endpoint iHomefinder
  could POST their own search-widget leads to, if their "Lead
  Forwarding" feature supports a custom destination (needs confirming
  with their support). Authenticated via a shared secret as a URL query
  param (`?secret=...`) since we can't control what headers a
  third-party forwarder sends. Inserts as `lead_source =
  'ihomefinder_native'` so `/admin/leads` shows everything — our funnel
  leads and their widget leads — in one table.

Once real docs are in hand, expect to rewrite the payload shape in both
files; the settings-driven endpoint/key means that's a config change,
not a redeploy, for the push side at least.

## What's built

- **Homepage** (`/`) — buyer landing with hero + embedded 3-step form,
  no top nav (per Chapter 4 rules), city grid, testimonials, second CTA
- **City pages** (`/new-homes/[city]`) — one per market, all 19 statically
  generated at build time. Headline localized. Captures UTM params from
  ad clicks for CRM attribution.
- **3-step buyer funnel** (`src/components/BuyerFunnel.tsx`) — Variation A
  ("Unreleased Inventory & Price Drops"). Micro-commitment flow: budget →
  home contingency (+ optional trade-in address) → contact + TCPA consent.
  Partial capture fires on Step 2→3 transition if seller signal is present.
- **Seller landing** (`/home-value`) — organic-search destination for
  "what's my home worth" style queries. Own 3-step funnel: address →
  condition tags + also-buying cross-sell → contact + TCPA consent.
- **`/api/lead`** — buyer form full submission, computes CRM routing tag
- **`/api/lead-partial`** — buyer form Step 2 abandonment capture
- **`/api/seller-lead`** — seller form submission with property condition
  and also-buying flag; routes to `Organic-Seller-Direct*` CRM tags
- **`/thank-you-buyer`** — buyer conversion page with Google Ads pixel stub
- **`/thank-you-seller`** — seller conversion page; conditionally shows a
  city-picker cross-sell when the visitor said they're also buying
- **`/privacy`** and **`/terms`** — real starter content, flagged for
  attorney review before launch
- **Footer** — Chapter 0 DR Horton legal disclosure, brokerage info,
  Equal Housing marker, all 19 city links, "thinking of selling?" CTA

## What's next (deferred to future turns)

- **Form Variations B & C** — Rate Buy-Down and Smart Trade-Up flows. The
  `BuyerFunnel` component already accepts a `variant` prop; Step 1 and
  Step 2 question sets for B and C need to be added.
- **Landing page templates 4 & 5** — Floor Plan Matchmaker and VIP List
  variants of the city page
- **Google Places API** — bind autocomplete to address inputs on both
  buyer Step 2 and seller Step 1
- **Exit-intent modal** — Step 3 abandonment recovery on both funnels
- **Dynamic URL-param content** — e.g., `?model=cali` prioritizes that
  floor plan on the page
- **Structurely wiring** — hit their webhook from `/api/lead` and
  `/api/seller-lead` for 60-second AI SMS reply
- **Homebot enrollment** — pipe seller leads into Homebot for the
  automated monthly home-value/equity digest
- **Google Ads conversion IDs** — replace the placeholders in
  `/thank-you-buyer` and `/thank-you-seller` once the Ads account is set up
- **DR Horton written authorization** — get it from Eric's DR Horton
  contact before real launch (Chapter 0)
- **Legal review** — have a NC real estate attorney adapt `/privacy` and
  `/terms` to the specific brokerage policies and NCREC rules
