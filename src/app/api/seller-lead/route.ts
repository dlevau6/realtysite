import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServiceClient } from "@/lib/supabase";

const sellerLeadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(30),
  smsConsent: z.literal(true),
  propertyAddress: z.string().min(5).max(300),
  propertyConditionTags: z.array(z.string().max(60)).max(15),
  alsoLookingToBuy: z.boolean(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmTerm: z.string().max(200).optional(),
  sourcePage: z.string().max(200),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = sellerLeadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;

  // Seller CRM routing tag doesn't need a city — seller leads come in
  // from organic search where the city is the property's location,
  // captured in trade_in_address. Tag them "Organic-Seller-Direct" for
  // the direct-search funnel (as opposed to buyer-funnel-caught sellers).
  const routingTag = d.alsoLookingToBuy
    ? "Organic-Seller-Direct-AlsoBuying"
    : "Organic-Seller-Direct";

  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("leads").insert({
    name: d.name,
    email: d.email,
    phone: d.phone,
    source_page: d.sourcePage,
    lead_type: "seller",
    trade_in_address: d.propertyAddress,
    property_condition_tags: d.propertyConditionTags,
    also_looking_to_buy: d.alsoLookingToBuy,
    is_organic_seller: true,
    crm_routing_tag: routingTag,
    utm_source: d.utmSource ?? null,
    utm_medium: d.utmMedium ?? null,
    utm_campaign: d.utmCampaign ?? null,
    utm_term: d.utmTerm ?? null,
    sms_consent: d.smsConsent,
    status: "complete",
  });

  if (error) {
    console.error("Seller lead insert failed:", error);
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  // TODO next: fire Structurely webhook or Homebot enrollment webhook
  //  - Homebot: sends automated monthly home-value/equity digests
  //    (Chapter 11 recommends this for seller nurture)
  return NextResponse.json({ ok: true, routingTag });
}
