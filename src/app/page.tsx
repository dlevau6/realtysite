import type { Metadata } from "next";
import BuyerFunnel from "@/components/BuyerFunnel";
import { SITE, TRUST_LINE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `New D.R. Horton Homes in North Carolina | From the $200s`,
  description: SITE.description,
};

// Homepage funnel doesn't target a specific city — Charlotte is the default,
// dynamically overridden on /new-homes/[city] pages.
const DEFAULT_CITY = { slug: "charlotte", name: "North Carolina" };

export default function HomePage() {
  return (
    <>
      {/* Slim promo bar — inspired by DR Horton corporate's "Red Tag Event" strip.
          Uses navy (not red) so the red button below stays the loudest signal. */}
      <div className="bg-[var(--color-navy)] py-2.5 text-center text-xs text-white md:text-sm">
        <span className="font-semibold">Builder incentives ending soon</span>
        {" · "}
        <span className="text-white/80">
          Rate buy-downs and closing-cost credits available on select move-in
          ready homes
        </span>
      </div>

      {/* Hero + form. Two-column above the fold on desktop — the entire
          purpose of this page is getting the visitor into the form.
          No nav menu, per Chapter 4 rules for paid-traffic landing pages. */}
      <section className="relative overflow-hidden bg-[var(--color-navy)] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr] md:items-center md:py-20">
          <div>
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-[0.2em] text-[var(--color-carolina)]">
              14 North Carolina markets
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] md:text-5xl lg:text-6xl">
              New D.R. Horton homes in North Carolina — starting from the $200s.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/85">
              {SITE.subheadline}
            </p>

            <ul className="mt-8 grid gap-3 text-sm text-white/90 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-[var(--color-carolina)]">
                  ✓
                </span>
                10-year builder warranty
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-[var(--color-carolina)]">
                  ✓
                </span>
                Energy-efficient new builds
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-[var(--color-carolina)]">
                  ✓
                </span>
                Builder incentives available
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-[var(--color-carolina)]">
                  ✓
                </span>
                Move-in ready options
              </li>
            </ul>

            <p className="mt-8 text-xs text-white/60">{TRUST_LINE}</p>
          </div>

          {/* The form — the ONLY exit from this page */}
          <div>
            <BuyerFunnel
              citySlug={DEFAULT_CITY.slug}
              cityName={DEFAULT_CITY.name}
              variant="A"
            />
          </div>
        </div>
      </section>

      {/* City grid — visitor's second-best action is a specific city page */}
      <section className="bg-[var(--color-mist)] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
            Serving 14 NC markets
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
            Find your new home by city
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {SITE.cities.map((city) => (
              <a
                key={city.slug}
                href={`/new-homes/${city.slug}`}
                className="rounded-xl border border-[var(--color-line)] bg-white px-5 py-4 font-[family-name:var(--font-display)] font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-drh-red)] hover:bg-[var(--color-drh-red)]/5"
              >
                {city.name}, NC →
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — real reviews from Eric's existing clients */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
            Real clients, real results
          </p>
          <h2 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
            What buyers say after closing
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <figure className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-8">
              <div className="mb-4 text-[var(--color-drh-red)]" aria-label="5 stars">
                ★★★★★
              </div>
              <blockquote className="text-[var(--color-ink)]">
                &ldquo;Eric and Melissa are extremely personal, professional,
                and thorough. They offer top-notch customer service — someone
                who is dedicated to your dreams, listens intently, and shows
                real patience through the journey.&rdquo;
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

      {/* Second CTA — captures the scrollers who bypassed the hero form */}
      <section className="bg-[var(--color-navy)] py-14 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            Ready to see what&rsquo;s available?
          </h2>
          <p className="mt-3 text-white/80">
            Get matched to homes in your budget, timeline, and city — texted to
            your phone in 60 seconds.
          </p>
          <a
            href="#top"
            className="mt-6 inline-block rounded-full bg-[var(--color-drh-red)] px-8 py-4 font-[family-name:var(--font-display)] font-bold text-white shadow-lg transition-colors hover:bg-[var(--color-drh-red-hover)]"
          >
            See Available Homes →
          </a>
        </div>
      </section>
    </>
  );
}
