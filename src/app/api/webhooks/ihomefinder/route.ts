import { NextResponse } from "next/server";
import { getSettingsMap } from "@/lib/settings";
import { getSupabaseServiceClient } from "@/lib/supabase";
import { dispatchLeadWebhooks } from "@/lib/webhooks";

/**
 * Inbound receiver for leads iHomefinder's OWN search-widget captures on
 * Eric's IDX pages (as opposed to leads from our funnels — see the push
 * side in src/lib/ihomefinder.ts). This is the "pull" half of the
 * bidirectional sync.
 *
 * PLACEHOLDER SCAFFOLD — same caveat as pushLeadToIHomefinder: iHomefinder's
 * real "Lead Forwarding" mechanism, its payload shape, and whatever
 * auth/signature scheme it uses are NOT confirmed. This route exists so
 * there's somewhere to point iHomefinder support once Eric asks them
 * "can you forward search-widget leads to a URL I control, and if so
 * what does the POST body look like?" Until that's answered, nothing
 * upstream calls this — it just sits here ready.
 *
 * Auth approach: since we don't control what headers a third-party
 * forwarder sends, this uses a shared secret as a URL query param
 * instead — give iHomefinder support this exact URL (with the secret
 * baked in) once ihomefinder_webhook_secret is set in /admin/settings:
 *   https://<your-domain>/api/webhooks/ihomefinder?secret=<the secret>
 * If their system supports a signed-header scheme instead, swap this
 * check for that once documented.
 */

const SETTINGS_KEYS = [
  "ihomefinder_sync_enabled",
  "ihomefinder_webhook_secret",
] as const;

// Loosely typed — we genuinely don't know iHomefinder's payload shape.
// Grabs whatever common field names show up rather than validating a
// strict contract that would just be a guess.
function extractField(body: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const v = body[key];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return null;
}

export async function POST(request: Request) {
  const settings = await getSettingsMap([...SETTINGS_KEYS]);

  if (settings.ihomefinder_sync_enabled !== "true") {
    return NextResponse.json({ error: "Integration not enabled" }, { status: 404 });
  }

  const configuredSecret = settings.ihomefinder_webhook_secret;
  const providedSecret = new URL(request.url).searchParams.get("secret");
  if (!configuredSecret || providedSecret !== configuredSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const b = body as Record<string, unknown>;

  // Guessed field-name aliases covering the shapes IDX vendors commonly
  // use. Log the raw payload on first real traffic and tighten this once
  // iHomefinder's actual shape is known.
  const name = extractField(b, ["name", "fullName", "full_name", "contactName"]);
  const email = extractField(b, ["email", "emailAddress", "email_address"]);
  const phone = extractField(b, ["phone", "phoneNumber", "phone_number"]);
  const externalId = extractField(b, ["contactId", "contact_id", "id", "leadId", "lead_id"]);

  if (!name || !email) {
    console.warn("[ihomefinder:webhook] payload missing name/email — dropped:", b);
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();
  const { data: inserted, error } = await supabase
    .from("leads")
    .insert({
      name,
      email,
      phone,
      source_page: "ihomefinder-idx-widget",
      lead_type: "buyer",
      status: "complete",
      lead_source: "ihomefinder_native",
      ihomefinder_contact_id: externalId,
      sms_consent: false, // TCPA consent was captured by iHomefinder's own widget, not ours — don't claim consent we didn't collect.
    })
    .select("id")
    .single();

  if (error) {
    console.error("[ihomefinder:webhook] insert failed:", error);
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  // Route native leads through the same follow-up webhooks (Structurely,
  // FUB) as site leads so Eric gets one unified follow-up pipeline
  // regardless of source.
  await dispatchLeadWebhooks({
    event: "lead.created",
    source: "buyer_form",
    name,
    email,
    phone,
    status: "complete",
    lead_type: "buyer",
    sms_consent: false,
  });

  return NextResponse.json({ ok: true, id: inserted.id });
}
