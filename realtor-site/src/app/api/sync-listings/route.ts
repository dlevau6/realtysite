import { NextResponse } from "next/server";
import { fetchListings, mapSparkListingToRow } from "@/lib/spark-api";
import { getSupabaseServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Pulls the agent's active IDX listings from Spark and upserts them into
 * Supabase. Wire this up to a Vercel Cron job (see vercel.json) so listing
 * pages stay fresh via ISR without hitting the MLS API on every request.
 *
 * Protect this route with CRON_SECRET so it can't be triggered publicly.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const officeId = process.env.SPARK_OFFICE_ID;
  if (!officeId) {
    return NextResponse.json(
      { error: "SPARK_OFFICE_ID is not configured" },
      { status: 500 }
    );
  }

  try {
    const listings = await fetchListings({ officeId });
    const rows = listings.map(mapSparkListingToRow);

    const supabase = getSupabaseServiceClient();
    const { error } = await supabase
      .from("listings")
      .upsert(rows, { onConflict: "mls_number" });

    if (error) throw error;

    return NextResponse.json({
      synced: rows.length,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Listing sync failed:", err);
    return NextResponse.json(
      { error: "Sync failed", detail: String(err) },
      { status: 500 }
    );
  }
}
