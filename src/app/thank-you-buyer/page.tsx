import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "You're in — matches on the way",
  description:
    "Your D.R. Horton match list is being prepared. Expect a text within 60 seconds.",
  // Don't index the confirmation page — no SEO value, and it messes with
  // Google Ads conversion tracking if it ranks organically.
  robots: { index: false, follow: false },
};

export default function ThankYouBuyerPage() {
  return (
    <>
      {/* Google Ads conversion event — replace CONVERSION_ID / CONVERSION_LABEL
          with real values once the Ads account is set up (Chapter 10). */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof gtag === 'function') {
              gtag('event', 'conversion', {
                send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
                event_category: 'Lead',
                event_label: 'Buyer Form Submit'
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
          You&rsquo;re in — matches on the way.
        </h1>
        <p className="mt-4 text-lg text-[var(--color-ink)]/80">
          A text with available D.R. Horton homes matching your search is
          heading to your phone in the next 60 seconds. If you don&rsquo;t see
          it, check your recent messages for a number starting with{" "}
          {SITE.phone.slice(0, 3)}.
        </p>

        <div className="mt-10 rounded-2xl border border-[var(--color-line)] bg-[var(--color-mist)] p-6 text-left">
          <p className="font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">
            What happens next
          </p>
          <ol className="mt-3 space-y-2 text-sm text-[var(--color-ink)]/80">
            <li>
              <span className="font-semibold">Right now —</span> Your builder
              incentive list is being pulled.
            </li>
            <li>
              <span className="font-semibold">Within a minute —</span> A text
              from Eric arrives with your top matches.
            </li>
            <li>
              <span className="font-semibold">Within 24 hours —</span> A short
              conversation to answer any questions and, if you&rsquo;re ready,
              schedule a walkthrough.
            </li>
          </ol>
        </div>

        <p className="mt-8 text-sm text-[var(--color-ink)]/60">
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
          className="mt-10 inline-block text-sm font-medium text-[var(--color-navy)] hover:underline"
        >
          ← Back to homepage
        </Link>
      </section>
    </>
  );
}
