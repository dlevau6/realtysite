import type { Metadata } from "next";
import Link from "next/link";
import { getAllNeighborhoods } from "@/lib/data/listings";
import { SITE } from "@/lib/site-config";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Neighborhoods",
  description: `Local area guides for ${SITE.serviceAreas.join(", ")} from ${SITE.agentName}.`,
};

export default async function NeighborhoodsPage() {
  const neighborhoods = await getAllNeighborhoods();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-navy)]">
        Neighborhood guides
      </h1>
      <p className="mt-3 max-w-xl text-[var(--color-ink)]/70">
        Local knowledge for every corner of Lake Norman and the greater
        Charlotte area — the searches these pages target usually bring in
        more buyers than any single listing.
      </p>

      {neighborhoods.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {neighborhoods.map((n) => (
            <Link
              key={n.slug}
              href={`/neighborhoods/${n.slug}`}
              className="rounded-2xl border border-[var(--color-line)] p-6 transition-shadow hover:shadow-lg"
            >
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-navy)]">
                {n.name}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-ink)]/70">{n.summary}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-[var(--color-line)] p-10 text-center text-[var(--color-ink)]/60">
          Add rows to the <code>neighborhoods</code> table in Supabase to
          populate this page — start with the areas in{" "}
          <code>SITE.serviceAreas</code>.
        </p>
      )}
    </section>
  );
}
