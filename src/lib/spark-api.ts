/**
 * Thin client for the Spark API (Bridge Interactive), a RESO Web API
 * compliant IDX feed. Docs: https://sparkplatform.com/docs
 *
 * Auth: Spark uses an access token issued per-dataset once the MLS
 * board approves your application. Set SPARK_ACCESS_TOKEN and
 * SPARK_DATASET_ID in the environment once that's in hand.
 *
 * This client only fetches data — it never writes back to the MLS.
 */

import type { ListingStatus } from "@/types/database";

const SPARK_BASE_URL = "https://replication.sparkapi.com/v1";

interface SparkListing {
  Id: string;
  ListingId: string; // MLS number
  StandardStatus: string;
  ListPrice: number;
  UnparsedAddress: string;
  City: string;
  StateOrProvince: string;
  PostalCode: string;
  BedroomsTotal: number;
  BathroomsTotalInteger: number;
  LivingArea: number;
  LotSizeAcres: number | null;
  YearBuilt: number | null;
  PublicRemarks: string;
  Latitude: number | null;
  Longitude: number | null;
  Photos?: { Uri800: string }[];
  ListAgentFullName: string;
  ListOfficeName: string;
  // RESO/IDX display-rule fields — required attribution per MLS policy
  SourceSystemName: string;
  IdxParticipationYN: boolean;
}

interface SparkListResponse {
  D: {
    Results: SparkListing[];
    Pagination: { TotalRows: number; TotalPages: number };
  };
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

async function sparkFetch<T>(path: string, searchParams?: Record<string, string>): Promise<T> {
  const token = requireEnv("SPARK_ACCESS_TOKEN");
  const url = new URL(`${SPARK_BASE_URL}${path}`);
  if (searchParams) {
    Object.entries(searchParams).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    // Never cache MLS data at the fetch layer — the sync job controls
    // freshness explicitly and writes results to Postgres.
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Spark API error ${res.status}: ${await res.text()}`);
  }

  return res.json() as Promise<T>;
}

/**
 * Fetch active (and optionally pending/sold) listings for the agent's
 * office, paginated. IDX display rules generally require you only show
 * listings where IdxParticipationYN is true — filter is applied here
 * as a safety net in addition to the query filter.
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
  const data = await sparkFetch<SparkListResponse>("/listings", {
    _filter: `ListOfficeMlsId Eq '${officeId}' And IdxParticipationYN Eq true`,
    _page: String(page),
    _pagesize: String(pageSize),
    _expand: "Photos",
  });

  return data.D.Results.filter((listing) => listing.IdxParticipationYN);
}

/**
 * RESO's StandardStatus values don't map 1:1 onto our four display
 * statuses — collapse anything unrecognized to "Pending" rather than
 * letting it slip through untyped.
 */
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

/** Maps a Spark/RESO listing record onto our internal Listing shape. */
export function mapSparkListingToRow(listing: SparkListing) {
  return {
    mls_number: listing.ListingId,
    slug: `${listing.UnparsedAddress}-${listing.PostalCode}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    status: normalizeStatus(listing.StandardStatus),
    list_price: listing.ListPrice,
    address_line: listing.UnparsedAddress,
    city: listing.City,
    state: listing.StateOrProvince,
    zip: listing.PostalCode,
    bedrooms: listing.BedroomsTotal,
    bathrooms: listing.BathroomsTotalInteger,
    square_feet: listing.LivingArea,
    lot_size_acres: listing.LotSizeAcres,
    year_built: listing.YearBuilt,
    description: listing.PublicRemarks,
    latitude: listing.Latitude,
    longitude: listing.Longitude,
    primary_photo_url: listing.Photos?.[0]?.Uri800 ?? null,
    photo_urls: listing.Photos?.map((p) => p.Uri800) ?? [],
    listing_agent_name: listing.ListAgentFullName,
    listing_office_name: listing.ListOfficeName,
    mls_name: listing.SourceSystemName,
    idx_disclaimer: `Listing courtesy of ${listing.ListOfficeName}. Data provided by ${listing.SourceSystemName}. Information deemed reliable but not guaranteed.`,
    last_synced_at: new Date().toISOString(),
  };
}
