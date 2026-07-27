import type { Metadata } from "next";
import { getAllSettings, type SettingKey } from "@/lib/settings";
import SettingRowForm from "./SettingRowForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

const SECTIONS: {
  title: string;
  blurb: string;
  keys: string[];
}[] = [
  {
    title: "Webhooks (outbound)",
    blurb:
      "Every new lead is POSTed to any URL you set here. Structurely handles the 60-second AI SMS; Homebot is optional (seller leads only). Follow Up Boss has its own section below — it doesn't work as a plain webhook URL.",
    keys: ["structurely_webhook_url", "homebot_webhook_url"],
  },
  {
    title: "Follow Up Boss CRM",
    blurb:
      "Uses Follow Up Boss's real API (not a generic webhook). Get the API key from Eric's FUB account: Admin → API. Every buyer/seller lead is pushed the moment it's saved.",
    keys: ["followupboss_api_key"],
  },
  {
    title: "Notifications",
    blurb: "Get a personal heads-up when a lead comes in.",
    keys: ["notification_email"],
  },
  {
    title: "Google Ads & Analytics",
    blurb:
      "Conversion tracking IDs. Once set, the thank-you pages fire the correct conversion events without a redeploy.",
    keys: [
      "google_ads_conversion_id",
      "google_ads_buyer_label",
      "google_ads_seller_label",
      "ga4_measurement_id",
      "meta_pixel_id",
    ],
  },
  {
    title: "iHomefinder CRM sync (placeholder — do not enable yet)",
    blurb:
      "Bidirectional sync with iHomefinder MAX: pushes our own leads into their CRM, and (once they confirm they can forward search-widget leads to a custom URL) pulls those into this same Leads table. The endpoint, API key, and payload shape here are UNCONFIRMED — get real details from Eric's iHomefinder account rep before setting ihomefinder_sync_enabled to \"true\". See src/lib/ihomefinder.ts for the full explanation.",
    keys: [
      "ihomefinder_sync_enabled",
      "ihomefinder_push_endpoint",
      "ihomefinder_api_key",
      "ihomefinder_webhook_secret",
    ],
  },
];

export default async function AdminSettingsPage() {
  const settings = await getAllSettings();
  const byKey = new Map(settings.map((s) => [s.key, s]));

  return (
    <>
      <div className="mb-6">
        <p className="font-[family-name:var(--font-data)] text-xs uppercase tracking-widest text-[var(--color-drh-red)]">
          Integrations
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--color-navy)]">
          Settings
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--color-ink)]/70">
          These values are stored in Supabase. Update any of them here and the
          site picks up the change on the next request — no redeploy needed.
        </p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-[var(--color-line)] bg-white"
          >
            <div className="border-b border-[var(--color-line)] p-5">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-navy)]">
                {section.title}
              </h2>
              <p className="mt-1 text-sm text-[var(--color-ink)]/70">
                {section.blurb}
              </p>
            </div>
            {section.keys.map((key) => {
              const setting = byKey.get(key as SettingKey);
              if (!setting) {
                // The migration wasn't run, or a key was renamed. Render
                // an obvious warning row rather than hiding it silently.
                return (
                  <div
                    key={key}
                    className="border-t border-[var(--color-line)] p-4 text-xs text-red-600 first:border-t-0"
                  >
                    Missing setting row: <code>{key}</code>. Run{" "}
                    <code>supabase/schema-drh-v3.sql</code>.
                  </div>
                );
              }
              return <SettingRowForm key={key} setting={setting} />;
            })}
          </section>
        ))}
      </div>
    </>
  );
}
