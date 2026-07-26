import { getSupabaseServiceClient } from "@/lib/supabase";

export type SettingKey =
  | "structurely_webhook_url"
  | "followupboss_webhook_url"
  | "homebot_webhook_url"
  | "notification_email"
  | "google_ads_conversion_id"
  | "google_ads_buyer_label"
  | "google_ads_seller_label"
  | "ga4_measurement_id";

export interface SettingRow {
  key: SettingKey;
  value: string | null;
  description: string | null;
  is_secret: boolean;
  updated_at: string;
}

/** Fetch all settings rows. Order isn't stable — callers sort as needed. */
export async function getAllSettings(): Promise<SettingRow[]> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase.from("settings").select("*");
  if (error) {
    console.error("getAllSettings failed:", error);
    return [];
  }
  return (data ?? []) as SettingRow[];
}

/** Fetch a single value. Returns null on any error to keep call sites simple. */
export async function getSetting(key: SettingKey): Promise<string | null> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", key)
    .single();
  if (error || !data) return null;
  return (data as { value: string | null }).value;
}

/** Convenience: fetch multiple settings by key in a single query. */
export async function getSettingsMap(
  keys: SettingKey[]
): Promise<Partial<Record<SettingKey, string | null>>> {
  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("settings")
    .select("key, value")
    .in("key", keys);
  if (error || !data) return {};
  const map: Partial<Record<SettingKey, string | null>> = {};
  for (const row of data as { key: SettingKey; value: string | null }[]) {
    map[row.key] = row.value;
  }
  return map;
}

/** Update a single setting; upserts so unknown keys are created. */
export async function setSetting(
  key: SettingKey,
  value: string | null
): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase
    .from("settings")
    .update({ value, updated_at: new Date().toISOString() })
    .eq("key", key);
  if (error) {
    console.error("setSetting failed:", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
