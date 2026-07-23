import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuyerFunnel from "@/components/BuyerFunnel";
import { SITE, TRUST_LINE, getCityBySlug } from "@/lib/site-config";

// Generate all 14 city pages at build time — SEO/perf win.
export function generateStaticParams() {
  return SITE.cities.map((city) => ({ city: city.slug }));
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
    title: `New D.R. Horton Homes in ${city.name}, NC | Floor Plans & Incentives`,
    description: `See available D.R. Horton new construction homes in ${city.name}, NC. Get floor plans, pricing, builder incentives, and move-in dates by text in 60 seconds.`,
  };
}

export default async function NewHomesCityPage({
  params,
  searchParams,
}: {
  params: Promise<{ city: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const sp = await searchParams;
  const asString = (v: string | string[] | undefined): string | undefined =>
    typeof v === "string" ? v : Array.isArray(v) ? v[0] : undefined;

  // Capture UTM parameters from the ad click for CRM attribution
  const utm = {
    source: asString(sp.utm_source),
    medium: asString(sp.utm_medium),
    campaign: asString(sp.utm_campaign),
    term: asString(sp.utm_term),
  };

  return (
    <>
      {/* Slim promo bar */}
      <div className="bg-[var(--color-navy)] py-2.5 text-center text-xs text-white md:text-sm">
        <span className="font-semibold">
          Builder incentives ending soon in {city.name}
        </span>
        {" · "}
        <span className="text-white/80">
          Rate buy-downs and closing-cost credits on select move-in ready homes
        </span>
      </div>

      {/* Hero — headline localized to the city, form on the right */}
      <section className="relative overflow-hidden bg-[var(--color-navy)] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr] md:items-center md:py-20">
          <div>
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-[0.2em] text-[var(--color-carolina)]">
              {city.name}, North Carolina
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] md:text-5xl">
              Unreleased D.R. Horton inventory &amp; upcoming price drops in{" "}
              {city.name}.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/85">
              See available floor plans, pricing, and move-in dates for
              D.R. Horton communities in {city.name}, NC — texted to your phone
              in 60 seconds.
            </p>

            <ul className="mt-8 grid gap-3 text-sm text-white/90 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-[var(--color-carolina)]">
                  ✓
                </span>
                Standing inventory list
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-[var(--color-carolina)]">
                  ✓
                </span>
                Current builder incentives
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-[var(--color-carolina)]">
                  ✓
                </span>
                Upcoming phase releases
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-[var(--color-carolina)]">
                  ✓
                </span>
                Rate buy-down programs
              </li>
            </ul>

            <p className="mt-8 text-xs text-white/60">{TRUST_LINE}</p>
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

      {/* Trust strip — kept quiet so red button stays loudest */}
      <section className="border-y border-[var(--color-line)] bg-white py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 text-center md:grid-cols-4">
            <div>
              <div className="font-[family-name:var(--font-data)] text-2xl font-bold text-[var(--color-navy)]">
                60 sec
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-[var(--color-ink)]/60">
                Response time
              </div>
            </div>
            <div>
              <div className="font-[family-name:var(--font-data)] text-2xl font-bold text-[var(--color-navy)]">
                10 yr
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-[var(--color-ink)]/60">
                Builder warranty
              </div>
            </div>
            <div>
              <div className="font-[family-name:var(--font-data)] text-2xl font-bold text-[var(--color-navy)]">
                #1
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-[var(--color-ink)]/60">
                U.S. homebuilder
              </div>
            </div>
            <div>
              <div className="font-[family-name:var(--font-data)] text-2xl font-bold text-[var(--color-navy)]">
                Free
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-[var(--color-ink)]/60">
                No obligation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA to catch scrollers */}
      <section className="bg-[var(--color-mist)] py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
            Ready when you are
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
            Your {city.name} builder incentive list is one text away.
          </h2>
          <a
            href="#top"
            className="mt-6 inline-block rounded-full bg-[var(--color-drh-red)] px-8 py-4 font-[family-name:var(--font-display)] font-bold text-white shadow-lg transition-colors hover:bg-[var(--color-drh-red-hover)]"
          >
            See Available Homes in {city.name} →
          </a>
        </div>
      </section>
    </>
  );
}
