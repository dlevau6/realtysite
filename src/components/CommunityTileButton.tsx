import Link from "next/link";
import type { Community } from "@/lib/communities";
import { statusLabel } from "@/lib/communities";

interface Props {
  community: Community;
}

/**
 * Community button — no photo, per Section 5 of the spec (DR Horton
 * marketing images are copyrighted and off-limits). Instead we use
 * status-driven gradient backgrounds so the tiles feel deliberate
 * rather than "photo missing." Once Eric has his own community
 * streetscape photos we can swap the gradient for an image tile.
 */
const statusStyle: Record<
  Community["status"],
  { grad: string; accent: string; label: string; cta: string }
> = {
  selling: {
    grad: "from-emerald-600 to-emerald-800",
    accent: "text-emerald-100",
    label: "bg-emerald-400 text-emerald-950",
    cta: "See available homes",
  },
  "coming-soon": {
    grad: "from-amber-500 to-amber-700",
    accent: "text-amber-100",
    label: "bg-amber-300 text-amber-950",
    cta: "Join the first-to-know list",
  },
  "final-homes": {
    grad: "from-orange-600 to-red-700",
    accent: "text-orange-100",
    label: "bg-orange-300 text-orange-950",
    cta: "See final homes",
  },
  verify: {
    grad: "from-slate-600 to-slate-800",
    accent: "text-slate-200",
    label: "bg-slate-400 text-slate-900",
    cta: "Ask about availability",
  },
  "sold-out": {
    grad: "from-slate-500 to-slate-700",
    accent: "text-slate-300",
    label: "bg-slate-400 text-slate-900",
    cta: "Ask about similar",
  },
};

export default function CommunityTileButton({ community }: Props) {
  const style = statusStyle[community.status];

  return (
    <Link
      href={`/dr-horton/${community.citySlug}/${community.slug}`}
      className={`group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${style.grad} p-6 text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-[var(--color-drh-red)]`}
    >
      {/* Subtle geometric texture — a large rotated square in the
          bottom-right to give the tile depth without a real photo. */}
      <div
        aria-hidden
        className="absolute -bottom-16 -right-16 h-56 w-56 rotate-45 border border-white/15"
      />
      <div
        aria-hidden
        className="absolute -bottom-8 -right-8 h-32 w-32 rotate-45 border border-white/10"
      />

      <div className="relative flex items-start justify-between">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.label}`}
        >
          {statusLabel(community.status)}
        </span>
      </div>

      <div className="relative">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold leading-tight md:text-2xl">
          {community.name}
        </h3>
        {community.startingPrice ? (
          <p
            className={`mt-1 font-[family-name:var(--font-data)] text-sm font-bold ${style.accent}`}
          >
            {community.startingPrice}
          </p>
        ) : null}
        {community.descriptor ? (
          <p className={`mt-2 text-sm ${style.accent} opacity-80`}>
            {community.descriptor}
          </p>
        ) : null}
        <p
          className={`mt-3 flex items-center gap-1 text-sm font-semibold ${style.accent} transition-transform group-hover:translate-x-1`}
        >
          {style.cta}
          <span aria-hidden>→</span>
        </p>
      </div>
    </Link>
  );
}
