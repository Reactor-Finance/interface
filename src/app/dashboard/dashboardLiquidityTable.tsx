"use client";
import DashboardLiquidityDialog from "./dashboardLiquidityDialog/dashboardLiquidityDialog";
import { LiquidityRow } from "./liquidityRow";

export default function DashboardLiquidityTable() {
  return (
    <>
      <DashboardLiquidityDialog />
      <table className="w-full pt-6 mx-auto">
        <caption className="h-0 opacity-0">Pools Table</caption>
        <thead className="text-neutral-400 text-sm">
          <tr className="grid grid-cols-7 px-6 py-2 font-medium">
            <th className="col-span-2 text-left">Pool Name</th>
            <th>Status</th>
            <th>Value</th>
            <th>APR</th>
            <th>Rewards</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <LiquidityRow id="1"></LiquidityRow>
        </tbody>
      </table>
    </>
  );
}
