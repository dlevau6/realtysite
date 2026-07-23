import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "You're in — your home value report is on the way",
  description: "Your D.R. Horton home valuation is being prepared.",
  robots: { index: false, follow: false },
};

export default async function ThankYouSellerPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const alsoBuying = sp.buying === "1";

  return (
    <>
      {/* Google Ads conversion event — separate label from buyer conversions
          so you can attribute organic seller value distinctly in the Ads
          dashboard. Replace CONVERSION_ID / CONVERSION_LABEL when Ads is
          configured (Chapter 10). */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof gtag === 'function') {
              gtag('event', 'conversion', {
                send_to: 'AW-CONVERSION_ID/SELLER_CONVERSION_LABEL',
                event_category: 'Lead',
                event_label: 'Seller Form Submit'
              });
            }
          `,
        }}
      />

      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-drh-red)]/10 text-3xl text-[var(--color-drh-red)]">
          ✓
        </div>
        <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--color-navy)]">
          Your report is being prepared.
        </h1>
        <p className="mt-4 text-lg text-[var(--color-ink)]/80">
          {SITE.agentName} personally reviews every valuation. Expect a call
          or text within one business day with your local market read.
        </p>

        <div className="mt-10 rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-6 text-left">
          <p className="font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">
            What happens next
          </p>
          <ol className="mt-3 space-y-2 text-sm text-[var(--color-ink)]/80">
            <li>
              <span className="font-semibold">Within a few hours —</span> We
              pull recent sales on your street and comparable homes nearby.
            </li>
            <li>
              <span className="font-semibold">Within one business day —</span>{" "}
              You get a call or text with your estimated range and the
              reasoning behind it.
            </li>
            <li>
              <span className="font-semibold">Whenever you&rsquo;re ready
              —</span>{" "}
              A no-pressure conversation about timing, prep, and pricing.
            </li>
          </ol>
        </div>

        {alsoBuying ? (
          <div className="mt-10 rounded-2xl border-2 border-[var(--color-drh-red)] bg-white p-6 text-left">
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
              You said you&rsquo;re also buying
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-navy)]">
              Want to see what&rsquo;s available while you wait?
            </p>
            <p className="mt-2 text-sm text-[var(--color-ink)]/80">
              Pick a market and we&rsquo;ll text you the current D.R. Horton
              inventory and builder incentives — no separate form needed.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {SITE.cities.slice(0, 6).map((city) => (
                <Link
                  key={city.slug}
                  href={`/new-homes/${city.slug}`}
                  className="rounded-lg border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:border-[var(--color-drh-red)] hover:bg-[var(--color-drh-red)]/5"
                >
                  {city.name}, NC →
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <p className="mt-10 text-sm text-[var(--color-ink)]/60">
          Prefer to talk right now? Call{" "}
          <a
            href={`tel:${SITE.phone}`}
            className="font-semibold text-[var(--color-drh-red)] hover:underline"
          >
            {SITE.phone}
          </a>
          .
        </p>

        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-[var(--color-navy)] hover:underline"
        >
          ← Back to homepage
        </Link>
      </section>
    </>
  );
}
