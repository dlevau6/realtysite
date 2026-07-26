import type { Metadata } from "next";
import BuyerFunnel from "@/components/BuyerFunnel";
import StickyCallButton from "@/components/StickyCallButton";
import { TRUST_LINE, getCityBySlug } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "New D.R. Horton Communities in NC — Free Community Guide",
  description:
    "Explore D.R. Horton new construction communities in North Carolina — floor plans, pricing, and current incentives. Free community guide sent by text in 60 seconds.",
};

const BENEFITS = [
  {
    icon: "💰",
    title: "Builder-paid closing costs",
    body: "D.R. Horton frequently offers thousands in closing cost assistance when you use their preferred lender — money back in your pocket at closing.",
  },
  {
    icon: "🔑",
    title: "Everything is brand new",
    body: "New roof, HVAC, appliances, plumbing. No deferred maintenance surprises — your first repair bill is covered under warranty.",
  },
  {
    icon: "⚡",
    title: "Energy-efficient by design",
    body: "Modern insulation, low-E windows, and efficient HVAC systems — homeowners typically save 20–30% on utilities vs. older homes.",
  },
  {
    icon: "🛡️",
    title: "10-year structural warranty",
    body: "1 year on workmanship, 2 years on mechanical systems, 10 years on structural components — included at no cost.",
  },
  {
    icon: "📐",
    title: "Modern open floor plans",
    body: "Open kitchens, flexible bonus rooms, walk-in closets, covered patios. Multiple plans to fit your family.",
  },
  {
    icon: "🏘️",
    title: "Community amenities",
    body: "Many D.R. Horton communities include pools, playgrounds, walking trails, and parks. Some feature clubhouses and fitness centers.",
  },
];

const PROCESS = [
  { n: 1, title: "Submit your info", body: "Tell us your budget, timeline, and preferred area." },
  { n: 2, title: "Get matched", body: "We send you available communities, floor plans, and current incentives." },
  { n: 3, title: "Tour model homes", body: "Visit in person with someone who knows every community inside out." },
  { n: 4, title: "Move in", body: "Close with confidence, backed by D.R. Horton's warranty and our support." },
];

const FAQS = [
  {
    q: "Do I need my own agent to buy a D.R. Horton home?",
    a: "You can absolutely use your own agent — and we recommend it. Your buyer's agent costs you nothing because the builder pays the commission, and you get a licensed advocate on your side of the table.",
  },
  {
    q: "What incentives does D.R. Horton currently offer?",
    a: "Incentives change monthly and vary by community. Common offers include closing cost assistance, special builder financing programs through DHI Mortgage, and included upgrades. Submit your info and we'll send you the latest for your area.",
  },
  {
    q: "How long does it take to close?",
    a: "Move-in ready homes can close in as few as 30 days. Homes under construction typically take 2–5 months depending on build stage. We give you a specific estimated completion date for any home you're interested in.",
  },
  {
    q: "What does the warranty cover?",
    a: "D.R. Horton provides a limited warranty covering workmanship for 1 year, mechanical systems (plumbing, electrical, HVAC) for 2 years, and structural components for 10 years — included with every new home.",
  },
  {
    q: "Can I negotiate the price?",
    a: "New construction pricing works differently than resale. Base price is typically set, but there is often room to negotiate on upgrades, closing costs, financing incentives, and lot premiums — especially on move-in ready inventory.",
  },
  {
    q: "What's the difference between D.R. Horton, Express, and Emerald series?",
    a: "Express is the entry-level series with the most affordable pricing. The standard D.R. Horton series is the mid-range with more included features. Emerald is the premium line with upgraded finishes, larger floor plans, and premier locations.",
  },
];

export default async function CommunityDiscoveryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const asString = (v: string | string[] | undefined): string | undefined =>
    typeof v === "string" ? v : Array.isArray(v) ? v[0] : undefined;

  const cityParam = asString(sp.city);
  const city = cityParam ? getCityBySlug(cityParam) : null;
  const cityLabel = city?.name ?? "North Carolina";

  const utm = {
    source: asString(sp.utm_source),
    medium: asString(sp.utm_medium),
    campaign: asString(sp.utm_campaign),
    term: asString(sp.utm_term),
  };

  return (
    <>
      <StickyCallButton />

      {/* Urgency bar */}
      <div className="bg-[var(--color-teal)] py-2.5 text-center text-xs text-white md:text-sm">
        <span className="font-semibold">Limited homesites available</span>
        {" — "}
        <span className="text-white/85">
          D.R. Horton communities are selling fast. Lock in current pricing.
        </span>
      </div>

      {/* Hero + form */}
      <section className="relative overflow-hidden bg-[var(--color-navy)] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr] md:items-start md:py-20">
          <div>
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-[0.2em] text-[var(--color-carolina)]">
              Free community guide · {cityLabel}
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] md:text-5xl">
              Find your D.R. Horton new construction home in {cityLabel}.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/85">
              Explore brand-new communities with modern floor plans, energy-efficient
              features, and pricing you won&rsquo;t find on Zillow. Sent by text in 60 seconds.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <Stat num="30+" label="Communities" />
              <Stat num="$0" label="Agent fees to you" />
              <Stat num="10 yr" label="Structural warranty" />
            </div>

            <p className="mt-6 text-xs text-white/60">{TRUST_LINE}</p>
          </div>

          <div>
            <BuyerFunnel
              citySlug={city?.slug ?? "charlotte"}
              cityName={cityLabel}
              variant="A"
              utm={utm}
            />
          </div>
        </div>
      </section>

      {/* Why New Construction — 6 cards */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
              Why new construction
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
              6 reasons buyers choose D.R. Horton
            </h2>
            <p className="mt-3 text-[var(--color-ink)]/70">
              When you buy new, everything is yours first — no repairs, no renovations, no surprises.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-teal-soft)] text-2xl">
                  {b.icon}
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ink)]/80">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-step process */}
      <section className="bg-[var(--color-navy)] py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-carolina)]">
              How it works
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
              From inquiry to front door in 4 steps
            </h2>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {PROCESS.map((step) => (
              <li key={step.n} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-drh-red)] font-[family-name:var(--font-display)] text-xl font-bold text-white shadow-lg">
                  {step.n}
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] font-bold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
              Common questions
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
              New construction FAQ
            </h2>
          </div>
          <div className="mt-10 divide-y divide-[var(--color-line)]">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">
                  {item.q}
                  <span
                    aria-hidden
                    className="text-2xl leading-none text-[var(--color-drh-red)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/80">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--color-teal)] py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
            Ready to see what&rsquo;s available?
          </h2>
          <p className="mt-3 text-white/85">
            Get your personalized community guide with pricing, floor plans, and current builder incentives.
          </p>
          <a
            href="#top"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)] shadow-lg transition-colors hover:bg-[var(--color-carolina-soft)]"
          >
            Get my free guide →
          </a>
        </div>
      </section>
    </>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-carolina)]">
        {num}
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-white/60">
        {label}
      </div>
    </div>
  );
}
