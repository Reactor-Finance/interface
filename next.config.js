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
        destination: process.env.RPC_URL,
      },
      {
        source: "/api/points/leaderboard",
        destination: process.env.POINTS_API_URL + "/points/leaderboard",
      },
      {
        source: "/api/points/user/info/:path*",
        destination: process.env.POINTS_API_URL + "/user/info/:path*",
      },
      {
        source: "/api/points/user/register",
        destination: process.env.POINTS_API_URL + "/user/register",
      },
    ];
  },
};

module.exports = nextConfig;
