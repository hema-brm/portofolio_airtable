import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'github.com',
      'v5.airtableusercontent.com',
    ],
  },
};

export default nextConfig;
