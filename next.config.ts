import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Spark API / Bridge Interactive photo CDN
        protocol: "https",
        hostname: "*.sparkplatform.com",
      },
      {
        protocol: "https",
        hostname: "*.sparkapi.com",
      },
      {
        // Supabase storage, if photos are ever mirrored there
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
