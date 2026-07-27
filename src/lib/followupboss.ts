import { getSettingsMap } from "@/lib/settings";

/**
 * Follow Up Boss CRM push — a REAL, confirmed integration, unlike the
 * iHomefinder scaffold in src/lib/ihomefinder.ts. FUB publishes their API
 * publicly: https://docs.followupboss.com/reference/events-post
 *
 * Confirmed contract:
 *   - POST https://api.followupboss.com/v1/events
 *   - Auth: HTTP Basic, "Basic " + base64(apiKey + ":") — the API key is
 *     generated in FUB under Admin > API, no separate account approval
 *     needed for this endpoint.
 *   - Body: { source, system, type, message, person: { firstName,
 *     lastName, emails: [{value}], phones: [{value}] } }
 *   - `type` MUST be one of: "Registration", "Seller Inquiry",
 *     "Property Inquiry", "General Inquiry", "Visited Open House" — any
 *     other value is accepted but will NOT trigger FUB's Action Plans
 *     automations (per their docs), so don't invent new type strings.
 *
 * This deliberately does NOT reuse the generic dispatchLeadWebhooks()
 * pattern in src/lib/webhooks.ts — that pattern assumes "POST JSON to
 * whatever URL is configured," which doesn't fit FUB's fixed endpoint +
 * auth requirements. Trying to force it through the generic webhook
 * field would silently fail.
 *
 * No-ops until `followupboss_api_key` is set in /admin/settings.
 */

const FUB_EVENTS_URL = "https://api.followupboss.com/v1/events";

// Identifies this integration to FUB — shows up as the lead source in
// their UI. Not secret, doesn't need to match anything FUB has to
// pre-approve for this endpoint.
const SYSTEM_NAME = "LakeNormanRealtor1 Website";

export type FubEventType =
  | "Registration"
  | "Seller Inquiry"
  | "Property Inquiry"
  | "General Inquiry";

interface FubLead {
  name: string;
  email: string;
  phone: string | null;
  type: FubEventType;
  message: string;
}

function splitName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { firstName: parts[0] ?? name, lastName: "" };
  return { firstName: parts.slice(0, -1).join(" "), lastName: parts[parts.length - 1] };
}

/**
 * Fire-and-forget push of a lead into Follow Up Boss. Errors are logged,
 * never thrown — matches the fire-and-forget style of the other
 * lead-dispatch helpers so a flaky FUB response never blocks the user's
 * response.
 */
export async function pushLeadToFollowUpBoss(lead: FubLead): Promise<void> {
  const settings = await getSettingsMap(["followupboss_api_key"]);
  const apiKey = settings.followupboss_api_key;
  if (!apiKey) return; // Not configured yet — silent no-op.

  const { firstName, lastName } = splitName(lead.name);
  const authHeader = `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;

  try {
    const res = await fetch(FUB_EVENTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        source: SYSTEM_NAME,
        system: SYSTEM_NAME,
        type: lead.type,
        message: lead.message,
        person: {
          firstName,
          lastName,
          emails: [{ value: lead.email }],
          phones: lead.phone ? [{ value: lead.phone }] : [],
        },
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.warn(`[followupboss] non-2xx response: ${res.status} ${body}`);
    }
  } catch (err) {
    console.warn("[followupboss] push failed:", err);
  }
}
