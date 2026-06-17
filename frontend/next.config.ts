import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Populated in Phase 2: add Supabase Storage hostname here
    // { protocol: "https", hostname: "<project-ref>.supabase.co" }
    remotePatterns: [],
  },
};

export default nextConfig;
