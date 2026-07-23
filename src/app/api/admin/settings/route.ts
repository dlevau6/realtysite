import { NextResponse } from "next/server";
import { z } from "zod";
import { setSetting, type SettingKey } from "@/lib/settings";

const ALLOWED_KEYS: readonly SettingKey[] = [
  "structurely_webhook_url",
  "followupboss_webhook_url",
  "homebot_webhook_url",
  "notification_email",
  "google_ads_conversion_id",
  "google_ads_buyer_label",
  "google_ads_seller_label",
  "ga4_measurement_id",
];

const bodySchema = z.object({
  key: z.string().max(60),
  value: z.string().max(500).nullable(),
});

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (!ALLOWED_KEYS.includes(parsed.data.key as SettingKey)) {
    return NextResponse.json({ error: "Unknown setting key" }, { status: 400 });
  }

  // Empty string coerced to null so the DB stays clean.
  const value =
    parsed.data.value === "" || parsed.data.value === null
      ? null
      : parsed.data.value.trim();

  const result = await setSetting(parsed.data.key as SettingKey, value);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Save failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
