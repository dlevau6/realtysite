import { SITE } from "@/lib/site-config";

/**
 * Sticky tap-to-call bar pinned to the bottom of the viewport on mobile
 * only. Per spec Section 7: "Called-in leads convert better than form
 * fills in real estate." Hidden at md+ where the header phone CTA
 * already handles it.
 */
export default function StickyCallButton() {
  return (
    <a
      href={`tel:${SITE.phone}`}
      className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-center gap-2 rounded-full bg-[var(--color-drh-red)] px-6 py-4 font-[family-name:var(--font-display)] font-bold text-white shadow-2xl transition-colors hover:bg-[var(--color-drh-red-hover)] md:hidden"
      aria-label={`Call ${SITE.phone}`}
    >
      <span aria-hidden>📞</span>
      Tap to call {SITE.phone}
    </a>
  );
}
