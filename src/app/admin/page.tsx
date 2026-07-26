import type { Metadata } from "next";
import Link from "next/link";
import { getLeadStats, getRecentLeads } from "@/lib/data/leads";
import { getCityBySlug } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

function fmtDate(iso: string): string {
  const d = new Date(iso);
  const now = Date.now();
  const diffMin = Math.round((now - d.getTime()) / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffMin < 60 * 24) return `${Math.round(diffMin / 60)}h ago`;
  return d.toLocaleDateString();
}

export default async function AdminDashboardPage() {
  const [stats, recent] = await Promise.all([getLeadStats(), getRecentLeads(8)]);

  const cards = [
    { label: "Today", value: stats.totalToday },
    { label: "This week", value: stats.totalWeek },
    { label: "All time", value: stats.totalAllTime },
    { label: "Buyer / Seller", value: `${stats.buyerCount} / ${stats.sellerCount}` },
    { label: "Complete / Partial", value: `${stats.completeCount} / ${stats.partialCount}` },
    { label: "Organic sellers", value: stats.organicSellerCount },
  ];

  return (
    <>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
            Overview
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
            Lead activity
          </h1>
        </div>
        <Link
          href="/admin/leads"
          className="text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-drh-red)]"
        >
          See all leads →
        </Link>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-[var(--color-line)] bg-white p-6"
          >
            <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-ink)]/60">
              {card.label}
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Top cities + recent leads side by side on desktop */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
            Top cities
          </h2>
          {stats.topCities.length === 0 ? (
            <p className="mt-4 text-sm text-[var(--color-ink)]/60">
              No leads yet.
            </p>
          ) : (
            <ol className="mt-4 space-y-2">
              {stats.topCities.map((row) => {
                const city = getCityBySlug(row.city_slug);
                return (
                  <li
                    key={row.city_slug}
                    className="flex items-center justify-between border-b border-[var(--color-line)] py-2 text-sm last:border-b-0"
                  >
                    <span className="font-medium text-[var(--color-navy)]">
                      {city?.name ?? row.city_slug}
                    </span>
                    <span className="font-[family-name:var(--font-data)] text-[var(--color-ink)]/70">
                      {row.count}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
            Recent leads
          </h2>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-[var(--color-ink)]/60">
              Nothing yet — the first lead will appear here.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-widest text-[var(--color-ink)]/60">
                    <th className="pb-2 pr-4 font-semibold">When</th>
                    <th className="pb-2 pr-4 font-semibold">Type</th>
                    <th className="pb-2 pr-4 font-semibold">Name</th>
                    <th className="pb-2 pr-4 font-semibold">City</th>
                    <th className="pb-2 font-semibold">Tag</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-t border-[var(--color-line)]"
                    >
                      <td className="py-2 pr-4 text-[var(--color-ink)]/70">
                        {fmtDate(lead.created_at)}
                      </td>
                      <td className="py-2 pr-4">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                            lead.lead_type === "seller"
                              ? "bg-[var(--color-carolina-soft)] text-[var(--color-navy)]"
                              : "bg-[var(--color-drh-red)]/10 text-[var(--color-drh-red)]"
                          }`}
                        >
                          {lead.lead_type}
                        </span>
                      </td>
                      <td className="py-2 pr-4 font-medium text-[var(--color-navy)]">
                        {lead.name}
                      </td>
                      <td className="py-2 pr-4 text-[var(--color-ink)]/70">
                        {lead.city_slug
                          ? getCityBySlug(lead.city_slug)?.name ??
                            lead.city_slug
                          : "—"}
                      </td>
                      <td className="py-2 font-[family-name:var(--font-data)] text-xs text-[var(--color-ink)]/60">
                        {lead.crm_routing_tag ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
