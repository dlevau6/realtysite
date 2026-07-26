import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCityBySlug } from "@/lib/site-config";
import { getCityContent } from "@/lib/city-content";
import { getCommunitiesForCity } from "@/lib/communities";
import CityContentForm from "./CityContentForm";
import CommunityManager from "./CommunityManager";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}): Promise<Metadata> {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);
  return {
    title: city ? `Edit ${city.name}` : "Edit City",
    robots: { index: false, follow: false },
  };
}

export default async function AdminCityContentPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const [content, communities] = await Promise.all([
    getCityContent(citySlug),
    getCommunitiesForCity(citySlug),
  ]);

  // Every known city has at least the static default, so this should
  // never actually be null — but guard anyway rather than crash the page.
  if (!content) notFound();

  return (
    <>
      <div className="mb-6">
        <Link
          href="/admin/content"
          className="text-xs font-semibold text-[var(--color-ink)]/60 hover:text-[var(--color-navy)]"
        >
          ← All cities
        </Link>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
          {city.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--color-ink)]/70">
          This is exactly what renders on{" "}
          <a
            href={`/dr-horton/${city.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            /dr-horton/{city.slug}
          </a>
          .
        </p>
      </div>

      <div className="space-y-8">
        <CityContentForm citySlug={city.slug} initial={content} />
        <CommunityManager citySlug={city.slug} initial={communities} />
      </div>
    </>
  );
}
