import type { NextConfig } from "next";

// Static export so GitHub Pages can serve the site from danieldiab.github.io.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
