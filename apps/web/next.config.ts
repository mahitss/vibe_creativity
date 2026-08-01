import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@omnia/config", "@omnia/lib", "@omnia/types", "@omnia/ui"],
};

export default nextConfig;

