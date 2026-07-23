import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getListingBySlug, getAllListingSlugs } from "@/lib/data/listings";
import { JsonLd, listingSchema } from "@/lib/schema";
import LeadForm from "@/components/LeadForm";

export const revalidate = 3600;

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export async function generateStaticParams() {
  const slugs = await getAllListingSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return {};

  const title = `${listing.address_line}, ${listing.city}, ${listing.state} | ${priceFormatter.format(listing.list_price)}`;
  return {
    title,
    description: listing.description.slice(0, 155),
    openGraph: {
      title,
      description: listing.description.slice(0, 155),
      images: listing.primary_photo_url ? [listing.primary_photo_url] : [],
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <JsonLd data={listingSchema(listing)} />

      {listing.primary_photo_url ? (
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--color-mist)]">
          <Image
            src={listing.primary_photo_url}
            alt={`${listing.address_line}, ${listing.city}, ${listing.state}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="mt-8 grid gap-10 md:grid-cols-[2fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-data)] text-2xl font-medium text-[var(--color-navy)]">
            {priceFormatter.format(listing.list_price)}
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-[var(--color-ink)]">
            {listing.address_line}
          </h1>
          <p className="text-[var(--color-ink)]/60">
            {listing.city}, {listing.state} {listing.zip}
          </p>

          <div className="mt-6 flex gap-6 border-y border-[var(--color-line)] py-4 font-[family-name:var(--font-data)] text-sm">
            <span>{listing.bedrooms} bed</span>
            <span>{listing.bathrooms} bath</span>
            <span>{listing.square_feet.toLocaleString()} sqft</span>
            {listing.year_built ? <span>Built {listing.year_built}</span> : null}
          </div>

          <p className="mt-6 whitespace-pre-line text-[var(--color-ink)]/85">
            {listing.description}
          </p>

          {/* Required IDX attribution — check against the client's MLS
              board display rules before removing or restyling. */}
          <p className="mt-8 text-xs text-[var(--color-ink)]/50">
            {listing.idx_disclaimer}
          </p>
        </div>

        <aside className="h-fit rounded-2xl border border-[var(--color-line)] p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-navy)]">
            Interested in this home?
          </h2>
          <LeadForm listingId={listing.id} sourcePage={`/listings/${listing.slug}`} />
        </aside>
      </div>
    </article>
  );
}
