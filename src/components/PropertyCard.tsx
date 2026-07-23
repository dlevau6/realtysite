import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/types/database";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function PropertyCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-mist)]">
        {listing.primary_photo_url ? (
          <Image
            src={listing.primary_photo_url}
            alt={`${listing.address_line}, ${listing.city}, ${listing.state}`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
        {listing.status !== "Active" ? (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--color-navy)] px-3 py-1 text-xs font-semibold text-white">
            {listing.status}
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <p className="font-[family-name:var(--font-data)] text-lg font-medium text-[var(--color-navy)]">
          {priceFormatter.format(listing.list_price)}
        </p>
        <p className="mt-1 text-sm text-[var(--color-ink)]">{listing.address_line}</p>
        <p className="text-sm text-[var(--color-ink)]/60">
          {listing.city}, {listing.state} {listing.zip}
        </p>
        <div className="mt-3 flex gap-4 font-[family-name:var(--font-data)] text-xs text-[var(--color-ink)]/70">
          <span>{listing.bedrooms} bd</span>
          <span>{listing.bathrooms} ba</span>
          <span>{listing.square_feet.toLocaleString()} sqft</span>
        </div>
      </div>
    </Link>
  );
}
