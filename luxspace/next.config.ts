import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
