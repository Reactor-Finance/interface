"use client";
import { useGetPairs } from "@/lib/hooks/useGetPairs";
import DashboardLiquidityDialog from "./dashboardLiquidityDialog/dashboardLiquidityDialog";
import { LiquidityRow } from "./liquidityRow";
import { useMemo, useState } from "react";
import { LiquidityActions, StateType } from "../types";

export default function DashboardLiquidityTable() {
  const pairs = useGetPairs({});
  const activePairs = useMemo(
    () => pairs.filter((pair) => pair.account_lp_balance > 0n),
    [pairs]
  );
  const [selectedPair, setSelectedPair] = useState(activePairs[0]);
  const [stateType, setStateType] = useState<StateType>({
    dialogOpen: false,
    actionType: LiquidityActions.Stake,
  });
  return (
    <>
      {stateType && selectedPair && (
        <DashboardLiquidityDialog
          state={stateType}
          pairInfo={selectedPair}
          onOpenChange={(isOpen) =>
            setStateType((s) => ({ ...s, dialogOpen: isOpen }))
          }
        />
      )}
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
        <tbody className="flex flex-col space-y-2">
          {activePairs.map((pair) => (
            <LiquidityRow
              key={pair.pair_address}
              pairInfo={pair}
              onItemClick={(actionType) => {
                setSelectedPair(pair);
                setStateType({ actionType, dialogOpen: true });
              }}
            />
          ))}
        </tbody>
      </table>

      {!activePairs.length && (
        <div className="text-start rounded-sm bg-neutral-1000 font-normal text-neutral-400 py-4 px-6">
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
