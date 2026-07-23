import { getSupabaseServiceClient } from "@/lib/supabase";
import type { Lead } from "@/types/database";

export interface LeadStats {
  totalToday: number;
  totalWeek: number;
  totalAllTime: number;
  buyerCount: number;
  sellerCount: number;
  completeCount: number;
  partialCount: number;
  organicSellerCount: number;
  topCities: { city_slug: string; count: number }[];
}

/** One aggregated fetch for the dashboard. Uses a single query per metric
 *  since Supabase doesn't expose SQL aggregates over PostgREST for
 *  arbitrary group-bys without an RPC — cheaper to fetch counts. */
export async function getLeadStats(): Promise<LeadStats> {
  const supabase = getSupabaseServiceClient();

  const nowIso = new Date().toISOString();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  // Batch small aggregate reads in parallel.
  const [todayRes, weekRes, allRes, buyerRes, sellerRes, completeRes, partialRes, organicRes, citiesRes] =
    await Promise.all([
      supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", startOfToday.toISOString()).lte("created_at", nowIso),
      supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", startOfWeek.toISOString()).lte("created_at", nowIso),
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("lead_type", "buyer"),
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("lead_type", "seller"),
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "complete"),
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "partial"),
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("is_organic_seller", true),
      // Pull last 500 rows for a quick client-side top-city count. At real
      // scale, swap this for a Postgres RPC returning aggregate counts.
      supabase.from("leads").select("city_slug").not("city_slug", "is", null).limit(500),
    ]);

  const cityCounts = new Map<string, number>();
  for (const row of (citiesRes.data ?? []) as { city_slug: string | null }[]) {
    if (!row.city_slug) continue;
    cityCounts.set(row.city_slug, (cityCounts.get(row.city_slug) ?? 0) + 1);
  }
  const topCities = [...cityCounts.entries()]
    .map(([city_slug, count]) => ({ city_slug, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalToday: todayRes.count ?? 0,
    totalWeek: weekRes.count ?? 0,
    totalAllTime: allRes.count ?? 0,
    buyerCount: buyerRes.count ?? 0,
    sellerCount: sellerRes.count ?? 0,
    completeCount: completeRes.count ?? 0,
    partialCount: partialRes.count ?? 0,
    organicSellerCount: organicRes.count ?? 0,
    topCities,
  };
}

/** Recent leads for the dashboard "latest" table. */
export async function getRecentLeads(limit = 10): Promise<Lead[]> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("getRecentLeads failed:", error);
    return [];
  }
  return (data ?? []) as Lead[];
}

export interface LeadFilters {
  leadType?: "buyer" | "seller";
  status?: "complete" | "partial";
  citySlug?: string;
  organicSellerOnly?: boolean;
  search?: string;
}

/** Filterable leads list for the /admin/leads page. */
export async function getFilteredLeads(
  filters: LeadFilters,
  limit = 100
): Promise<Lead[]> {
  const supabase = getSupabaseServiceClient();
  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (filters.leadType) query = query.eq("lead_type", filters.leadType);
  if (filters.status) query = query.eq("status", filters.status);
  if (filters.citySlug) query = query.eq("city_slug", filters.citySlug);
  if (filters.organicSellerOnly) query = query.eq("is_organic_seller", true);
  if (filters.search) {
    // Postgres ILIKE via `or` — cheap for lists under a few thousand rows.
    const q = `%${filters.search}%`;
    query = query.or(
      `name.ilike.${q},email.ilike.${q},phone.ilike.${q},trade_in_address.ilike.${q}`
    );
  }

  const { data, error } = await query;
  if (error) {
    console.error("getFilteredLeads failed:", error);
    return [];
  }
  return (data ?? []) as Lead[];
}
