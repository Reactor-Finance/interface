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
      {
        source: "/api/points/leaderboard",
        destination: process.env.POINTS_API_URL + "points/leaderboard",
      },
      {
        source: "/api/points/user/info",
        destination: process.env.POINTS_API_URL + "/user/info",
      },
      {
        source: "/api/points/user/register",
        destination: process.env.POINTS_API_URL + "/user/register",
      },
    ];
  },
};

module.exports = nextConfig;
