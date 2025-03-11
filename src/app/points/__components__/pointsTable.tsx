import React from "react";
import PointsRow from "./pointsRow";

export default function PointsTable() {
  return (
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
        <PointsRow />
        <PointsRow />
      </tbody>
    </table>
  );
}
