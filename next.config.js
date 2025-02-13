// @ts-check
//** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/rpc",
        destination: process.env.RPC_URL,
      },
    ];
  },
};

module.exports = nextConfig;
