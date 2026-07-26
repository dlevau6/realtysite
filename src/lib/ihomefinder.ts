import { getSettingsMap } from "@/lib/settings";
import { getSupabaseServiceClient } from "@/lib/supabase";

/**
 * iHomefinder MAX CRM sync — PLACEHOLDER SCAFFOLD, not a working
 * integration. Read this comment before touching anything below.
 *
 * What's confirmed: iHomefinder IDX Max/MAX PRO has a real "Client API"
 * (contact/lead retrieval + add/edit) and a "Lead Forwarding API" for
 * routing their own search-widget leads to a custom destination — but
 * both are gated behind a board-approved, active iHomefinder account,
 * and the exact request/response shapes live in a knowledge base we
 * don't have access to. Eric forwarded a document naming an endpoint
 * (`https://api.ihomefinder.com/v1/leads`) that does NOT match any
 * publicly documented iHomefinder API — it's very likely inaccurate or
 * from an unrelated product. Do not trust it.
 *
 * So instead of hardcoding a guessed URL, the endpoint, API key, and a
 * master on/off switch all live in Supabase `settings` (see
 * schema-drh-v6.sql), editable from /admin/settings. Everything here is
 * a no-op until:
 *   1. Eric gets the real endpoint + auth scheme from iHomefinder support
 *      or his account rep,
 *   2. `ihomefinder_sync_enabled` is flipped to the literal string "true",
 *      and
 *   3. `ihomefinder_push_endpoint` + `ihomefinder_api_key` are filled in.
 *
 * The request body below (name/email/phone/notes) is a reasonable guess
 * at a generic "create contact" shape, not a confirmed contract. Expect
 * to rewrite `pushLeadToIHomefinder`'s body and response parsing once
 * real docs are in hand — that's expected, not a bug.
 */

interface PushableLead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  leadType: "buyer" | "seller";
  citySlug: string | null;
  crmRoutingTag: string | null;
}

const SETTINGS_KEYS = [
  "ihomefinder_sync_enabled",
  "ihomefinder_push_endpoint",
  "ihomefinder_api_key",
] as const;

/**
 * Fire-and-forget push of a site-captured lead into iHomefinder's CRM.
 * Mirrors the dispatchLeadWebhooks pattern in src/lib/webhooks.ts:
 * errors are logged, never thrown, and never block the caller's response.
 *
 * Silently returns if the integration isn't enabled/configured — safe to
 * call unconditionally from every lead-capture route.
 */
export async function pushLeadToIHomefinder(lead: PushableLead): Promise<void> {
  const settings = await getSettingsMap([...SETTINGS_KEYS]);

  if (settings.ihomefinder_sync_enabled !== "true") return;
  const endpoint = settings.ihomefinder_push_endpoint;
  const apiKey = settings.ihomefinder_api_key;
  if (!endpoint || !apiKey) {
    console.warn(
      "[ihomefinder] sync enabled but endpoint/api key missing — skipping push"
    );
    return;
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      // GUESS at the payload shape — see header comment. Adjust once
      // real API docs are available.
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        source: "LakeNormanRealtor1 website",
        notes: `${lead.leadType} lead${
          lead.citySlug ? ` — ${lead.citySlug}` : ""
        }${lead.crmRoutingTag ? ` — tag: ${lead.crmRoutingTag}` : ""}`,
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      console.warn(`[ihomefinder] push non-2xx response: ${res.status}`);
      return;
    }

    // Best-effort: if the (unconfirmed) response includes a contact ID
    // under any of these common field names, stash it. If the shape is
    // totally different once real docs arrive, this just no-ops.
    const body = await res.json().catch(() => null);
    const contactId: string | null =
      (body?.id as string) ??
      (body?.contactId as string) ??
      (body?.contact_id as string) ??
      null;

    const supabase = getSupabaseServiceClient();
    await supabase
      .from("leads")
      .update({
        synced_to_ihomefinder_at: new Date().toISOString(),
        ihomefinder_contact_id: contactId,
      })
      .eq("id", lead.id);
  } catch (err) {
    console.warn("[ihomefinder] push failed:", err);
  }
}
