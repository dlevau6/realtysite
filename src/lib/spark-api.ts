/**
 * Thin client for the Spark API (Bridge Interactive), a RESO-compliant
 * IDX feed. Docs: https://sparkplatform.com/docs
 *
 * The Spark v1 response nests each listing's data under a `StandardFields`
 * object plus a top-level `Id`. Every field access below unwraps to
 * `StandardFields.<name>`.
 *
 * Auth: Bearer token set via SPARK_ACCESS_TOKEN. During development,
 * Spark provides a demo token that returns example (non-NC, non-Eric)
 * data — the site handles this gracefully and surfaces the "demo" state
 * to the user via a disclaimer.
 */

import type { ListingStatus } from "@/types/database";

const SPARK_BASE_URL = "https://replication.sparkapi.com/v1";

/** Fields we actually consume — a narrow slice of the full RESO schema. */
export interface SparkStandardFields {
  ListingId?: string;
  ListingKey?: string;
  StandardStatus?: string;
  MlsStatus?: string;
  ListPrice?: number;
  UnparsedAddress?: string;
  City?: string;
  StateOrProvince?: string;
  PostalCode?: string;
  BedsTotal?: number;
  BathsFull?: number;
  BathsHalf?: number;
  BuildingAreaTotal?: number;
  YearBuilt?: number;
  PublicRemarks?: string | null;
  ListAgentName?: string;
  ListOfficeName?: string;
  ListOfficeMlsId?: string;
  MlsId?: string;
  Photos?: { Uri800?: string; Uri1600?: string }[];
}

export interface SparkListing {
  Id: string;
  ResourceUri?: string;
  StandardFields: SparkStandardFields;
}

interface SparkListResponse {
  D?: {
    Success?: boolean;
    Results?: SparkListing[];
  };
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

/**
 * Fetch a small batch of active listings without an office filter — used
 * to power the "Featured listings" strip on the homepage. Works with the
 * demo access token during development (which returns non-NC example data).
 *
 * Returns an empty array on ANY failure so the calling component can
 * render nothing gracefully instead of crashing.
 */
export async function fetchFeaturedListings({
  pageSize = 12,
}: { pageSize?: number } = {}): Promise<SparkListing[]> {
  const token = process.env.SPARK_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const url = new URL(`${SPARK_BASE_URL}/listings`);
    url.searchParams.set("_filter", "StandardStatus Eq 'Active'");
    url.searchParams.set("_pagesize", String(pageSize));
    url.searchParams.set("_expand", "Photos");

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      console.warn(`Spark demo fetch: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = (await res.json()) as SparkListResponse;
    return data.D?.Results ?? [];
  } catch (err) {
    console.warn("Spark demo fetch failed:", err);
    return [];
  }
}

/**
 * Office-scoped fetch — used once Eric's MLS approval lands and we have
 * a real SPARK_OFFICE_ID. Applies the IDX participation filter that MLS
 * display rules require.
 */
export async function fetchListings({
  officeId,
  page = 1,
  pageSize = 50,
}: {
  officeId: string;
  page?: number;
  pageSize?: number;
}): Promise<SparkListing[]> {
  const token = requireEnv("SPARK_ACCESS_TOKEN");
  const url = new URL(`${SPARK_BASE_URL}/listings`);
  url.searchParams.set(
    "_filter",
    `ListOfficeMlsId Eq '${officeId}' And IdxParticipationYN Eq true`
  );
  url.searchParams.set("_page", String(page));
  url.searchParams.set("_pagesize", String(pageSize));
  url.searchParams.set("_expand", "Photos");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Spark API error ${res.status}: ${await res.text()}`);
  }

  const data = (await res.json()) as SparkListResponse;
  return data.D?.Results ?? [];
}

function normalizeStatus(standardStatus: string): ListingStatus {
  switch (standardStatus) {
    case "Active":
      return "Active";
    case "Closed":
      return "Sold";
    case "Coming Soon":
      return "Coming Soon";
    default:
      return "Pending";
  }
}

/** Maps a Spark listing record onto our internal Listing shape. */
export function mapSparkListingToRow(listing: SparkListing) {
  const f = listing.StandardFields;
  const bathsFull = f.BathsFull ?? 0;
  const bathsHalf = f.BathsHalf ?? 0;
  return {
    mls_number: f.ListingId ?? listing.Id,
    slug: `${f.UnparsedAddress ?? listing.Id}-${f.PostalCode ?? ""}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    status: normalizeStatus(f.StandardStatus ?? ""),
    list_price: f.ListPrice ?? 0,
    address_line: f.UnparsedAddress ?? "",
    city: f.City ?? "",
    state: f.StateOrProvince ?? "",
    zip: f.PostalCode ?? "",
    bedrooms: f.BedsTotal ?? 0,
    bathrooms: bathsFull + bathsHalf * 0.5,
    square_feet: f.BuildingAreaTotal ?? 0,
    year_built: f.YearBuilt ?? null,
    description: f.PublicRemarks ?? "",
    primary_photo_url: f.Photos?.[0]?.Uri800 ?? null,
    photo_urls: f.Photos?.map((p) => p.Uri800 ?? "").filter(Boolean) ?? [],
    listing_agent_name: f.ListAgentName ?? "",
    listing_office_name: f.ListOfficeName ?? "",
    mls_name: f.MlsId ?? "",
    idx_disclaimer: `Listing courtesy of ${f.ListOfficeName ?? "the listing office"}. Information deemed reliable but not guaranteed.`,
    last_synced_at: new Date().toISOString(),
  };
}
