import type { Metadata } from "next";
import Link from "next/link";
import { getFilteredLeads } from "@/lib/data/leads";
import { ALL_CITIES, getCityBySlug } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

function fmt(iso: string): string {
  return new Date(iso).toLocaleString();
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const asStr = (v: string | string[] | undefined) =>
    typeof v === "string" ? v : Array.isArray(v) ? v[0] : undefined;

  const leadType = asStr(sp.type);
  const status = asStr(sp.status);
  const citySlug = asStr(sp.city);
  const organicOnly = asStr(sp.organic) === "1";
  const search = asStr(sp.q);

  const leads = await getFilteredLeads({
    leadType: leadType === "buyer" || leadType === "seller" ? leadType : undefined,
    status: status === "complete" || status === "partial" ? status : undefined,
    citySlug,
    organicSellerOnly: organicOnly,
    search,
  });

  // Build filter chip URLs by mutating the current searchParams
  const chip = (params: Record<string, string | undefined>) => {
    const usp = new URLSearchParams();
    for (const [k, v] of Object.entries({
      type: leadType,
      status,
      city: citySlug,
      organic: organicOnly ? "1" : undefined,
      q: search,
      ...params,
    })) {
      if (v) usp.set(k, v);
    }
    const q = usp.toString();
    return `/admin/leads${q ? `?${q}` : ""}`;
  };

  return (
    <>
      <div className="mb-6">
        <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
          {leads.length} {leads.length === 1 ? "result" : "results"}
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
          Leads
        </h1>
      </div>

      {/* Filter bar */}
      <form
        method="get"
        className="mb-6 rounded-2xl border border-[var(--color-line)] bg-white p-4"
      >
        <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <input
            type="search"
            name="q"
            defaultValue={search ?? ""}
            placeholder="Search name, email, phone, address…"
            className="rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
          />
          <select
            name="type"
            defaultValue={leadType ?? ""}
            className="rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
          >
            <option value="">All types</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          <select
            name="status"
            defaultValue={status ?? ""}
            className="rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
          >
            <option value="">Any status</option>
            <option value="complete">Complete</option>
            <option value="partial">Partial</option>
          </select>
          <select
            name="city"
            defaultValue={citySlug ?? ""}
            className="rounded-lg border border-[var(--color-line)] px-3 py-2 text-sm"
          >
            <option value="">All cities</option>
            {ALL_CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="organic"
              value="1"
              defaultChecked={organicOnly}
              className="accent-[var(--color-drh-red)]"
            />
            Organic sellers only
          </label>
          <button
            type="submit"
            className="rounded-full bg-[var(--color-navy)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--color-drh-red)]"
          >
            Apply
          </button>
          <Link
            href="/admin/leads"
            className="text-xs font-semibold text-[var(--color-ink)]/60 hover:text-[var(--color-navy)]"
          >
            Reset
          </Link>
        </div>
      </form>

      {/* Quick filter chips */}
      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        <Link
          href={chip({ organic: organicOnly ? undefined : "1" })}
          className={`rounded-full border px-3 py-1 font-semibold ${
            organicOnly
              ? "border-[var(--color-drh-red)] bg-[var(--color-drh-red)] text-white"
              : "border-[var(--color-line)] bg-white text-[var(--color-navy)]"
          }`}
        >
          Organic sellers
        </Link>
        <Link
          href={chip({ status: status === "partial" ? undefined : "partial" })}
          className={`rounded-full border px-3 py-1 font-semibold ${
            status === "partial"
              ? "border-[var(--color-drh-red)] bg-[var(--color-drh-red)] text-white"
              : "border-[var(--color-line)] bg-white text-[var(--color-navy)]"
          }`}
        >
          Partial captures
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-[var(--color-line)] bg-[var(--color-mist)]">
            <tr className="text-left text-xs uppercase tracking-widest text-[var(--color-ink)]/60">
              <th className="p-3 font-semibold">When</th>
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Contact</th>
              <th className="p-3 font-semibold">City / Address</th>
              <th className="p-3 font-semibold">Details</th>
              <th className="p-3 font-semibold">Routing tag</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-sm text-[var(--color-ink)]/60"
                >
                  No leads match these filters.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t border-[var(--color-line)] align-top"
                >
                  <td className="p-3 text-xs text-[var(--color-ink)]/70">
                    {fmt(lead.created_at)}
                    {lead.status === "partial" ? (
                      <div className="mt-1 inline-block rounded bg-[var(--color-drh-red)]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[var(--color-drh-red)]">
                        PARTIAL
                      </div>
                    ) : null}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                        lead.lead_type === "seller"
                          ? "bg-[var(--color-carolina-soft)] text-[var(--color-navy)]"
                          : "bg-[var(--color-drh-red)]/10 text-[var(--color-drh-red)]"
                      }`}
                    >
                      {lead.lead_type}
                    </span>
                    {lead.variant ? (
                      <div className="mt-1 font-[family-name:var(--font-data)] text-[10px] text-[var(--color-ink)]/60">
                        var {lead.variant}
                      </div>
                    ) : null}
                  </td>
                  <td className="p-3 font-medium text-[var(--color-navy)]">
                    {lead.name}
                  </td>
                  <td className="p-3 text-xs text-[var(--color-ink)]/80">
                    <div>{lead.email}</div>
                    {lead.phone ? <div>{lead.phone}</div> : null}
                  </td>
                  <td className="p-3 text-xs text-[var(--color-ink)]/80">
                    <div className="font-semibold text-[var(--color-navy)]">
                      {lead.city_slug
                        ? getCityBySlug(lead.city_slug)?.name ?? lead.city_slug
                        : "—"}
                    </div>
                    {lead.trade_in_address ? (
                      <div className="mt-1 max-w-[220px] truncate">
                        {lead.trade_in_address}
                      </div>
                    ) : null}
                  </td>
                  <td className="p-3 text-xs text-[var(--color-ink)]/80">
                    {lead.budget ? <div>Budget: {lead.budget}</div> : null}
                    {lead.timeline ? <div>Timeline: {lead.timeline}</div> : null}
                    {lead.home_contingency ? (
                      <div>Contingency: {lead.home_contingency}</div>
                    ) : null}
                    {lead.property_condition_tags &&
                    lead.property_condition_tags.length > 0 ? (
                      <div>
                        Condition: {lead.property_condition_tags.join(", ")}
                      </div>
                    ) : null}
                    {lead.also_looking_to_buy ? (
                      <div className="font-semibold text-[var(--color-drh-red)]">
                        Also buying
                      </div>
                    ) : null}
                  </td>
                  <td className="p-3 font-[family-name:var(--font-data)] text-xs text-[var(--color-ink)]/60">
                    {lead.crm_routing_tag ?? "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-[var(--color-ink)]/50">
        Showing up to 100 most-recent results. Use filters to narrow down.
      </p>
    </>
  );
}
