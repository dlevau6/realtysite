import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BuyerFunnel from "@/components/BuyerFunnel";
import RotatingHero from "@/components/RotatingHero";
import StickyCallButton from "@/components/StickyCallButton";
import CityPhotoButton from "@/components/CityPhotoButton";
import CommunityTileButton from "@/components/CommunityTileButton";
import FeaturedListings from "@/components/FeaturedListings";
import { SITE, TRUST_LINE } from "@/lib/site-config";
import { getFeaturedCommunities } from "@/lib/communities";

export const metadata: Metadata = {
  title: `${SITE.brandName} — ${SITE.tagline}`,
  description: SITE.description,
};

// Featured communities are editable from /admin/content now — regenerate
// in the background every 5 minutes so an admin change shows up without
// a redeploy, same as the city pages.
export const revalidate = 300;

export default async function HomePage() {
  const featured = (await getFeaturedCommunities()).slice(0, 6);

  return (
    <>
      <StickyCallButton />

      {/* Section 1: Rotating hero + form. Signature above-fold moment. */}
      <section className="relative overflow-hidden text-white">
        <RotatingHero />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr] md:items-center md:py-24">
          <div>
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-[0.2em] text-[var(--color-carolina)]">
              {SITE.brandName} · Since 2005
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] md:text-5xl lg:text-6xl">
              {SITE.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              19 North Carolina cities. 50+ D.R. Horton communities. Real prices,
              current availability, and standing builder incentives — delivered
              by text in 60 seconds.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#find-your-city"
                className="rounded-full bg-white px-6 py-3 font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)] shadow-md transition-colors hover:bg-[var(--color-carolina-soft)]"
              >
                Browse by city
              </a>
              <a
                href={`tel:${SITE.phone}`}
                className="rounded-full border border-white/30 px-6 py-3 font-[family-name:var(--font-display)] font-bold text-white transition-colors hover:border-white"
              >
                Call {SITE.phone}
              </a>
            </div>
            <p className="mt-8 text-xs text-white/70">{TRUST_LINE}</p>
          </div>

          <div>
            <BuyerFunnel
              citySlug="charlotte"
              cityName="North Carolina"
              variant="A"
            />
          </div>
        </div>
      </section>

      {/* Section 2: The 1.5% listing value prop — Eric's differentiator */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-teal)] py-14 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-carolina)]">
            The {SITE.brandName} promise
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight md:text-4xl">
            {SITE.listingRatePromise.line}
          </h2>
          <p className="mt-3 text-white/80">
            Full-service listing at less than half the standard rate — because
            we&rsquo;re already earning on the buy side. One agent team, one
            timeline, one closing.
          </p>
          <Link
            href="/home-value"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-carolina-soft)]"
          >
            Get your home&rsquo;s value →
          </Link>
        </div>
      </section>

      {/* Section 2.5: Choose your path — routes visitors to the right
          landing page based on buyer type. Also gives SEO internal
          linking love to the three funnels. */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
              Where are you in the process?
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
              Choose your path
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/community-discovery",
                eyebrow: "Researching",
                title: "Explore new construction communities",
                body: "Browse D.R. Horton communities, floor plans, and pricing across 19 NC markets.",
                main: "#1F7A8C", // --color-teal
                soft: "var(--color-teal-soft)",
                hoverBorder: "hover:border-[#1F7A8C]",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm10.5 3-5.4-5.4"
                  />
                ),
              },
              {
                href: "/incentives",
                eyebrow: "Ready to buy",
                title: "See current builder incentives",
                body: "Closing cost programs, DHI Mortgage financing, and $0-down options.",
                main: "#E31837", // --color-drh-red
                soft: "rgba(227,24,55,0.1)",
                hoverBorder: "hover:border-[#E31837]",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.6 12.3 12.7 20.2a1.5 1.5 0 0 1-2.12 0l-6.8-6.8a1.5 1.5 0 0 1-.44-1.06V5.3A2 2 0 0 1 5.3 3.3h7.04c.4 0 .78.16 1.06.44l7.2 7.2a1.5 1.5 0 0 1 0 2.12ZM8.3 8.3h.01"
                  />
                ),
              },
              {
                href: "/rent-vs-own",
                eyebrow: "Currently renting",
                title: "Stop renting — compare rent vs. own",
                body: "Interactive calculator and Free Buying Power Report for first-time buyers.",
                main: "#A9832F", // --color-gold
                soft: "var(--color-gold-soft)",
                hoverBorder: "hover:border-[#A9832F]",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 21V9.5l8-6 8 6V21M9 21v-7h6v7M4 21h16"
                  />
                ),
              },
            ].map((tile) => (
              <a
                key={tile.href}
                href={tile.href}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 border-[var(--color-line)] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md ${tile.hoverBorder}`}
              >
                {/* Soft tinted corner glow — the "art" the flat cards were missing */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: tile.soft }}
                />

                <div
                  aria-hidden
                  className="relative flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: tile.soft }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={tile.main}
                    strokeWidth="1.75"
                    className="h-5 w-5"
                  >
                    {tile.icon}
                  </svg>
                </div>

                <p
                  className="relative mt-4 font-[family-name:var(--font-data)] text-xs font-semibold uppercase tracking-widest"
                  style={{ color: tile.main }}
                >
                  {tile.eyebrow}
                </p>
                <h3 className="relative mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-navy)]">
                  {tile.title}
                </h3>
                <p className="relative mt-2 flex-1 text-sm text-[var(--color-ink)]/80">
                  {tile.body}
                </p>
                <p
                  className="relative mt-4 font-[family-name:var(--font-display)] text-sm font-bold transition-transform group-hover:translate-x-1"
                  style={{ color: tile.main }}
                >
                  Learn more →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: 19 city buttons grouped by metro cluster */}
      <section id="find-your-city" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
            19 North Carolina markets
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
            Find D.R. Horton new construction homes by city
          </h2>

          <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {SITE.metros.flatMap((metro) =>
              metro.cities.map((city) => (
                <CityPhotoButton
                  key={city.slug}
                  city={city}
                  metroName={metro.name}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Section 4: Featured communities carousel */}
      {featured.length > 0 ? (
        <section className="bg-[var(--color-mist)] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
              Selling now
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
              Featured communities
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((c) => (
                <CommunityTileButton
                  key={`${c.citySlug}-${c.slug}`}
                  community={c}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Section 4.5: Live IDX listings pulled from Spark. Renders
          nothing gracefully if the API returns empty or the token is
          missing — safe to leave on even in states before MLS approval. */}
      <FeaturedListings />

      {/* Section 5: Why buy new with a buyer's agent (trust builder) */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
            Why work with a buyer&rsquo;s agent on new construction?
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
            The builder pays the buyer&rsquo;s agent. It costs you nothing.
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--color-ink)]/80">
            Walking into a D.R. Horton sales office alone means the on-site rep
            represents the builder — not you. Bringing a buyer&rsquo;s agent
            costs the same to you (nothing) and puts a licensed advocate on
            your side of the table for pricing, incentives, contract terms,
            inspections, and financing.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Negotiation leverage",
                body: "We know which builder incentives are active this month and which are about to be renewed at better terms.",
              },
              {
                title: "Independent inspection advocacy",
                body: "New construction still fails inspections. We coordinate a real third-party inspector and hold the builder to the punch list.",
              },
              {
                title: "Contract review",
                body: "Builder contracts favor the builder. We review deposit schedules, delay clauses, and change-order pricing before you sign.",
              },
              {
                title: "Financing options",
                body: "The preferred lender isn't always the best deal. We show you the rate math on DHI Mortgage vs. outside options.",
              },
              {
                title: "Trade-in strategy",
                body: "Selling your current home to buy new? We time your listing to the build completion date to avoid double mortgages.",
              },
              {
                title: "Post-closing warranty support",
                body: "The 10-year warranty is only as good as your ability to file claims. We know the process and stay in your corner.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                  ✓ {item.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ink)]/80">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: About Eric (and Melissa) */}
      <section className="bg-[var(--color-mist)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start">
            <div className="relative mx-auto h-48 w-48 flex-shrink-0 overflow-hidden rounded-full border-4 border-[var(--color-teal-soft)] md:mx-0">
              <Image
                src="/sample/eric-headshot.jpg"
                alt={SITE.agentName}
                fill
                sizes="12rem"
                className="object-cover"
              />
            </div>
            <div>
              {/* CANOPY EQUAL PROMINENCE — agent and brokerage identically styled. */}
              <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
                {SITE.agentName} · {SITE.brokerage}
              </p>
              <p className="mt-1 font-[family-name:var(--font-data)] text-[10px] uppercase tracking-widest text-[var(--color-ink)]/50">
                {SITE.agentTitle} · Lic. {SITE.licenseNumber}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
                Getting to know {SITE.agentName.split(" ")[0]} and{" "}
                {SITE.partnerName.split(" ")[0]}
              </h2>
              <p className="mt-4 text-[var(--color-ink)]/80">
                {/* TODO: replace with real bio from Eric — this is
                    placeholder drafted from the tone of his existing
                    branding materials and testimonials. */}
                {SITE.agentName} has spent two decades on the ground across
                Charlotte, Lake Norman, the Triangle, the Triad, and the NC
                coast new construction markets with {SITE.brokerage}, working
                with first-time buyers,
                relocations, and downsizers. Alongside his wife{" "}
                {SITE.partnerName.split(" ")[0]}, {SITE.agentName.split(" ")[0]}{" "}
                built {SITE.brandName} to be a specialist practice — deep on
                D.R. Horton, deliberately narrow, honest with clients about
                what fits and what doesn&rsquo;t.
              </p>

              <div className="mt-6 rounded-2xl border border-[var(--color-line)] bg-white p-6">
                <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-teal)]">
                  Buyer agent services
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink)]/80">
                  <li>
                    <span className="font-semibold text-[var(--color-navy)]">•</span>{" "}
                    Neighborhood and community shortlisting
                  </li>
                  <li>
                    <span className="font-semibold text-[var(--color-navy)]">•</span>{" "}
                    Builder incentive review and rate buy-down analysis
                  </li>
                  <li>
                    <span className="font-semibold text-[var(--color-navy)]">•</span>{" "}
                    Independent third-party inspection coordination
                  </li>
                  <li>
                    <span className="font-semibold text-[var(--color-navy)]">•</span>{" "}
                    Contract and addendum review before signing
                  </li>
                  <li>
                    <span className="font-semibold text-[var(--color-navy)]">•</span>{" "}
                    Sell-and-buy timing strategy — including our 1.5% listing rate
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
            Real clients, real closings
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
            What buyers say after moving in
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <figure className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-8">
              <div className="mb-4 text-[var(--color-drh-red)]" aria-label="5 stars">
                ★★★★★
              </div>
              <blockquote className="text-[var(--color-ink)]">
                &ldquo;Eric and Melissa are extremely personal, professional,
                and thorough. Top-notch customer service — dedicated to your
                dreams, listens intently, and shows real patience through the
                journey.&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-[var(--color-ink)]/60">
                Janica Alphin · Sherrills Ford, NC
              </figcaption>
            </figure>
            <figure className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-8">
              <div className="mb-4 text-[var(--color-drh-red)]" aria-label="5 stars">
                ★★★★★
              </div>
              <blockquote className="text-[var(--color-ink)]">
                &ldquo;Eric and Melissa were exceptional. Their responsiveness
                and knowledge of NC properties, along with the ability to
                navigate negotiations with ease, made buying a home quick and
                easy.&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-[var(--color-ink)]/60">
                Christina Ludack &amp; Torrey Sears · Sherrills Ford, NC
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <section className="bg-[var(--color-navy)] py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
            Ready to see what&rsquo;s available?
          </h2>
          <p className="mt-3 text-white/80">
            Pick a city or start with the whole state — either way, matches hit
            your phone in 60 seconds.
          </p>
          <a
            href="#find-your-city"
            className="mt-6 inline-block rounded-full bg-[var(--color-drh-red)] px-8 py-4 font-[family-name:var(--font-display)] font-bold text-white shadow-lg transition-colors hover:bg-[var(--color-drh-red-hover)]"
          >
            Browse the 14 cities →
          </a>
        </div>
      </section>
    </>
  );
}
