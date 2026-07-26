import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServiceClient } from "@/lib/supabase";
import { buildRoutingTag } from "@/lib/site-config";

/**
 * Fires when a user completes Step 2 (which for variants B and C includes
 * a trade-in address) but hasn't yet completed Step 3. This is the
 * "organic seller trap" — even without contact info, we retain the
 * trade-in address for later outreach or comp analysis.
 *
 * Duplicate partial captures for the same session are avoided client-side
 * by only calling this endpoint once per session after Step 2 completion.
 */
const partialSchema = z.object({
  citySlug: z.string().max(60),
  variant: z.enum(["A", "B", "C"]),
  budget: z.string().max(40).optional(),
  homeContingency: z.string().max(40).optional(),
  tradeInAddress: z.string().max(300).optional(),
  timeline: z.string().max(40).optional(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmTerm: z.string().max(200).optional(),
  sourcePage: z.string().max(200),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = partialSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission" },
      { status: 400 }
    );
  }

  const d = parsed.data;

  // Only worth persisting if we captured meaningful seller signal.
  const hasSellerSignal =
    d.homeContingency === "yes-need-sell" ||
    d.homeContingency === "owns-no-need" ||
    Boolean(d.tradeInAddress && d.tradeInAddress.length > 5);

  if (!hasSellerSignal) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const routingTag = buildRoutingTag(d.citySlug, true);

  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("leads").insert({
    name: "(partial capture)",
    email: `partial+${crypto.randomUUID()}@drhortonnchomes.local`,
    source_page: d.sourcePage,
    city_slug: d.citySlug,
    variant: d.variant,
    is_organic_seller: true,
    home_contingency: d.homeContingency ?? null,
    trade_in_address: d.tradeInAddress ?? null,
    budget: d.budget ?? null,
    timeline: d.timeline ?? null,
    crm_routing_tag: routingTag,
    utm_source: d.utmSource ?? null,
    utm_medium: d.utmMedium ?? null,
    utm_campaign: d.utmCampaign ?? null,
    utm_term: d.utmTerm ?? null,
    sms_consent: false,
    status: "partial",
  });

  if (error) {
    console.error("Partial lead insert failed:", error);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, routingTag });
}
