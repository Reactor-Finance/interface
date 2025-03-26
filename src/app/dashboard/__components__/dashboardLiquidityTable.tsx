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
import { convertWETHToPlainETHIfApplicable } from "@/utils";
import { useChainId } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

export default function DashboardLiquidityTable() {
  const chainId = useChainId();
  const queryClient = useQueryClient();
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
          token0: convertWETHToPlainETHIfApplicable(pair.token0, chainId),
          token1: convertWETHToPlainETHIfApplicable(pair.token1, chainId),
        })),
    [pairs]
  );
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
          onTransactionCompleted={() =>
            void queryClient.invalidateQueries({
              queryKey: selectedPair.queryKey,
            })
          }
          onOpenChange={(isOpen) =>
            setStateType((s) => ({ ...s, dialogOpen: isOpen }))
          }
        />
      )}
      {!isLoadingPadded && activePairs.length > 0 && (
        <div className="overflow-x-auto scroll-container">
          <table className="w-full min-w-[1000px] pt-6 mx-auto">
            <caption className="h-0 opacity-0">Pools Table</caption>
            <thead className="text-neutral-400 text-sm">
              <tr className="grid grid-cols-7 px-6 py-2 font-medium">
                <th className="col-span-2 text-left">Pool Name</th>
                <th className=" ">Status</th>
                <th className=" ">Value</th>
                <th className=" ">APR</th>
                <th className=" ">Rewards</th>
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
        </div>
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
