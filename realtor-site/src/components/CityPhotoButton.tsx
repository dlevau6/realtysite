import Image from "next/image";
import Link from "next/link";
import { cityLandmark, cityPhoto, type CityRef } from "@/lib/site-config";

interface Props {
  city: CityRef;
  /** Metro name shown as small eyebrow above city name */
  metroName?: string;
}

/**
 * Flat-square city photo tile with the "lakenormanrealty" rhythm — uniform
 * aspect ratio, a subtle scale-in on hover instead of Ken Burns pan (which
 * made adjacent tiles drift at different rates and broke the grid feel).
 *
 * The image itself scales; a dark bottom gradient keeps the label crisp.
 */
export default function CityPhotoButton({ city, metroName }: Props) {
  const landmark = cityLandmark(city.slug);

  return (
    <Link
      href={`/dr-horton/${city.slug}`}
      className="group relative block aspect-square overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-xl focus-visible:outline-2 focus-visible:outline-[var(--color-drh-red)]"
    >
      {/* Photo — subtle 3s scale-in on hover, one uniform direction */}
      <div className="absolute inset-0 transition-transform duration-[3000ms] ease-out group-hover:scale-110">
        <Image
          src={cityPhoto(city.slug)}
          alt={`${city.name}, NC — ${landmark || "new construction"}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Full-height dark navy gradient — heavier at bottom for label readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/95 via-[var(--color-navy)]/30 to-transparent" />

      {/* Red accent bar that thickens on hover (CTA cue) */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--color-drh-red)] transition-all duration-300 group-hover:h-1.5" />

      {/* Label */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        {metroName ? (
          <p className="font-[family-name:var(--font-data)] text-[10px] uppercase tracking-widest text-[var(--color-carolina)]">
            {metroName}
          </p>
        ) : null}
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white leading-tight">
            {city.name}
          </h3>
          <span
            aria-hidden
            className="text-xl text-white/90 transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
