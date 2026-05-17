import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Expose the proxy URL to the client instead of the real Render URL
    BACKEND_URL: "/proxy-api",
  },
  async rewrites() {
    return [
      {
        // Proxy all requests starting with /proxy-api to the Render backend
        source: "/proxy-api/:path*",
        destination: `${process.env.BACKEND_URL}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;
