import { getSettingsMap } from "@/lib/settings";

/**
 * Fetches Google Ads/GA4 IDs from settings and renders the tracking scripts.
 * Renders nothing when neither ID is set — useful during development
 * before Eric has plugged the values into the admin panel.
 */
export default async function GoogleAdsConversion({
  event,
}: {
  // Which conversion label to fire — 'buyer' or 'seller'
  event: "buyer" | "seller";
}) {
  const s = await getSettingsMap([
    "ga4_measurement_id",
    "google_ads_conversion_id",
    "google_ads_buyer_label",
    "google_ads_seller_label",
  ]);

  const ga4Id = s.ga4_measurement_id?.trim();
  const adsId = s.google_ads_conversion_id?.trim();
  const label =
    event === "buyer"
      ? s.google_ads_buyer_label?.trim()
      : s.google_ads_seller_label?.trim();

  if (!ga4Id && !adsId) return null;

  // Base tag: prefer GA4, fall back to the Ads ID
  const baseTagId = ga4Id ?? adsId;

  const baseScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    ${adsId ? `gtag('config', '${adsId}');` : ""}
    ${ga4Id ? `gtag('config', '${ga4Id}');` : ""}
    ${
      adsId && label
        ? `gtag('event', 'conversion', {
             send_to: '${adsId}/${label}',
             event_category: 'Lead',
             event_label: '${event === "buyer" ? "Buyer Form Submit" : "Seller Form Submit"}'
           });`
        : ""
    }
  `;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${baseTagId}`}
      />
      <script dangerouslySetInnerHTML={{ __html: baseScript }} />
    </>
  );
}
