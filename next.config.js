// @ts-check
//** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/rpc",
        destination: process.env.NEXT_PUBLIC_RPC_URL,
      },
    ];
  },
};

module.exports = nextConfig;
