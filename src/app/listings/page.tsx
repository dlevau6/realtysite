import type { Metadata } from "next";
import PropertyCard from "@/components/PropertyCard";
import { getFeaturedListings } from "@/lib/data/listings";
import { SITE } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Homes for Sale",
  description: `Current listings from ${SITE.agentName} across ${SITE.serviceAreas.join(", ")}.`,
};

export default async function ListingsPage() {
  const listings = await getFeaturedListings(48);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-teal)]">
        {listings.length} active {listings.length === 1 ? "listing" : "listings"}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--color-navy)]">
        Homes for sale
      </h1>

      {listings.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {listings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-[var(--color-line)] p-10 text-center text-[var(--color-ink)]/60">
          No listings synced yet. Once Spark API credentials are configured,
          run <code>/api/sync-listings</code> to populate this page.
        </p>
      )}
    </section>
  );
}
