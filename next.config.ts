import type { NextConfig } from "next";
import pkg from "./package.json";

process.env.NEXT_PUBLIC_APP_VERSION = pkg.version;
process.env.NEXT_PUBLIC_BUILD_DATE = new Date().toISOString().split("T")[0];

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
