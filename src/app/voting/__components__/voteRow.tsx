import PoolHeader from "@/components/shared/poolHeader";
import { TableRow } from "@/components/ui/table";
import { TPoolType } from "@/lib/types";
import React, { useCallback, useMemo } from "react";
import { useVoteProvider } from "../__contexts__/voteProvider";
import { formatNumber } from "@/lib/utils";
import { convertWETHToPlainETHIfApplicable, useGetTokenInfo } from "@/utils";
import { TPoolExtended } from "@/contexts/pairsProvider";
import { formatEther } from "viem";
import { useGetPairBribe } from "@/lib/hooks/useGetPairBribe";

interface Props {
  pairInfo: TPoolExtended;
}
export default function VoteRow({ pairInfo }: Props) {
  const { allocate, allocations, selectedVeNFT } = useVoteProvider();

  const token0 = useGetTokenInfo(
    convertWETHToPlainETHIfApplicable(pairInfo.token0)
  );
  const token1 = useGetTokenInfo(
    convertWETHToPlainETHIfApplicable(pairInfo.token1)
  );

  const handleMaxClick = useCallback(() => {
    if (!selectedVeNFT) return;
    allocate(pairInfo.pair_address, 100); // Implemented to allocate percentage left if the allocation is very close to being exhausted
  }, [allocate, selectedVeNFT]);

  const pairBribe = useGetPairBribe({ pair: pairInfo.pair_address });
  const totalVotes = useMemo(
    () =>
      pairBribe
        .map((bribe) => bribe.totalVotes)
        .reduce((prev, curr) => prev + curr, 0n),
    [pairBribe]
  );

  return (
    <TableRow cols="10" className="z-10">
      <td className="col-span-3">
        <PoolHeader
          poolType={pairInfo.stable ? TPoolType.STABLE : TPoolType.VOLATILE}
          token0={token0}
          token1={token1}
        />
      </td>
      <td>~${formatNumber(formatEther(pairInfo.tvl))}</td>
      <td>{formatEther(pairInfo.emissions)}</td>
      <td>
        ~${formatNumber(formatEther(pairInfo.fees + pairInfo.incentives))}
      </td>
      <td>~${formatNumber(formatEther(pairInfo.incentives))}</td>
      <td>{formatNumber(formatEther(totalVotes))}</td>
      <td>
        <div className="flex justify-end">
          <div className="bg-neutral-950 transition-colors group-hover:bg-neutral-900 justify-between rounded-md p-2 flex gap-x-4">
            <div className="flex gap-x-1">
              <input
                placeholder="0"
                type="number"
                min={0}
                max={100}
                value={allocations[pairInfo.pair_address] || 0}
                onChange={(e) => {
                  const value = !isNaN(e.target.valueAsNumber)
                    ? e.target.valueAsNumber
                    : allocations[pairInfo.pair_address] || 0;

                  allocate(pairInfo.pair_address, value);
                }}
                className="w-[40px] focus:ring-transparent transition-all  bg-transparent"
              />
              <span className="text-neutral-400">%</span>
            </div>
            <button
              onClick={handleMaxClick}
              className="text-primary-400 disabled:text-neutral-500"
            >
              Max
            </button>
          </div>
        </div>
      </td>
    </TableRow>
  );
}
