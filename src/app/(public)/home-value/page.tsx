import type { Metadata } from "next";
import SellerFunnel from "@/components/SellerFunnel";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "What's Your Home Worth in Today's Market? | Free NC Home Valuation",
  description:
    "Get a real valuation from a local expert — not a computer guess. Perfect if you're thinking about a brand-new D.R. Horton home. Free, no obligation, 60-second start.",
};

export default async function HomeValuePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const asString = (v: string | string[] | undefined): string | undefined =>
    typeof v === "string" ? v : Array.isArray(v) ? v[0] : undefined;

  const utm = {
    source: asString(sp.utm_source),
    medium: asString(sp.utm_medium),
    campaign: asString(sp.utm_campaign),
    term: asString(sp.utm_term),
  };

  return (
    <>
      {/* Hero — mirrors buyer landing structure, seller framing */}
      <section className="relative overflow-hidden bg-[var(--color-navy)] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr] md:items-center md:py-20">
          <div>
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-[0.2em] text-[var(--color-carolina)]">
              Free · No obligation · 60-second start
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] md:text-5xl lg:text-6xl">
              What&rsquo;s your home worth in today&rsquo;s market?
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/85">
              A real valuation from a local expert — not a computer guess.
              Perfect if you&rsquo;re thinking about moving into a brand-new
              D.R. Horton home.
            </p>

            <ul className="mt-8 grid gap-3 text-sm text-white/90 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-[var(--color-carolina)]">
                  ✓
                </span>
                Real comparable sales
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-[var(--color-carolina)]">
                  ✓
                </span>
                Local market expertise
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-[var(--color-carolina)]">
                  ✓
                </span>
                Trade-up timing guidance
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-[var(--color-carolina)]">
                  ✓
                </span>
                Zero pressure to list
              </li>
            </ul>
          </div>

          <div>
            <SellerFunnel utm={utm} />
          </div>
        </div>
      </section>

      {/* Why-us strip — the "not a computer guess" positioning is the
          entire differentiator here. Chapter 11 explicitly frames it
          against Zillow-style automated estimates. */}
      <section className="border-y border-[var(--color-line)] bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-[family-name:var(--font-data)] text-center text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
            Why not Zillow?
          </p>
          <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
            Automated estimates miss the details that matter.
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div>
              <div className="font-[family-name:var(--font-data)] text-2xl font-bold text-[var(--color-drh-red)]">
                01
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                Actual comps
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink)]/80">
                We pull recent sales on your street and in your subdivision —
                not county averages.
              </p>
            </div>
            <div>
              <div className="font-[family-name:var(--font-data)] text-2xl font-bold text-[var(--color-drh-red)]">
                02
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                Real condition
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink)]/80">
                A renovated kitchen or new roof can add $30–50k an algorithm
                doesn&rsquo;t see.
              </p>
            </div>
            <div>
              <div className="font-[family-name:var(--font-data)] text-2xl font-bold text-[var(--color-drh-red)]">
                03
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                Timing strategy
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink)]/80">
                If you&rsquo;re moving to new construction, we time your sale
                to your build completion date — no double mortgage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="bg-[var(--color-mist)] py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
            Ready to see the number?
          </h2>
          <p className="mt-3 text-[var(--color-ink)]/80">
            Get your local expert valuation delivered within one business day.
          </p>
          <a
            href="#top"
            className="mt-6 inline-block rounded-full bg-[var(--color-drh-red)] px-8 py-4 font-[family-name:var(--font-display)] font-bold text-white shadow-lg transition-colors hover:bg-[var(--color-drh-red-hover)]"
          >
            Get My Home Value Report →
          </a>
          <p className="mt-4 text-xs text-[var(--color-ink)]/50">
            Or call {SITE.phone} — {SITE.agentName} answers.
          </p>
        </div>
      </section>
    </>
  );
}
