import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNeighborhoodBySlug, getFeaturedListings } from "@/lib/data/listings";
import PropertyCard from "@/components/PropertyCard";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);
  if (!neighborhood) return {};

  return {
    title: `Homes for Sale in ${neighborhood.name}, ${neighborhood.state}`,
    description: neighborhood.summary,
  };
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);
  if (!neighborhood) notFound();

  const allListings = await getFeaturedListings(48);
  const localListings = allListings.filter(
    (l) => l.neighborhood_slug === neighborhood.slug
  );

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-navy)]">
        Homes for sale in {neighborhood.name}, {neighborhood.state}
      </h1>
      <p className="mt-4 max-w-2xl whitespace-pre-line text-[var(--color-ink)]/80">
        {neighborhood.body || neighborhood.summary}
      </p>

      {localListings.length > 0 ? (
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {localListings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p className="mt-12 rounded-2xl border border-dashed border-[var(--color-line)] p-10 text-center text-[var(--color-ink)]/60">
          No active listings in {neighborhood.name} right now — check back soon.
        </p>
      )}
    </article>
  );
}
