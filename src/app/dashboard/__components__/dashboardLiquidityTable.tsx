"use client";
import { useDashboardLiquidityProvider } from "../__context__/dashboardLiquidityProvider";
import DashboardLiquidityDialog from "./dashboardLiquidityDialog/dashboardLiquidityDialog";
import { LiquidityRow } from "./liquidityRow";

export default function DashboardLiquidityTable() {
  const { userLiquidityPositions } = useDashboardLiquidityProvider();
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
          {userLiquidityPositions?.user?.liquidityPositions.map((position) => (
            <LiquidityRow key={position.id} {...position}></LiquidityRow>
          ))}
        </tbody>
      </table>

      {!userLiquidityPositions?.user?.liquidityPositions.length && (
        <div className="text-start rounded-sm bg-neutral-1000 font-medium text-neutral-400 py-4 px-6">
          To receive emissions{" "}
          <span className="underline decoration-gray-500 font-semibold cursor-pointer text-white">
            deposit and stake
          </span>{" "}
          your liquidity first.
        </div>
      )}
    </>
  );
}
