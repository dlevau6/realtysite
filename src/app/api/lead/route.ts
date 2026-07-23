import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServiceClient } from "@/lib/supabase";
import { buildRoutingTag } from "@/lib/site-config";

const leadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(30),
  smsConsent: z.literal(true), // TCPA — must be explicitly true
  citySlug: z.string().max(60),
  variant: z.enum(["A", "B", "C"]),
  budget: z.string().max(40).optional(),
  homeContingency: z.string().max(40).optional(),
  tradeInAddress: z.string().max(300).optional(),
  timeline: z.string().max(40).optional(),
  moveInReady: z.boolean().optional(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmTerm: z.string().max(200).optional(),
  sourcePage: z.string().max(200),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;

  // Route to seller CRM if the buyer flagged an existing home to sell
  // OR typed a trade-in address in Step 2 (variants B & C).
  const isOrganicSeller =
    d.homeContingency === "yes-need-sell" ||
    d.homeContingency === "owns-no-need" ||
    Boolean(d.tradeInAddress && d.tradeInAddress.length > 5);

  const routingTag = buildRoutingTag(d.citySlug, isOrganicSeller);

  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("leads").insert({
    name: d.name,
    email: d.email,
    phone: d.phone,
    source_page: d.sourcePage,
    city_slug: d.citySlug,
    variant: d.variant,
    is_organic_seller: isOrganicSeller,
    home_contingency: d.homeContingency ?? null,
    trade_in_address: d.tradeInAddress ?? null,
    budget: d.budget ?? null,
    timeline: d.timeline ?? null,
    move_in_ready: d.moveInReady ?? null,
    crm_routing_tag: routingTag,
    utm_source: d.utmSource ?? null,
    utm_medium: d.utmMedium ?? null,
    utm_campaign: d.utmCampaign ?? null,
    utm_term: d.utmTerm ?? null,
    sms_consent: d.smsConsent,
    status: "complete",
  });

  if (error) {
    console.error("Lead insert failed:", error);
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  // TODO wiring points for the next turn:
  //  - Fire Structurely webhook (kick off 60-second SMS auto-reply)
  //  - Forward to Follow Up Boss (or Google Sheet / Airtable interim)
  //  - Emit a server-side Google Ads conversion event (better than
  //    relying on the /thank-you-buyer client-side pixel alone)
  return NextResponse.json({ ok: true, routingTag });
}
