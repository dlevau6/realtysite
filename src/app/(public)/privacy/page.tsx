import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DR Horton NC Homes collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
        Effective {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--color-navy)]">
        Privacy Policy
      </h1>

      <div className="mt-6 rounded-lg border-2 border-[var(--color-drh-red)]/30 bg-[var(--color-drh-red)]/5 p-4 text-sm text-[var(--color-ink)]/80">
        <strong className="text-[var(--color-drh-red)]">Legal review needed.</strong>{" "}
        This is a working starter policy. Before public launch, have a North Carolina
        real estate attorney review this document against current federal (TCPA, CAN-SPAM,
        Fair Housing) and state (NC Real Estate Commission advertising rules) requirements.
      </div>

      <div className="prose prose-slate mt-10 max-w-none space-y-6 text-[var(--color-ink)]">
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            Who we are
          </h2>
          <p>
            This site ({SITE.brandName}) is operated by {SITE.agentName}, an
            independent licensed real estate professional (NC License{" "}
            {SITE.licenseNumber}) with {SITE.brokerage}. Contact us at{" "}
            <a href={`mailto:${SITE.email}`} className="text-[var(--color-drh-red)] underline">
              {SITE.email}
            </a>{" "}
            or {SITE.phone}.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            What we collect
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Contact information you provide (name, phone, email, physical
              address if entered on the home value form)
            </li>
            <li>
              Home-buying preferences you share via our multi-step forms
              (budget, timeline, home contingency, property condition tags)
            </li>
            <li>
              Marketing attribution data (URL parameters like utm_source /
              utm_medium / utm_campaign) that identify how you found this site
            </li>
            <li>
              Basic technical information (browser type, device type, referrer)
              collected via Google Analytics and Google Ads tags
            </li>
          </ul>
          <p className="mt-4">
            If you enter Step 2 of a form and leave without completing Step 3,
            we may retain a &ldquo;partial&rdquo; record of your inputs (city, budget,
            trade-in address if entered) to reach out with additional
            information. We do not retain contact information from partial
            submissions.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            How we use it
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>Match you to available D.R. Horton homes and builder incentives</li>
            <li>Deliver home valuations you request</li>
            <li>Contact you by SMS, email, and phone about your inquiry</li>
            <li>Improve our marketing and advertising effectiveness</li>
          </ul>
          <p className="mt-4">
            We do not sell your personal information. We share it only with:
            {SITE.brokerage} (our operating brokerage), our AI-assisted texting
            service (currently used to send you your first response inside 60
            seconds), and D.R. Horton and its affiliated finance/title
            companies when you specifically ask us to.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            Your text-message consent (TCPA)
          </h2>
          <p>
            By checking the SMS consent box on any form, you agree to receive
            recurring text messages from {SITE.brandName} at the number you
            provided, including messages sent using automated technology, about
            home listings, valuations, builder incentives, and follow-up.
            Message and data rates may apply. Message frequency varies.
          </p>
          <p className="mt-4">
            <strong>Consent is not required to purchase.</strong> You can opt
            out at any time by replying <strong>STOP</strong> to any message,
            or ask for help by replying <strong>HELP</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            Email (CAN-SPAM)
          </h2>
          <p>
            Every marketing email from us includes an unsubscribe link. Click
            it to stop marketing emails; you may still receive transactional
            emails (e.g., valuation reports you requested).
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            Cookies &amp; tracking
          </h2>
          <p>
            We use Google Analytics (GA4) and Google Ads conversion tracking to
            understand which marketing efforts are working. These services set
            cookies. You can opt out via your browser settings or the Google
            Ads Settings page.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            Your rights
          </h2>
          <p>
            You can request a copy of the information we hold about you, ask us
            to correct it, or ask us to delete it by contacting{" "}
            <a href={`mailto:${SITE.email}`} className="text-[var(--color-drh-red)] underline">
              {SITE.email}
            </a>
            . We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            Fair Housing
          </h2>
          <p>
            {SITE.brandName} is committed to the Fair Housing Act. We do not
            discriminate based on race, color, national origin, religion, sex,
            familial status, or disability.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            Changes
          </h2>
          <p>
            We may update this policy from time to time. The effective date at
            the top of this page reflects the most recent update.
          </p>
        </section>
      </div>
    </article>
  );
}
