import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyerFunnel from "@/components/BuyerFunnel";
import {
  SITE,
  TRUST_LINE,
  getCityBySlug,
  getMetroForCity,
} from "@/lib/site-config";
import {
  COMMUNITIES,
  getCommunityBySlug,
  statusLabel,
} from "@/lib/communities";

export function generateStaticParams() {
  return COMMUNITIES.filter((c) => c.status !== "sold-out").map((c) => ({
    city: c.citySlug,
    community: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; community: string }>;
}): Promise<Metadata> {
  const { city: citySlug, community: communitySlug } = await params;
  const community = getCommunityBySlug(citySlug, communitySlug);
  const city = getCityBySlug(citySlug);
  if (!community || !city) return {};
  return {
    title: `${community.name} — D.R. Horton homes in ${city.name}, NC`,
    description: `${community.name} in ${city.name}, NC${
      community.startingPrice ? ` — ${community.startingPrice}` : ""
    }. ${community.descriptor ?? ""} See floor plans, pricing, and move-in dates.`,
  };
}

export default async function CommunityDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ city: string; community: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { city: citySlug, community: communitySlug } = await params;
  const community = getCommunityBySlug(citySlug, communitySlug);
  const city = getCityBySlug(citySlug);
  if (!community || !city || community.status === "sold-out") notFound();

  const metro = getMetroForCity(city.slug);
  const sp = await searchParams;
  const asString = (v: string | string[] | undefined): string | undefined =>
    typeof v === "string" ? v : Array.isArray(v) ? v[0] : undefined;
  const utm = {
    source: asString(sp.utm_source),
    medium: asString(sp.utm_medium),
    campaign: asString(sp.utm_campaign),
    term: asString(sp.utm_term),
  };

  // CTA copy adapts to community status.
  const ctaHeadline =
    community.status === "coming-soon"
      ? `Get first access to ${community.name}`
      : community.status === "final-homes"
        ? `Grab one of the final homes at ${community.name}`
        : community.status === "verify"
          ? `Ask about ${community.name}`
          : `See available homes at ${community.name}`;

  return (
    <>
      {/* Breadcrumb strip */}
      <div className="border-b border-[var(--color-line)] bg-white py-3">
        <div className="mx-auto max-w-6xl px-6 text-xs text-[var(--color-ink)]/60">
          <Link href="/" className="hover:text-[var(--color-navy)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/dr-horton/${city.slug}`}
            className="hover:text-[var(--color-navy)]"
          >
            {city.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-navy)]">{community.name}</span>
        </div>
      </div>

      <section className="relative overflow-hidden bg-[var(--color-navy)] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr] md:items-start md:py-20">
          <div>
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-[0.2em] text-[var(--color-carolina)]">
              {metro} · {city.name}, NC · {statusLabel(community.status)}
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] md:text-5xl">
              {community.name}
            </h1>
            {community.startingPrice ? (
              <p className="mt-3 font-[family-name:var(--font-data)] text-2xl font-bold text-[var(--color-drh-red)]">
                {community.startingPrice}
              </p>
            ) : null}
            {community.descriptor ? (
              <p className="mt-4 max-w-lg text-lg text-white/85">
                {community.descriptor}.
              </p>
            ) : null}

            {/* TODO: replace with genuine ~200 word unique writeup per
                Section 8 of the spec. Templated content risks a Google
                thin-content penalty. */}
            <p className="mt-6 text-white/70">
              Get the current list of available homes, floor plans, and standing
              builder incentives for {community.name} — texted to your phone in
              60 seconds. No obligation.
            </p>

            <p className="mt-6 text-sm text-white/70">{TRUST_LINE}</p>
          </div>

          <div>
            <BuyerFunnel
              citySlug={city.slug}
              cityName={`${community.name} · ${city.name}`}
              variant="A"
              utm={utm}
            />
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="bg-[var(--color-mist)] py-14 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-navy)]">
            {ctaHeadline}
          </h2>
          <a
            href="#top"
            className="mt-6 inline-block rounded-full bg-[var(--color-drh-red)] px-8 py-3 font-[family-name:var(--font-display)] font-bold text-white shadow-lg transition-colors hover:bg-[var(--color-drh-red-hover)]"
          >
            Unlock the list →
          </a>
          <p className="mt-4 text-xs text-[var(--color-ink)]/60">
            Or call {SITE.phone} — Eric answers.
          </p>
        </div>
      </section>
    </>
  );
}
