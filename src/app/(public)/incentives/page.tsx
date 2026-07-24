import type { Metadata } from "next";
import BuyerFunnel from "@/components/BuyerFunnel";
import CountdownTimer from "@/components/CountdownTimer";
import StickyCallButton from "@/components/StickyCallButton";
import { SITE, TRUST_LINE, getCityBySlug } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "D.R. Horton Builder Incentives in NC — Current Programs",
  description:
    "See current D.R. Horton builder incentives in North Carolina — closing cost programs, DHI Mortgage financing options, and $0-down programs. Free eligibility check in 60 seconds.",
};

const INCENTIVE_TIERS = [
  {
    tag: "Most popular",
    title: "Closing cost assistance",
    body: "Thousands in closing costs paid by the builder when you finance through DHI Mortgage on eligible homes.",
    subtle: false,
  },
  {
    tag: "Ask about current programs",
    title: "DHI Mortgage financing",
    body: "Special builder financing programs through DHI Mortgage on select move-in ready homes. Program terms and eligibility set by the lender.",
    subtle: false,
    featured: true,
  },
  {
    tag: "Zero-down options",
    title: "VA & USDA-eligible programs",
    body: "$0-down programs for veterans and rural-area buyers, combined with builder incentives on qualifying communities.",
    subtle: false,
  },
];

const SAVINGS_ROWS = [
  ["Builder closing cost credit (typical)", "$5,000 – $15,000+"],
  ["Financing program savings", "Varies by program"],
  ["Included features & upgrades", "$3,000 – $8,000"],
  ["Buyer's agent representation", "$0 to you"],
];

export default async function IncentivesPage({
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

      {/* Countdown bar */}
      <div className="bg-[var(--color-navy-deep)] py-3">
        <div className="mx-auto max-w-6xl px-6">
          <CountdownTimer />
        </div>
      </div>

      {/* Hero + form */}
      <section className="relative overflow-hidden bg-[var(--color-navy)] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr] md:items-start md:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[var(--color-drh-red)]/15 px-3 py-1 font-[family-name:var(--font-data)] text-xs uppercase tracking-[0.2em] text-[var(--color-drh-red)]">
              🎁 Current D.R. Horton buyer incentives
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] md:text-5xl">
              See what builder incentives you qualify for in {cityLabel}.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/85">
              D.R. Horton incentives reset every month. Get the current stack of closing
              cost programs and financing options that apply to communities in your area.
            </p>
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

      {/* 3 incentive tiers */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
              Three ways buyers save right now
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
              Current D.R. Horton buyer incentive programs
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
            {INCENTIVE_TIERS.map((tier) => (
              <div
                key={tier.title}
                className={`flex flex-col rounded-2xl border-2 p-6 ${
                  tier.featured
                    ? "scale-[1.02] border-[var(--color-drh-red)] bg-[var(--color-navy)] text-white shadow-xl"
                    : "border-[var(--color-line)] bg-white"
                }`}
              >
                <div
                  className={`inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    tier.featured
                      ? "bg-[var(--color-drh-red)] text-white"
                      : "bg-[var(--color-teal-soft)] text-[var(--color-navy)]"
                  }`}
                >
                  {tier.tag}
                </div>
                <h3
                  className={`mt-4 font-[family-name:var(--font-display)] text-xl font-bold ${
                    tier.featured ? "text-white" : "text-[var(--color-navy)]"
                  }`}
                >
                  {tier.title}
                </h3>
                <p
                  className={`mt-2 text-sm ${
                    tier.featured ? "text-white/85" : "text-[var(--color-ink)]/80"
                  }`}
                >
                  {tier.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value stack + savings table */}
      <section className="bg-[var(--color-mist)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
                Why act this month
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
                Builder incentives are strongest on standing inventory
              </h2>
              <p className="mt-4 text-[var(--color-ink)]/80">
                Move-in ready homes carry the deepest incentive stacks — D.R. Horton
                needs to move them off the books, and the programs reflect that. That
                pool of homes turns over monthly. What&rsquo;s available today may not
                be available at month-end.
              </p>
              <p className="mt-4 text-[var(--color-ink)]/80">
                We monitor every community daily. Tell us what you&rsquo;re looking for
                and we&rsquo;ll flag the standing inventory with the strongest incentive
                packages in {cityLabel} right now.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-sm">
              <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                Example buyer savings stack
              </p>
              <table className="mt-4 w-full text-sm">
                <tbody>
                  {SAVINGS_ROWS.map(([label, value]) => (
                    <tr
                      key={label}
                      className="border-t border-[var(--color-line)] first:border-t-0"
                    >
                      <td className="py-3 pr-4 text-[var(--color-ink)]/80">
                        {label}
                      </td>
                      <td className="py-3 text-right font-[family-name:var(--font-data)] font-semibold text-[var(--color-navy)]">
                        {value}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-[var(--color-drh-red)]">
                    <td className="py-3 pr-4 font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">
                      Total potential value
                    </td>
                    <td className="py-3 text-right font-[family-name:var(--font-data)] text-lg font-bold text-[var(--color-drh-red)]">
                      $15,000+
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-4 text-[10px] leading-relaxed text-[var(--color-ink)]/50">
                Illustrative only. Actual amounts vary by community, program eligibility,
                and financing. We are not a mortgage lender or loan originator; all
                financing programs, rates, and terms are provided solely by licensed
                lenders including DHI Mortgage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* No-pressure guarantee */}
      <section className="bg-[var(--color-navy)] py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl">
            🛡️
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            Zero-pressure guarantee
          </h2>
          <p className="mt-3 text-white/80">
            No obligation. No credit pull to get started. No pushy sales calls. Just the
            real picture of what&rsquo;s available and what you qualify for.
          </p>
          <a
            href="#top"
            className="mt-6 inline-block rounded-full bg-[var(--color-drh-red)] px-8 py-4 font-[family-name:var(--font-display)] font-bold text-white shadow-lg transition-colors hover:bg-[var(--color-drh-red-hover)]"
          >
            See my incentives →
          </a>
          <p className="mt-4 text-xs text-white/50">
            Or call {SITE.phone} — {SITE.agentName.split(" ")[0]} answers.
          </p>
        </div>
      </section>
    </>
  );
}
