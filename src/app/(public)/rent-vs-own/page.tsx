import type { Metadata } from "next";
import BuyerFunnel from "@/components/BuyerFunnel";
import RentVsOwnCalculator from "@/components/RentVsOwnCalculator";
import StickyCallButton from "@/components/StickyCallButton";
import { SITE, TRUST_LINE, getCityBySlug } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Stop Renting — Own a New D.R. Horton Home in NC",
  description:
    "Your rent payment could be building your equity, not your landlord's. Free rent-vs-own calculator + Buying Power Report for new D.R. Horton homes in North Carolina.",
};

const MYTHS = [
  {
    icon: "💸",
    myth: "\u201cI need 20% down.\u201d",
    fact: "Most first-time buyers put down far less.",
    body: "FHA loans require just 3.5% down. VA and USDA loans can be 0% down. On a $300K home, 3.5% is $10,500 — and builder closing cost assistance can cover much of the rest of your cash-to-close.",
  },
  {
    icon: "📉",
    myth: "\u201cMy credit isn't good enough.\u201d",
    fact: "You may qualify sooner than you think.",
    body: "FHA loans can work with credit scores as low as 580. And if you're not quite there, we'll connect you with a lender who can build you a free 60–90 day credit game plan. Renters wait years longer than they need to.",
  },
  {
    icon: "⏳",
    myth: "\u201cI'll wait for prices to drop.\u201d",
    fact: "Waiting has a cost, too.",
    body: "Every year you wait, you pay another ~$20,000+ in rent with zero return. Nobody can time the market — but you can control whether your monthly payment builds your net worth or your landlord's.",
  },
];

export default async function RentVsOwnPage({
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-navy)] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.15fr_1fr] md:items-center md:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[var(--color-teal)]/20 px-3 py-1 font-[family-name:var(--font-data)] text-xs uppercase tracking-[0.2em] text-[var(--color-carolina)]">
              For renters &amp; first-time buyers
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] md:text-5xl lg:text-6xl">
              Your rent could be building{" "}
              <em className="text-[var(--color-carolina)]">your</em> equity — not your
              landlord&rsquo;s.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/85">
              Brand-new D.R. Horton homes in {cityLabel} with monthly payments that may
              be comparable to what you&rsquo;re already paying in rent. Low- and zero-down
              programs available.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/90">
              <li className="flex gap-2"><span className="text-[var(--color-carolina)]">✓</span> Down payment programs from 0–3.5%</li>
              <li className="flex gap-2"><span className="text-[var(--color-carolina)]">✓</span> Builder-paid closing costs may apply</li>
              <li className="flex gap-2"><span className="text-[var(--color-carolina)]">✓</span> Brand new — no repairs, no surprises</li>
              <li className="flex gap-2"><span className="text-[var(--color-carolina)]">✓</span> Free help getting pre-approved</li>
            </ul>
            <a
              href="#calculator"
              className="mt-8 inline-block rounded-full bg-[var(--color-drh-red)] px-8 py-4 font-[family-name:var(--font-display)] font-bold text-white shadow-lg transition-colors hover:bg-[var(--color-drh-red-hover)]"
            >
              Compare my rent vs. owning ↓
            </a>
          </div>

          {/* Bar chart: renting vs owning equity */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-carolina)]">
              Where does your money go?
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold">
              Equity after 5 years
            </h3>
            <div className="mt-6 flex items-end gap-6">
              <div className="flex-1 text-center">
                <div className="mx-auto w-full max-w-[80px] rounded-t-lg bg-red-500/60 pt-4 text-center font-[family-name:var(--font-display)] text-2xl font-bold" style={{ height: "60px" }}>
                  $0
                </div>
                <div className="mt-2 text-sm font-semibold">Renting</div>
              </div>
              <div className="flex-1 text-center">
                <div className="mx-auto w-full max-w-[80px] rounded-t-lg bg-[var(--color-teal)] pt-4 text-center font-[family-name:var(--font-display)] text-2xl font-bold" style={{ height: "180px" }}>
                  $40K+
                </div>
                <div className="mt-2 text-sm font-semibold">Owning</div>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/85">
              Renters paying <strong>$1,800/mo</strong> hand their landlord{" "}
              <strong>$108,000</strong> over 5 years — and own nothing.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="bg-[var(--color-navy-deep)] py-20 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
              Interactive calculator
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
              Rent vs. own: run your numbers
            </h2>
            <p className="mt-3 text-white/80">
              Drag the sliders to see what you&rsquo;re really spending on rent — and what
              a new home payment might look like instead.
            </p>
          </div>
          <div className="mt-10">
            <RentVsOwnCalculator />
          </div>
          <div className="mt-8 text-center">
            <a
              href="#getstarted"
              className="inline-block rounded-full bg-[var(--color-drh-red)] px-8 py-4 font-[family-name:var(--font-display)] font-bold text-white shadow-lg transition-colors hover:bg-[var(--color-drh-red-hover)]"
            >
              See homes that fit these numbers →
            </a>
          </div>
          <p className="mt-6 text-[10px] leading-relaxed text-white/50 max-w-3xl mx-auto text-center">
            *Estimates for illustration only. Principal &amp; interest only — excludes taxes,
            insurance, HOA, and mortgage insurance. Equity estimate includes principal
            paydown plus assumed 3%/yr appreciation, which is not guaranteed. The interest
            rate is a value you enter yourself for estimation only — we are not a mortgage
            lender or loan originator and do not quote rates. Your actual rate and terms
            are determined solely by a licensed lender based on your qualifications. Not a
            loan offer.
          </p>
        </div>
      </section>

      {/* Objections */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
              &ldquo;But I can&rsquo;t buy because…&rdquo;
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
              Three myths that keep renters renting
            </h2>
          </div>
          <div className="mt-12 space-y-5">
            {MYTHS.map((m) => (
              <div
                key={m.myth}
                className="flex gap-5 rounded-2xl border border-[var(--color-line)] bg-white p-6 md:p-8"
              >
                <div className="hidden text-4xl md:block">{m.icon}</div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                    <span className="line-through text-[var(--color-ink)]/40 mr-2">
                      {m.myth}
                    </span>
                    {m.fact}
                  </h3>
                  <p className="mt-2 text-[var(--color-ink)]/80">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form + what-happens-next */}
      <section id="getstarted" className="bg-[var(--color-teal)] py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-start">
          <div>
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-carolina)]">
              Free buying power report
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
              Find out what you qualify for
            </h2>
            <p className="mt-4 text-white/85">
              No commitment, no credit pull to start, no pressure. Here&rsquo;s exactly
              what happens next:
            </p>
            <ol className="mt-6 space-y-3 text-sm">
              {[
                "We review your rent, budget, and goals (5-minute call or text)",
                "A trusted lender gives you a free pre-qualification (soft pull only)",
                "You get a list of new D.R. Horton homes with payments in your range",
                "Tour your favorites — or take your time. Zero pressure.",
              ].map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[var(--color-navy)]">
                    {i + 1}
                  </span>
                  <span className="text-white/90">{step}</span>
                </li>
              ))}
            </ol>
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

      {/* Final trust strip */}
      <section className="bg-white py-12 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <p className="text-sm text-[var(--color-ink)]/60">{TRUST_LINE}</p>
          <p className="mt-2 text-xs text-[var(--color-ink)]/50">
            Prefer to talk? Call{" "}
            <a
              href={`tel:${SITE.phone}`}
              className="font-semibold text-[var(--color-drh-red)] hover:underline"
            >
              {SITE.phone}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
