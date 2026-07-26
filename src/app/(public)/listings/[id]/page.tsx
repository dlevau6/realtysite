import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyerFunnel from "@/components/BuyerFunnel";
import StickyCallButton from "@/components/StickyCallButton";
import { fetchListingById } from "@/lib/spark-api";
import { SITE, TRUST_LINE } from "@/lib/site-config";

// Detail pages are dynamic — we don't know the full listing catalog at
// build time. Rendered on request, cached at the fetch layer for 5 min.
export const dynamic = "force-dynamic";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = await fetchListingById(id);
  if (!listing) return { title: "Listing not found" };
  const f = listing.StandardFields;
  const addr = f.UnparsedAddress ?? "Listing";
  return {
    title: `${addr} — ${f.City ?? ""}${f.StateOrProvince ? ", " + f.StateOrProvince : ""}`,
    description:
      f.PublicRemarks?.slice(0, 155) ??
      `New listing at ${addr}. See details, photos, and contact Eric Fisher of ${SITE.brandName}.`,
    robots: { index: false, follow: false }, // MLS IDX rules typically forbid indexing
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await fetchListingById(id);
  if (!listing) notFound();

  const f = listing.StandardFields;
  const price = f.ListPrice ?? 0;
  const bathsFull = f.BathsFull ?? 0;
  const bathsHalf = f.BathsHalf ?? 0;
  const totalBathsLabel =
    bathsHalf > 0
      ? `${bathsFull}.${bathsHalf === 1 ? "5" : bathsHalf}`
      : String(bathsFull);
  const photos = f.Photos ?? [];
  const primaryPhoto = photos[0]?.Uri1600 ?? photos[0]?.Uri800;
  const isDemo = !process.env.SPARK_OFFICE_ID;

  return (
    <>
      <StickyCallButton />

      {/* Breadcrumb strip */}
      <div className="border-b border-[var(--color-line)] bg-white py-3">
        <div className="mx-auto max-w-6xl px-6 text-xs text-[var(--color-ink)]/60">
          <Link href="/" className="hover:text-[var(--color-navy)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-navy)]">Listing</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[var(--color-navy)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
          {isDemo ? (
            <p className="mb-4 inline-block rounded-full bg-[var(--color-drh-red)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
              IDX Preview · Sample data
            </p>
          ) : null}
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight md:text-4xl">
            {f.UnparsedAddress ?? "Listing details"}
          </h1>
          <p className="mt-2 text-lg text-white/85">
            {[f.City, f.StateOrProvince, f.PostalCode]
              .filter(Boolean)
              .join(", ")}
          </p>
          <div className="mt-6 flex flex-wrap items-baseline gap-6">
            <div className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--color-carolina)]">
              {money(price)}
            </div>
            <div className="flex gap-5 text-sm text-white/85 font-[family-name:var(--font-data)]">
              {typeof f.BedsTotal === "number" ? (
                <span>
                  <strong className="text-white">{f.BedsTotal}</strong> bd
                </span>
              ) : null}
              {bathsFull > 0 ? (
                <span>
                  <strong className="text-white">{totalBathsLabel}</strong> ba
                </span>
              ) : null}
              {typeof f.BuildingAreaTotal === "number" &&
              f.BuildingAreaTotal > 0 ? (
                <span>
                  <strong className="text-white">
                    {f.BuildingAreaTotal.toLocaleString()}
                  </strong>{" "}
                  sqft
                </span>
              ) : null}
              {f.YearBuilt ? (
                <span>
                  Built{" "}
                  <strong className="text-white">{f.YearBuilt}</strong>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Body: photos + details on left, buyer funnel on right */}
      <section className="bg-[var(--color-mist)] py-10 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            {/* Primary photo or fallback */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--color-line)] shadow-sm">
              {primaryPhoto ? (
                <Image
                  src={primaryPhoto}
                  alt={f.UnparsedAddress ?? "Listing photo"}
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-6xl text-[var(--color-ink)]/20">
                  🏠
                </div>
              )}
            </div>

            {/* Thumbnail strip if there are additional photos */}
            {photos.length > 1 ? (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {photos.slice(1, 6).map((p, i) => {
                  const src = p.Uri800 ?? p.Uri1600;
                  if (!src) return null;
                  return (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-lg bg-[var(--color-line)]"
                    >
                      <Image
                        src={src}
                        alt={`Photo ${i + 2}`}
                        fill
                        sizes="20vw"
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            ) : null}

            {/* Description */}
            {f.PublicRemarks ? (
              <div className="mt-8 rounded-2xl border border-[var(--color-line)] bg-white p-6">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                  About this home
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[var(--color-ink)]/85">
                  {f.PublicRemarks}
                </p>
              </div>
            ) : null}

            {/* Quick facts grid */}
            <div className="mt-6 grid gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-6 sm:grid-cols-2">
              <Fact label="MLS #" value={f.ListingId ?? listing.Id} />
              <Fact label="Status" value={f.StandardStatus ?? "—"} />
              <Fact
                label="Bedrooms"
                value={f.BedsTotal != null ? String(f.BedsTotal) : "—"}
              />
              <Fact
                label="Bathrooms"
                value={bathsFull > 0 ? totalBathsLabel : "—"}
              />
              <Fact
                label="Building area"
                value={
                  f.BuildingAreaTotal
                    ? `${f.BuildingAreaTotal.toLocaleString()} sqft`
                    : "—"
                }
              />
              <Fact
                label="Year built"
                value={f.YearBuilt ? String(f.YearBuilt) : "—"}
              />
            </div>

            <p className="mt-6 text-[10px] leading-relaxed text-[var(--color-ink)]/50">
              {f.ListOfficeName
                ? `Listing courtesy of ${f.ListOfficeName}. `
                : ""}
              Information deemed reliable but not guaranteed. Listings are
              subject to change without notice.
              {isDemo
                ? " Sample data shown — this is the Spark API demo dataset."
                : ""}
            </p>
          </div>

          {/* Contact side */}
          <div>
            <div className="rounded-2xl bg-[var(--color-navy)] p-6 text-white">
              <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-carolina)]">
                Interested in this home?
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold">
                Get details from {SITE.agentName.split(" ")[0]}
              </h3>
              <p className="mt-2 text-sm text-white/80">
                Availability, showing times, and price — texted to you in 60 seconds.
              </p>
              <p className="mt-4 text-xs text-white/60">{TRUST_LINE}</p>
            </div>
            <div className="mt-4">
              <BuyerFunnel
                citySlug={(f.City ?? "").toLowerCase().replace(/\s+/g, "-") || "charlotte"}
                cityName={f.UnparsedAddress ?? "this home"}
                variant="A"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink)]/60">
        {label}
      </div>
      <div className="mt-0.5 font-[family-name:var(--font-data)] text-sm font-semibold text-[var(--color-navy)]">
        {value}
      </div>
    </div>
  );
}
