import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.prographr.com" }],
        destination: "https://prographr.com/:path*",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;