import Image from "next/image";
import { fetchFeaturedListings } from "@/lib/spark-api";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

/**
 * Server component — fetches live listings from the Spark API on the
 * server every 10 minutes. Renders nothing if the API returns empty (missing
 * env var, no results, or vendor outage) so the homepage stays clean.
 *
 * IDX display rules require attribution: we surface the listing office
 * name per row and the aggregate MLS name in the section disclaimer.
 */
export default async function FeaturedListings() {
  const listings = await fetchFeaturedListings({ pageSize: 6 });
  if (listings.length === 0) return null;

  // Collect unique source system names for the aggregate disclaimer.
  const sources = [
    ...new Set(listings.map((l) => l.SourceSystemName).filter(Boolean)),
  ].join(", ");

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
              Live from the MLS
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)] md:text-4xl">
              Featured listings
            </h2>
          </div>
          <p className="text-sm text-[var(--color-ink)]/60">
            Updated every 10 minutes
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => {
            const photo = listing.Photos?.[0]?.Uri800;
            return (
              <article
                key={listing.Id}
                className="group overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] bg-[var(--color-mist)]">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={listing.UnparsedAddress}
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
                    {money(listing.ListPrice)}
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                    {listing.UnparsedAddress}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--color-ink)]/70">
                    {listing.City}, {listing.StateOrProvince}{" "}
                    {listing.PostalCode}
                  </p>
                  <div className="mt-3 flex gap-4 font-[family-name:var(--font-data)] text-sm text-[var(--color-ink)]/80">
                    <span>
                      <strong className="text-[var(--color-navy)]">
                        {listing.BedroomsTotal}
                      </strong>{" "}
                      bd
                    </span>
                    <span>
                      <strong className="text-[var(--color-navy)]">
                        {listing.BathroomsTotalInteger}
                      </strong>{" "}
                      ba
                    </span>
                    {listing.LivingArea > 0 ? (
                      <span>
                        <strong className="text-[var(--color-navy)]">
                          {listing.LivingArea.toLocaleString()}
                        </strong>{" "}
                        sqft
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-[10px] text-[var(--color-ink)]/50">
                    Courtesy of {listing.ListOfficeName}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* IDX aggregate disclaimer — required by MLS display rules */}
        <p className="mt-8 text-[10px] leading-relaxed text-[var(--color-ink)]/50">
          Information deemed reliable but not guaranteed. Data provided by{" "}
          {sources || "the MLS"}. Listings are subject to change without notice.
          {" "}
          {process.env.SPARK_OFFICE_ID
            ? null
            : "Sample data shown — this preview uses the Spark API demo dataset."}
        </p>
      </div>
    </section>
  );
}
