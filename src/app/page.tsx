import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import HorizonDivider from "@/components/HorizonDivider";
import Testimonials from "@/components/Testimonials";
import { JsonLd, agentSchema } from "@/lib/schema";
import { getFeaturedListings } from "@/lib/data/listings";
import { SITE } from "@/lib/site-config";

export const revalidate = 3600; // ISR: refresh hourly between MLS syncs

export default async function HomePage() {
  const listings = await getFeaturedListings();

  return (
    <>
      <JsonLd data={agentSchema()} />

      {/* Hero — the headline sits on the "shoreline," the site's central
          visual idea: your next home is the horizon you're moving toward. */}
      <section className="relative overflow-hidden bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-[0.2em] text-[var(--color-gold-soft)]">
            {SITE.serviceAreas.slice(0, 2).join(" · ")} real estate
          </p>
          <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-5xl leading-[1.05] md:text-6xl">
            Moving you to the lake — and everywhere along the shore.
          </h1>
          <p className="mt-6 max-w-lg text-white/75">
            {SITE.agentName} helps buyers and sellers navigate Lake Norman and
            Charlotte real estate with local expertise and a steady hand from
            first showing to closing day.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/listings"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-gold-soft)]"
            >
              View current listings
            </Link>
            <a
              href={`tel:${SITE.phone}`}
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      <HorizonDivider />

      {/* Featured listings */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-teal)]">
              Fresh on the market
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--color-navy)]">
              Featured listings
            </h2>
          </div>
          <Link
            href="/listings"
            className="hidden text-sm font-medium text-[var(--color-teal)] hover:underline md:block"
          >
            View all listings →
          </Link>
        </div>

        {listings.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {listings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="mt-10 rounded-2xl border border-dashed border-[var(--color-line)] p-10 text-center text-[var(--color-ink)]/60">
            Listings will appear here once the MLS sync is connected —
            see <code>/api/sync-listings</code>.
          </p>
        )}
      </section>

      <Testimonials />
    </>
  );
}
