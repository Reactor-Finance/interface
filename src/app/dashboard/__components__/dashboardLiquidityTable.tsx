"use client";
import { useGetPairs } from "@/lib/hooks/useGetPairs";
import DashboardLiquidityDialog from "./dashboardLiquidityDialog/dashboardLiquidityDialog";
import { LiquidityRow } from "./liquidityRow";
import { useMemo, useState } from "react";
import { LiquidityActions, StateType } from "../types";
import usePadLoading from "@/lib/hooks/usePadLoading";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { zeroAddress } from "viem";
import { wmonToMon } from "@/lib/utils";

export default function DashboardLiquidityTable() {
  const { data: pairs, isLoading } = useGetPairs({});
  const activePairs = useMemo(
    () =>
      pairs
        .filter(
          (pair) =>
            pair.pair_address !== zeroAddress &&
            (pair.account_gauge_balance !== 0n ||
              pair.account_lp_balance !== 0n)
        )
        .map((pair) => ({
          ...pair,

          token0: wmonToMon(pair.token0),
          token1: wmonToMon(pair.token1),
        })),
    [pairs]
  );
  console.log(activePairs, "ACTIVE PAIRS");
  const [selectedPair, setSelectedPair] = useState(activePairs[0]);
  const [stateType, setStateType] = useState<StateType>({
    dialogOpen: false,
    actionType: LiquidityActions.Stake,
  });
  const isLoadingPadded = usePadLoading({ value: isLoading, duration: 300 });
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
      {!isLoadingPadded && activePairs.length > 0 && (
        <table className="w-full pt-6 mx-auto">
          <caption className="h-0 opacity-0">Pools Table</caption>
          <thead className="text-neutral-400 text-sm">
            <tr className="grid grid-cols-7 px-6 py-2 font-medium">
              <th className="col-span-2 text-left">Pool Name</th>
              <th className="hidden lg:block">Status</th>
              <th className="hidden lg:block">Value</th>
              <th className="hidden lg:block">APR</th>
              <th className="hidden lg:block">Rewards</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="flex flex-col space-y-2 min-h-[52px]">
            {!isLoadingPadded &&
              activePairs.map((pair) => (
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
      )}
      {isLoadingPadded && (
        <div className=" w-full  h-[52px] flex items-center justify-center">
          <Spinner height="24px" width="24px" />
        </div>
      )}
      {!activePairs.length && !isLoadingPadded && (
        <div className="text-start text-sm rounded-sm bg-neutral-1000 font-normal text-neutral-400 p-4">
          To receive emissions{" "}
          <Link
            href="/liquidity/deposit"
            className="underline decoration-gray-500 font-semibold cursor-pointer text-white"
          >
            deposit and stake
          </Link>{" "}
          your liquidity first.
        </div>
      )}
    </>
  );
}
