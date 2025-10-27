import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ['res.cloudinary.com'],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
