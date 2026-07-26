import Link from "next/link";
import { SITE } from "@/lib/site-config";

/**
 * Compliance-compliant site header.
 *
 * REQUIRED by Canopy MLS Data Feed compliance review (per direct guidance
 * from Brigette Bouvier, Data Feed Manager). Eric Fisher and Southern
 * Homes of the Carolinas MUST appear with equal prominence — same font
 * size, same color, same weight, same style — everywhere they appear
 * together. This is a legal/regulatory requirement, not a design choice.
 *
 * Do not change the styling of one agent-brokerage side without updating
 * the other. Any change here should be reviewed against the compliance
 * rule before shipping.
 *
 * The header is deliberately minimal (brand + attribution + phone) — no
 * nav menu so landing-page conversion isn't hurt by extra exits. Chapter
 * 4's "no nav on paid traffic" rule is still respected in spirit; this
 * is compliance attribution, not navigation.
 */
export default function ComplianceHeader() {
  return (
    <header className="border-b border-[var(--color-line)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-3">
        {/* Left: brand mark */}
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]"
        >
          {SITE.brandName}
        </Link>

        {/* Center: Equal-Prominence Attribution.
            Both spans MUST use identical font-family, font-size,
            font-weight, and color per Canopy MLS Rule #5. */}
        <div className="order-3 flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-0 text-center md:order-2 md:w-auto">
          <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-navy)]">
            {SITE.agentName}
          </span>
          <span
            aria-hidden
            className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-navy)]"
          >
            ·
          </span>
          <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-navy)]">
            {SITE.brokerage}
          </span>
        </div>

        {/* Right: phone */}
        <a
          href={`tel:${SITE.phone}`}
          className="order-2 rounded-full border border-[var(--color-navy)] px-3 py-1 font-[family-name:var(--font-data)] text-xs font-bold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-navy)] hover:text-white md:order-3"
        >
          {SITE.phone}
        </a>
      </div>
    </header>
  );
}
