import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // silence root inference warnings since project was moved into 'frontend' dir
    root: process.cwd(),
  },
};

export default nextConfig;
