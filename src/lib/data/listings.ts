import { getSupabasePublicClient } from "@/lib/supabase";
import type { Listing, Neighborhood } from "@/types/database";

export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  const supabase = getSupabasePublicClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("status", "Active")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getFeaturedListings failed:", error);
    return [];
  }
  return data ?? [];
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const supabase = getSupabasePublicClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("getListingBySlug failed:", error);
    return null;
  }
  return data;
}

export async function getAllListingSlugs(): Promise<string[]> {
  const supabase = getSupabasePublicClient();
  const { data, error } = await supabase.from("listings").select("slug");
  if (error) return [];
  return (data ?? []).map((row) => row.slug);
}

export async function getNeighborhoodBySlug(
  slug: string
): Promise<Neighborhood | null> {
  const supabase = getSupabasePublicClient();
  const { data, error } = await supabase
    .from("neighborhoods")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getAllNeighborhoods(): Promise<Neighborhood[]> {
  const supabase = getSupabasePublicClient();
  const { data, error } = await supabase.from("neighborhoods").select("*");
  if (error) return [];
  return data ?? [];
}
