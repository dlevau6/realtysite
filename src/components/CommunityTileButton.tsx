import Image from "next/image";
import Link from "next/link";
import type { Community } from "@/lib/communities";
import { statusLabel } from "@/lib/communities";
import { communityPhoto, communityPhotoCredit } from "@/lib/site-config";

interface Props {
  community: Community;
}

/**
 * Community button — photo background comes from communityPhoto(), a
 * generic license-verified stock pool (see site-config.ts). This is
 * deliberately NOT a D.R. Horton community photo — those are the
 * builder's copyrighted assets and stay off-limits until Eric gets
 * photo-use permission (Section 5). A status-driven gradient overlay
 * sits on top of the photo so the badge/name stay legible and the
 * tile still communicates status at a glance. Swap communityPhoto()
 * for real community streetscape photos once Eric has them.
 */
const statusStyle: Record<
  Community["status"],
  { grad: string; accent: string; label: string; cta: string }
> = {
  selling: {
    grad: "from-emerald-900/90 via-emerald-900/40 to-transparent",
    accent: "text-emerald-100",
    label: "bg-emerald-400 text-emerald-950",
    cta: "See available homes",
  },
  "coming-soon": {
    grad: "from-amber-900/90 via-amber-900/40 to-transparent",
    accent: "text-amber-100",
    label: "bg-amber-300 text-amber-950",
    cta: "Join the first-to-know list",
  },
  "final-homes": {
    grad: "from-red-950/90 via-orange-900/40 to-transparent",
    accent: "text-orange-100",
    label: "bg-orange-300 text-orange-950",
    cta: "See final homes",
  },
  verify: {
    grad: "from-slate-900/90 via-slate-900/40 to-transparent",
    accent: "text-slate-200",
    label: "bg-slate-400 text-slate-900",
    cta: "Ask about availability",
  },
  "sold-out": {
    grad: "from-slate-900/90 via-slate-900/40 to-transparent",
    accent: "text-slate-300",
    label: "bg-slate-400 text-slate-900",
    cta: "Ask about similar",
  },
};

export default function CommunityTileButton({ community }: Props) {
  const style = statusStyle[community.status];
  const credit = communityPhotoCredit(community.slug);

  return (
    <div>
      <Link
        href={`/dr-horton/${community.citySlug}/${community.slug}`}
        className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl p-6 text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-[var(--color-drh-red)]"
      >
        {/* Photo — subtle scale-in on hover, same rhythm as CityPhotoButton */}
        <div className="absolute inset-0 transition-transform duration-[3000ms] ease-out group-hover:scale-110">
          <Image
            src={communityPhoto(community.slug)}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Status-tinted gradient overlay for legibility + status cue */}
        <div className={`absolute inset-0 bg-gradient-to-t ${style.grad}`} />

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

      {credit ? (
        <p className="mt-1 truncate text-[10px] text-[var(--color-ink)]/40">
          Photo:{" "}
          <a
            href={credit.photographerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {credit.photographerName}
          </a>{" "}
          /{" "}
          <a
            href="https://unsplash.com/?utm_source=lakenormanrealtor1&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Unsplash
          </a>
        </p>
      ) : null}
    </div>
  );
}
