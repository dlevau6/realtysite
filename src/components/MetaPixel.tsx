import { getSetting } from "@/lib/settings";

/**
 * Meta (Facebook) Pixel injection. Server-fetches the pixel ID from
 * Supabase settings — Eric can enter it from /admin/settings without
 * a redeploy. Renders nothing if unset.
 *
 * Add PageView tracking to specific pages by importing this and
 * rendering in the head — it fires PageView by default.
 */
export default async function MetaPixel() {
  const pixelId = await getSetting("meta_pixel_id");
  if (!pixelId?.trim()) return null;

  const script = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId.replace(/'/g, "")}');
    fbq('track', 'PageView');
  `;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${encodeURIComponent(pixelId)}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
