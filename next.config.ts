import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // For project site (username.github.io/repo-name): set basePath to '/repo-name'
  // For user/org site (username.github.io): leave empty
  basePath: "",
  images: {
    unoptimized: true, // required for static export
  },
  trailingSlash: true, // ensures GitHub Pages resolves routes correctly
};

export default nextConfig;
