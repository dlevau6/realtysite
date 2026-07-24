import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyerFunnel from "@/components/BuyerFunnel";
import {
  ALL_CITIES,
  SITE,
  TRUST_LINE,
  cityLandmark,
  getCityBySlug,
  getMetroForCity,
} from "@/lib/site-config";
import {
  getCommunitiesForCity,
  statusLabel,
  type CommunityStatus,
} from "@/lib/communities";

export function generateStaticParams() {
  return ALL_CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: `D.R. Horton new construction homes in ${city.name}, NC`,
    description: `See available D.R. Horton communities in ${city.name}, NC — real starting prices, current status, and move-in dates. Free, no obligation, matches in 60 seconds.`,
  };
}

// Status-aware button styling. Green = selling, amber = coming soon/final,
// gray = verify.
const statusStyle: Record<
  Exclude<CommunityStatus, "sold-out">,
  { border: string; text: string; badge: string }
> = {
  selling: {
    border: "border-emerald-500",
    text: "text-emerald-700",
    badge: "bg-emerald-500 text-white",
  },
  "coming-soon": {
    border: "border-amber-500",
    text: "text-amber-700",
    badge: "bg-amber-500 text-white",
  },
  "final-homes": {
    border: "border-amber-500",
    text: "text-amber-700",
    badge: "bg-amber-500 text-white",
  },
  verify: {
    border: "border-[var(--color-line)]",
    text: "text-[var(--color-ink)]/60",
    badge: "bg-[var(--color-ink)]/10 text-[var(--color-ink)]/70",
  },
};

export default async function CityPage({
  params,
  searchParams,
}: {
  params: Promise<{ city: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const metro = getMetroForCity(city.slug);
  const communities = getCommunitiesForCity(city.slug);

  const sp = await searchParams;
  const asString = (v: string | string[] | undefined): string | undefined =>
    typeof v === "string" ? v : Array.isArray(v) ? v[0] : undefined;
  const utm = {
    source: asString(sp.utm_source),
    medium: asString(sp.utm_medium),
    campaign: asString(sp.utm_campaign),
    term: asString(sp.utm_term),
  };

  // Show sold-out communities as a quiet note, not a button.
  const activeCommunities = communities.filter((c) => c.status !== "sold-out");
  const soldOutCount = communities.filter((c) => c.status === "sold-out").length;

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--color-navy)] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr] md:items-start md:py-20">
          <div>
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-[0.2em] text-[var(--color-carolina)]">
              {metro} · {city.name}, NC
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] md:text-5xl">
              D.R. Horton new construction homes in {city.name}, NC.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/85">
              {communities.filter((c) => c.status === "selling").length > 0
                ? `${communities.filter((c) => c.status === "selling").length} communities selling now`
                : "Available floor plans, pricing, and move-in dates"}
              {cityLandmark(city.slug) ? ` — near ${cityLandmark(city.slug)}` : ""}.
            </p>
            <p className="mt-4 text-sm text-white/70">{TRUST_LINE}</p>
          </div>

          <div>
            <BuyerFunnel
              citySlug={city.slug}
              cityName={city.name}
              variant="A"
              utm={utm}
            />
          </div>
        </div>
      </section>

      {/* Community button grid — the primary conversion mechanism per
          the spec's Section 4. Buttons carry the community name plus
          the starting price so buyers self-qualify before clicking. */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
            {activeCommunities.length}{" "}
            {activeCommunities.length === 1 ? "community" : "communities"}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
            D.R. Horton communities in {city.name}
          </h2>

          {activeCommunities.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-dashed border-[var(--color-line)] p-8 text-center text-[var(--color-ink)]/60">
              No active communities in {city.name} right now.
              <br />
              Call {SITE.phone} to be notified when a new one comes online.
            </p>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeCommunities.map((c) => {
                const style =
                  c.status === "sold-out"
                    ? statusStyle["verify"]
                    : statusStyle[c.status];
                const ctaLabel =
                  c.status === "selling"
                    ? "See available homes"
                    : c.status === "coming-soon"
                      ? "Join the first-to-know list"
                      : c.status === "final-homes"
                        ? "See final homes"
                        : "Ask about availability";
                return (
                  <Link
                    key={c.slug}
                    href={`/dr-horton/${city.slug}/${c.slug}`}
                    className={`group flex flex-col rounded-2xl border-2 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${style.border}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.badge}`}
                      >
                        {statusLabel(c.status)}
                      </span>
                    </div>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-navy)]">
                      {c.name}
                    </h3>
                    {c.startingPrice ? (
                      <p className="mt-1 font-[family-name:var(--font-data)] text-sm font-bold text-[var(--color-drh-red)]">
                        {c.startingPrice}
                      </p>
                    ) : null}
                    {c.descriptor ? (
                      <p className="mt-2 text-sm text-[var(--color-ink)]/70">
                        {c.descriptor}
                      </p>
                    ) : null}
                    <p className={`mt-4 text-sm font-semibold ${style.text} transition-colors group-hover:text-[var(--color-drh-red)]`}>
                      {ctaLabel} →
                    </p>
                  </Link>
                );
              })}
            </div>
          )}

          {soldOutCount > 0 ? (
            <p className="mt-8 text-sm text-[var(--color-ink)]/60">
              {soldOutCount} recently sold-out{" "}
              {soldOutCount === 1 ? "community" : "communities"} in {city.name}.{" "}
              <a
                href={`tel:${SITE.phone}`}
                className="font-semibold text-[var(--color-drh-red)] hover:underline"
              >
                Ask about similar communities →
              </a>
            </p>
          ) : null}
        </div>
      </section>

      {/* The 1.5% listing value prop — his differentiator */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-teal-soft)] py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-teal)]">
            Have a home to sell first?
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
            {SITE.listingRatePromise.line}
          </h2>
          <Link
            href="/home-value"
            className="mt-6 inline-block rounded-full bg-[var(--color-navy)] px-8 py-3 font-[family-name:var(--font-display)] font-bold text-white transition-colors hover:bg-[var(--color-teal)]"
          >
            Get your home&rsquo;s value →
          </Link>
        </div>
      </section>
    </>
  );
}
