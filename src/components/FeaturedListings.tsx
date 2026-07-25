import Image from "next/image";
import Link from "next/link";
import { fetchFeaturedListings } from "@/lib/spark-api";
import SearchWidget from "@/components/SearchWidget";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

/**
 * Server component — fetches live listings from the Spark API every 10
 * minutes. Renders nothing if the API returns empty. Reads through the
 * Spark v1 `StandardFields` nesting; verified against actual demo data.
 *
 * IDX display rules require attribution: office name per row, MLS name
 * or "demo dataset" note in the aggregate disclaimer.
 */
export default async function FeaturedListings() {
  const raw = await fetchFeaturedListings({ pageSize: 12 });

  // Keep only rows that have both a real price and a real address —
  // the demo dataset occasionally emits stubs missing one or the other.
  const listings = raw
    .filter((l) => {
      const p = l.StandardFields?.ListPrice;
      const addr = l.StandardFields?.UnparsedAddress;
      return typeof p === "number" && p > 0 && addr;
    })
    .slice(0, 6);

  if (listings.length === 0) return null;

  const isDemo = !process.env.SPARK_OFFICE_ID;

  return (
    <section id="featured-listings" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
              {isDemo ? "IDX preview" : "Live from the MLS"}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
              Featured listings
            </h2>
          </div>
          <p className="text-sm text-[var(--color-ink)]/60">
            {isDemo ? "Sample data" : "Updated every 10 minutes"}
          </p>
        </div>

        {/* Compliance-compliant search widget — never uses the word "MLS". */}
        <div className="mb-10">
          <SearchWidget />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => {
            const f = listing.StandardFields;
            const photo = f.Photos?.[0]?.Uri800;
            const price = f.ListPrice ?? 0;
            const beds = f.BedsTotal;
            const bathsFull = f.BathsFull ?? 0;
            const bathsHalf = f.BathsHalf ?? 0;
            const totalBaths = bathsHalf > 0 ? `${bathsFull}.${bathsHalf === 1 ? "5" : bathsHalf}` : String(bathsFull);
            const sqft = f.BuildingAreaTotal;

            return (
              <Link
                key={listing.Id}
                href={`/listings/${listing.Id}`}
                className="group block overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-drh-red)] hover:shadow-md focus-visible:outline-2 focus-visible:outline-[var(--color-drh-red)]"
              >
                <div className="relative aspect-[4/3] bg-[var(--color-mist)]">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={f.UnparsedAddress ?? "Listing"}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl text-[var(--color-ink)]/20">
                      🏠
                    </div>
                  )}
                  <div className="absolute left-3 top-3 rounded-full bg-[var(--color-navy)] px-3 py-1 text-xs font-bold text-white shadow-md">
                    {money(price)}
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--color-navy)] leading-tight">
                    {f.UnparsedAddress ?? "Address on request"}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--color-ink)]/70">
                    {[f.City, f.StateOrProvince, f.PostalCode]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  <div className="mt-3 flex gap-4 font-[family-name:var(--font-data)] text-sm text-[var(--color-ink)]/80">
                    {typeof beds === "number" ? (
                      <span>
                        <strong className="text-[var(--color-navy)]">{beds}</strong>{" "}
                        bd
                      </span>
                    ) : null}
                    {bathsFull > 0 ? (
                      <span>
                        <strong className="text-[var(--color-navy)]">
                          {totalBaths}
                        </strong>{" "}
                        ba
                      </span>
                    ) : null}
                    {typeof sqft === "number" && sqft > 0 ? (
                      <span>
                        <strong className="text-[var(--color-navy)]">
                          {sqft.toLocaleString()}
                        </strong>{" "}
                        sqft
                      </span>
                    ) : null}
                  </div>
                  {f.ListOfficeName ? (
                    <p className="mt-3 text-[10px] text-[var(--color-ink)]/50">
                      Courtesy of {f.ListOfficeName}
                    </p>
                  ) : null}
                  <p className="mt-3 flex items-center gap-1 font-[family-name:var(--font-display)] text-sm font-bold text-[var(--color-drh-red)] transition-transform group-hover:translate-x-1">
                    See details
                    <span aria-hidden>→</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-[10px] leading-relaxed text-[var(--color-ink)]/50">
          Information deemed reliable but not guaranteed. Listings are subject
          to change without notice.{" "}
          {isDemo
            ? "Sample data shown — this preview uses the Spark API demo dataset (not North Carolina). Real MLS listings will appear once Canopy MLS access is approved."
            : "Data provided by the applicable MLS."}
        </p>
      </div>
    </section>
  );
}
