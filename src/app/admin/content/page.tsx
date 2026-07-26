import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site-config";
import { getAllCityContentForAdmin } from "@/lib/city-content";
import { getAllCommunities } from "@/lib/communities";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Site Content",
  robots: { index: false, follow: false },
};

export default async function AdminContentPage() {
  const [cityRows, communities] = await Promise.all([
    getAllCityContentForAdmin(),
    getAllCommunities(),
  ]);

  const communityCountByCity = new Map<string, number>();
  for (const c of communities) {
    communityCountByCity.set(c.citySlug, (communityCountByCity.get(c.citySlug) ?? 0) + 1);
  }

  // Group by metro, same order the public site uses.
  const metros = SITE.metros;

  return (
    <>
      <div className="mb-6">
        <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
          Editable content
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
          Site Content
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--color-ink)]/70">
          Pick a city to edit its intro copy, relocation highlights, and its
          D.R. Horton communities. Changes save to Supabase and show up on the
          live site within about 5 minutes — no redeploy needed.
        </p>
        <p className="mt-2 max-w-2xl text-xs text-[var(--color-ink)]/50">
          This covers marketing copy only. Legal/compliance text (the equal
          agent-and-brokerage header, TCPA consent language, MLS
          disclaimers) isn&rsquo;t editable here on purpose — that stays
          locked to protect Canopy MLS compliance.
        </p>
      </div>

      <div className="space-y-8">
        {metros.map((metro) => (
          <section key={metro.slug}>
            <h2 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wide text-[var(--color-ink)]/60">
              {metro.name}
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {metro.cities.map((city) => {
                const row = cityRows.find((r) => r.citySlug === city.slug);
                const communityCount = communityCountByCity.get(city.slug) ?? 0;
                return (
                  <Link
                    key={city.slug}
                    href={`/admin/content/${city.slug}`}
                    className="rounded-2xl border border-[var(--color-line)] bg-white p-4 transition-colors hover:border-[var(--color-drh-red)]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-[family-name:var(--font-display)] font-bold text-[var(--color-navy)]">
                        {city.name}
                      </h3>
                      {row?.isCustomized ? (
                        <span className="whitespace-nowrap rounded-full bg-[var(--color-carolina-soft)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-navy)]">
                          Customized
                        </span>
                      ) : (
                        <span className="whitespace-nowrap rounded-full bg-[var(--color-mist)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-ink)]/50">
                          Default copy
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-[var(--color-ink)]/60">
                      {communityCount} {communityCount === 1 ? "community" : "communities"}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
