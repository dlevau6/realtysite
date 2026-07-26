import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using DR Horton NC Homes.",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
        Effective {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--color-navy)]">
        Terms of Service
      </h1>

      <div className="mt-6 rounded-lg border-2 border-[var(--color-drh-red)]/30 bg-[var(--color-drh-red)]/5 p-4 text-sm text-[var(--color-ink)]/80">
        <strong className="text-[var(--color-drh-red)]">Legal review needed.</strong>{" "}
        Have a North Carolina real estate attorney adapt these terms to your
        brokerage&rsquo;s specific policies and NC Real Estate Commission
        advertising rules before public launch.
      </div>

      <div className="prose prose-slate mt-10 max-w-none space-y-6 text-[var(--color-ink)]">
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            1. Who operates this site
          </h2>
          <p>
            {SITE.brandName} (&ldquo;we,&rdquo; &ldquo;us&rdquo;) is operated by{" "}
            {SITE.agentName}, an independent licensed real estate professional
            (NC License {SITE.licenseNumber}) with {SITE.brokerage}, and is
            used to market D.R. Horton new construction homes with the
            builder&rsquo;s permission. <strong>This site is not owned or
            operated by D.R. Horton, Inc.</strong>
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            2. Information accuracy
          </h2>
          <p>
            Home prices, floor plans, incentives, move-in dates, and inventory
            change frequently and without notice. Information on this site is
            provided as a starting point and is not a binding offer. All
            details should be verified with your D.R. Horton sales
            representative and the applicable purchase contract.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            3. Home valuations
          </h2>
          <p>
            Any home value estimate we provide through the /home-value form is
            an opinion based on local market knowledge and recent comparable
            sales. It is not an appraisal, is not a guarantee of listing or
            sale price, and should not be relied upon for financing decisions.
            For a formal appraisal, hire a state-licensed appraiser.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            4. Buyer/seller relationship
          </h2>
          <p>
            Submitting a form on this site does not create a buyer or seller
            representation agreement. Formal representation begins only when
            you and {SITE.agentName} sign a written agreement, in accordance
            with NC Real Estate Commission rules.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            5. Communications
          </h2>
          <p>
            By providing your phone number and checking our SMS consent box,
            you agree to receive text messages as described in our{" "}
            <a href="/privacy" className="text-[var(--color-drh-red)] underline">
              Privacy Policy
            </a>
            . Standard message and data rates may apply. Reply STOP to opt out
            at any time.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            6. Third-party trademarks
          </h2>
          <p>
            &ldquo;D.R. Horton&rdquo; and related marks are trademarks of D.R.
            Horton, Inc., and are used here with the builder&rsquo;s
            permission. All other trademarks are the property of their
            respective owners.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            7. Limitation of liability
          </h2>
          <p>
            To the fullest extent permitted by law, {SITE.brandName},{" "}
            {SITE.brokerage}, and their affiliates are not liable for any
            indirect, incidental, or consequential damages arising from your
            use of this site or reliance on any information provided.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            8. Governing law
          </h2>
          <p>
            These terms are governed by the laws of the State of North
            Carolina, without regard to conflict-of-law rules.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            9. Contact
          </h2>
          <p>
            Questions about these terms? Contact us at{" "}
            <a href={`mailto:${SITE.email}`} className="text-[var(--color-drh-red)] underline">
              {SITE.email}
            </a>{" "}
            or {SITE.phone}.
          </p>
        </section>
      </div>
    </article>
  );
}
