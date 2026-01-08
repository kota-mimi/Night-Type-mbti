import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: '',
};

export default nextConfig;
