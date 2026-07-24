import Image from "next/image";
import Link from "next/link";
import { cityLandmark, cityPhoto, type CityRef } from "@/lib/site-config";

interface Props {
  city: CityRef;
  /** Index into the parent grid — used to vary Ken Burns pan direction
   *  so adjacent tiles don't move in lockstep. */
  index: number;
}

const KEN_BURNS_DIRECTIONS = [
  "ken-burns-nw",
  "ken-burns-ne",
  "ken-burns-sw",
  "ken-burns-se",
] as const;

export default function CityPhotoButton({ city, index }: Props) {
  const dir = KEN_BURNS_DIRECTIONS[index % KEN_BURNS_DIRECTIONS.length];
  const landmark = cityLandmark(city.slug);

  return (
    <Link
      href={`/dr-horton/${city.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-xl focus-visible:outline-2 focus-visible:outline-[var(--color-drh-red)]"
    >
      {/* Photo layer with Ken Burns pan */}
      <div className={`absolute inset-0 ${dir}`}>
        <Image
          src={cityPhoto(city.slug)}
          alt={`${city.name}, NC — ${landmark || "new construction"}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Dark bottom gradient so the label stays readable on any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/95 via-[var(--color-navy)]/40 to-transparent" />

      {/* Red accent that intensifies on hover — the CTA signal */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--color-drh-red)] transition-all duration-300 group-hover:h-2" />

      {/* Label */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-[family-name:var(--font-data)] text-[10px] uppercase tracking-widest text-white/70">
          {landmark || "North Carolina"}
        </p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white md:text-2xl">
            {city.name}
          </h3>
          <span
            aria-hidden
            className="translate-x-0 text-2xl text-white/90 transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
