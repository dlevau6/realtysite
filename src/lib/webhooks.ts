import { getSettingsMap } from "@/lib/settings";
import type { Lead } from "@/types/database";

const WEBHOOK_KEYS = [
  "structurely_webhook_url",
  "followupboss_webhook_url",
  "homebot_webhook_url",
] as const;

type Payload = Partial<Lead> & {
  event: "lead.created";
  source: "buyer_form" | "buyer_form_partial" | "seller_form";
};

/**
 * Reads webhook URLs from Supabase settings and POSTs the lead payload to
 * each one that has a value set. Errors are logged but do not fail the
 * request that produced the lead — webhook delivery is best-effort.
 *
 * Homebot is only called for seller leads (buyer webhooks skip it).
 */
export async function dispatchLeadWebhooks(payload: Payload): Promise<void> {
  const settings = await getSettingsMap([...WEBHOOK_KEYS]);

  const targets: { url: string; name: string }[] = [];
  if (settings.structurely_webhook_url) {
    targets.push({
      url: settings.structurely_webhook_url,
      name: "structurely",
    });
  }
  if (settings.followupboss_webhook_url) {
    targets.push({
      url: settings.followupboss_webhook_url,
      name: "followupboss",
    });
  }
  if (
    settings.homebot_webhook_url &&
    payload.source === "seller_form"
  ) {
    targets.push({ url: settings.homebot_webhook_url, name: "homebot" });
  }

  if (targets.length === 0) return;

  // Fire all POSTs in parallel. Individual failures are swallowed so a
  // single flaky vendor never blocks the others (or the user's response).
  await Promise.allSettled(
    targets.map(async (t) => {
      try {
        const res = await fetch(t.url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          // Explicit 5s timeout so a hung vendor doesn't tie up the request.
          signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) {
          console.warn(
            `[webhook:${t.name}] non-2xx response: ${res.status}`
          );
        }
      } catch (err) {
        console.warn(`[webhook:${t.name}] delivery failed:`, err);
      }
    })
  );
}
