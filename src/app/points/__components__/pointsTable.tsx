"use client";
import React from "react";
import PointsRow from "./pointsRow";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
const EntrySchema = z.object({
  address: z.string(),
  referralId: z.string(),
  fullReferralObject: z.any(),
  referrals: z.number(),
  referralPoints: z.number(),
  tradePoints: z.number(),
  lpPoints: z.number(),
  totalPoints: z.number(),
  rank: z.number(),
});
const LeaderboardSchema = z.object({ result: z.array(EntrySchema) });
export type TPointsEntry = z.infer<typeof EntrySchema>;
export default function PointsTable() {
  const { data, error } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const resp = await fetch("/api/points/leaderboard").then((r) => r.json());
      console.log(resp);
      return LeaderboardSchema.parse(resp);
    },
  });
  console.log({ data, error });
  return (
    <>
      <table className="w-full border-collapse text-left  overflow-x-scroll">
        <thead className="w-full text-gray-400 text-xs uppercase">
          <tr className="lg:grid-cols-8 grid-cols-4 grid">
            <th className="py-3">Rank</th>
            <th className="py-3 col-span-2 lg:col-span-1">Profile</th>
            <th className="py-3 hidden lg:block">Referral</th>
            <th className="py-3 hidden lg:block">Referral Points</th>
            <th className="py-3 hidden lg:block">Trades</th>
            <th className="py-3 hidden lg:block">LPs</th>
            <th className="py-3 px-6 hidden lg:block">Boost</th>
            <th className="py-3">Total Points</th>
          </tr>
        </thead>
        <tbody className="text-sm flex flex-col space-y-2 py-2 w-full">
          {data?.result
            .sort((a, b) => a.rank - b.rank)
            .map((entry) => <PointsRow {...entry} key={entry.rank} />)}
        </tbody>
      </table>
      {(data?.result.length === 0 || !data) && (
        <div className="w-full text-center py-6">No Entries Yet.</div>
      )}
      {data?.result.length && (
        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <p>
            Page 1 of 1&nbsp;|&nbsp;
            <span className="underline cursor-pointer text-[#4F515A] text-xs">
              (1 - {data?.result.length} results)
            </span>
          </p>
          <div className="flex items-center space-x-4">
            <button>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
