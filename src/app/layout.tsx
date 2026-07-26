import type { Metadata } from "next";
import { Montserrat, Open_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import MetaPixel from "@/components/MetaPixel";
import { RealEstateAgentSchema } from "@/components/Schema";
import { SITE } from "@/lib/site-config";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-ibm",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.brandName} — ${SITE.tagline}`,
    template: `%s | ${SITE.brandName}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.brandName} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.brandName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brandName} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    // Sample data phase — keep robots open. Confirm before real launch that
    // the DR Horton written authorization is on file (see Chapter 0).
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <RealEstateAgentSchema />
        <MetaPixel />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} ${plexMono.variable} antialiased`}
      >
        {/* Public routes get a compliance-required header via
            src/app/(public)/layout.tsx — Canopy MLS Rule #5 (equal
            prominence for agent + brokerage). Admin routes have their
            own AdminNav. */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
