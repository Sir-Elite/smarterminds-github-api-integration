import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Added to enable github profile readability
    images: {
      domains: ['avatars.githubusercontent.com'],
    },
};

export default nextConfig;
