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
  return (
    <>
      <table className="w-full border-collapse text-left">
        <thead className="border-b border-gray-700 text-gray-400 text-xs uppercase">
          <tr>
            <th className="py-3">Rank</th>
            <th className="py-3">Profile</th>
            <th className="py-3">Referral</th>
            <th className="py-3">Referral Points</th>
            <th className="py-3">Trades</th>
            <th className="py-3">LPs</th>
            <th className="py-3 px-6">Boost</th>
            <th className="py-3">Total Points</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {data?.result.map((entry) => (
            <PointsRow {...entry} key={entry.rank} />
          ))}
        </tbody>
      </table>
      {(data?.result.length === 0 || !data) && (
        <div className="w-full text-center py-6">No Entries Yet.</div>
      )}
    </>
  );
}
