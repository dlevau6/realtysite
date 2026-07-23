# Lake Norman Realtor1 — Site

Next.js (App Router) real estate site for Eric Fisher / Lake Norman Realtor1,
with Spark API (Bridge Interactive) IDX integration and Supabase as the data
layer.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Supabase** (Postgres) — cached listings, neighborhoods, leads
- **Spark API** — MLS/IDX listing feed, synced into Supabase on a schedule
- **Vercel** — hosting + cron

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in real values, see below
npm run dev
```

## Getting this onto GitHub → Vercel → Supabase

1. **GitHub**: push this folder to a new repo (`git init && git add -A &&
   git commit -m "Initial scaffold" && git remote add origin <your-repo-url>
   && git push -u origin main`).
2. **Supabase**: create a new project, then run `supabase/schema.sql` in the
   SQL editor (Project → SQL Editor → paste → Run). Copy the project URL and
   both API keys (anon + service role) from Project Settings → API.
3. **Vercel**: import the GitHub repo, add the environment variables below
   in Project Settings → Environment Variables, then deploy. `vercel.json`
   already defines the cron job — no extra setup needed there.
4. **Spark API**: apply for access at sparkplatform.com. The MLS board has
   to approve the application against the client's MLS credentials, which
   can take a few days — kick this off early. Once approved, drop the
   access token and office ID into Vercel's env vars and the next cron run
   will populate listings.

## Environment variables

See `.env.example`. All of these need to be set in Vercel for production:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_URL` | same as above (server-side copy) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API (keep secret) |
| `SPARK_ACCESS_TOKEN` | Issued by Spark once the MLS board approves your app |
| `SPARK_OFFICE_ID` | The client's MLS office ID |
| `CRON_SECRET` | Any random string — must match what Vercel Cron sends |

## What's scaffolded vs. what's still open

**Done:**
- Full page structure: home, listings (index + detail), neighborhoods
  (index + detail), about
- Spark API client + mapper (`src/lib/spark-api.ts`) and the cron-protected
  sync route (`src/app/api/sync-listings/route.ts`)
- Supabase schema with RLS (`supabase/schema.sql`)
- Lead capture form + API route
- JSON-LD schema for agent, listings, and reviews (`src/lib/schema.tsx`)
- `sitemap.ts` / `robots.ts`, ISR on all data-driven pages
- Brand design system in `globals.css` (see also `src/lib/site-config.ts`
  for the single source of truth on agent/brokerage info)

**Still open:**
- Real client bio copy on `/about` (currently placeholder text)
- Neighborhood content — the `neighborhoods` table starts empty; write and
  add rows for the service areas in `SITE.serviceAreas`
- Video walkthroughs — the two `.mov` files from the client need
  transcoding (MP4/WebM) and a hosting decision (Mux, Cloudflare Stream, or
  Supabase Storage) before they go on listing pages
- A clean logo file (SVG/transparent PNG) — nothing in the client's asset
  batch was an isolated logo; currently using the branding flyer as a style
  reference only
- Lead notification — `/api/lead` saves to Supabase but doesn't yet email/
  text the agent (suggest Resend or similar)
- IDX display-rule review — confirm the disclaimer text in
  `mapSparkListingToRow` matches the client's MLS board's exact required
  wording before launch
