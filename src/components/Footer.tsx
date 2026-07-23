import Link from "next/link";
import { SITE } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy-deep)] text-white">
      {/* Legal disclosure required per Chapter 0 of the strategy guide —
          confirms this site is operated with DR Horton's permission but is
          not owned by DR Horton, Inc. */}
      <div className="border-b border-white/10 bg-[var(--color-navy)] py-4 text-center text-xs text-white/70">
        <div className="mx-auto max-w-4xl px-6">
          {SITE.legalDisclaimer}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-bold">
            {SITE.brandName}
          </p>
          <p className="mt-2 text-sm text-white/70">
            Operated by {SITE.agentName}, {SITE.agentTitle}
            <br />
            {SITE.brokerage}
            <br />
            Lic. {SITE.licenseNumber}
          </p>
        </div>

        <div className="text-sm text-white/70">
          <p className="mb-2 font-semibold text-white">Contact</p>
          <p>{SITE.address.street}</p>
          <p>
            {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
          </p>
          <p className="mt-2">
            <a
              href={`tel:${SITE.phone}`}
              className="hover:text-[var(--color-carolina)]"
            >
              {SITE.phone}
            </a>
          </p>
          <p>
            <a
              href={`mailto:${SITE.email}`}
              className="hover:text-[var(--color-carolina)]"
            >
              {SITE.email}
            </a>
          </p>
          <p className="mt-4">
            <Link
              href="/home-value"
              className="font-semibold text-[var(--color-carolina)] hover:text-white"
            >
              Thinking of selling? Get a home valuation →
            </Link>
          </p>
        </div>

        <div className="text-sm text-white/70">
          <p className="mb-2 font-semibold text-white">Areas we serve</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {SITE.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/new-homes/${city.slug}`}
                className="hover:text-[var(--color-carolina)]"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50">
        <div className="mb-2 flex justify-center gap-4">
          <Link href="/privacy" className="hover:text-white">
            Privacy policy
          </Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <span>·</span>
          <span aria-label="Equal Housing Opportunity">🏠 Equal Housing Opportunity</span>
        </div>
        © {new Date().getFullYear()} {SITE.brandName}. All rights reserved.
      </div>
    </footer>
  );
}
