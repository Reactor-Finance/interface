import DisplayFormattedNumber from "@/components/shared/displayFormattedNumber";
import PoolHeader from "@/components/shared/poolHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TPoolType } from "@/lib/types";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  Address,
  formatEther,
  formatUnits,
  getAddress,
  zeroAddress,
} from "viem";
import { useVoteProvider } from "../__contexts__/voteProvider";
import { formatNumber } from "@/lib/utils";
import { TVeNFTsToken, useVeNFTsProvider } from "@/contexts/veNFTsProvider";
import { useGetPairBribe } from "@/lib/hooks/useGetPairBribe";
import { usePoolslistContext } from "@/contexts/pairsProvider";
import { convertWETHToPlainETHIfApplicable, useGetTokenInfo } from "@/utils";
import { useAtomicDate } from "@/lib/hooks/useAtomicDate";
import { useVoteSimulation } from "../__hooks__/useVoteSimulation";
import Spinner from "@/components/ui/spinner";
import { useWriteContract } from "wagmi";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";

interface Props {
  open?: boolean;
  setOpen?: (b: boolean) => void;
}

export default function VoteDialog({ open, setOpen }: Props) {
  const { allocations, selectedVeNFT, disallocateAll } = useVoteProvider();
  const { refresh: refreshPools } = usePoolslistContext();
  const { lockTokens, reset: refreshVeNFTs } = useVeNFTsProvider();
  const selectedLockToken = useMemo(
    () =>
      lockTokens.find((token) => String(token.id) === String(selectedVeNFT)),
    [selectedVeNFT]
  );
  const apr = useMemo(
    () =>
      !!selectedLockToken
        ? (selectedLockToken.rebase_amount * 100n) / selectedLockToken.amount
        : 0n,
    [selectedLockToken]
  );
  const lockEndDate = useMemo(
    () => new Date(Number(selectedLockToken?.lockEnd || 0n) * 1000),
    [selectedLockToken]
  );
  const now = useAtomicDate();

  const pools = useMemo(
    () => Object.keys(allocations).map((pool) => pool as Address),
    [allocations]
  );
  const weights = useMemo(
    () =>
      Object.keys(allocations).length && !!selectedLockToken
        ? Object.values(allocations).map(
            (val) => (BigInt(val) * selectedLockToken.voting_amount) / 100n
          )
        : [],
    [selectedLockToken, allocations]
  );

  const voteSimulation = useVoteSimulation({
    tokenId: selectedVeNFT || 0n,
    pools,
    weights,
  });

  const isValid = useMemo(
    () =>
      Boolean(voteSimulation.data?.request) &&
      !!pools.length &&
      !!weights.length,
    [voteSimulation, pools, weights]
  );

  const {
    writeContract,
    data: hash,
    reset,
    isSuccess,
    isPending,
  } = useWriteContract();
  const { setToast } = useTransactionToastProvider();

  const onSubmit = useCallback(() => {
    if (voteSimulation.data) {
      reset();
      writeContract(voteSimulation.data.request, {
        onSuccess: () => {
          refreshPools(); // Refresh pools on success
          refreshVeNFTs(); // Refresh veNFTs
          disallocateAll(); // Clear allocations
          if (setOpen) setOpen(false); // Close dialog
        },
      });
      return;
    }
  }, [
    voteSimulation,
    writeContract,
    hash,
    reset,
    refreshPools,
    refreshVeNFTs,
    disallocateAll,
    setOpen,
  ]);

  useEffect(() => {
    if (voteSimulation.error) console.error(voteSimulation.error);
  }, [voteSimulation.error]);

  useEffect(() => {
    if (hash && isSuccess) {
      setToast({
        hash,
        actionTitle: "Vote Successful",
        actionDescription: "You have successfully voted",
      });
    }
  }, [hash, isSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="opacity-0 h-0 ">Vote</DialogTitle>
      <DialogContent removeClose className="w-[1400px] px-2 py-2">
        <button
          onClick={() => setOpen?.(false)}
          className="flex items-center rounded-full h-8 w-8 absolute bg-neutral-950  -right-3 -top-3 justify-center"
        >
          <X size={16} />
        </button>
        <div className="max-h-[70svh] scroll-container space-y-4 overflow-y-auto px-2 py-2">
          <div>
            <div className="bg-neutral-950 text-sm grid grid-cols-8  items-center  px-6 py-2 rounded-md">
              <div className="flex justify-start items-center gap-x-3 col-span-2">
                <div className="h-8 w-8 bg-blue-400 rounded-full"></div>
                <span>Lock ID {String(selectedVeNFT)}</span>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col">
                  <span className="block">
                    <DisplayFormattedNumber
                      num={formatUnits(
                        selectedLockToken?.voting_amount || 0n,
                        selectedLockToken?.decimals || 18
                      )}
                      formatNum
                    />{" "}
                    veRCT
                  </span>
                  <span className="block text-neutral-500 text-[12px]">
                    Locked{" "}
                    <DisplayFormattedNumber
                      num={formatUnits(
                        selectedLockToken?.amount || 0n,
                        selectedLockToken?.decimals || 18
                      )}
                      formatNum
                    />{" "}
                    RCT
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <span className="text-blue-light">{String(apr)}%</span>
              </div>
              <div className="flex justify-center">
                <span className="">
                  {formatNumber(formatEther(selectedLockToken?.amount || 0n))}{" "}
                  RCT
                </span>
              </div>
              <div className="flex justify-center">
                <span className="">{lockEndDate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-center">
                <Badge
                  colors={
                    selectedLockToken &&
                    selectedLockToken.votes.length &&
                    lockEndDate > now
                      ? "success"
                      : "error"
                  }
                >
                  {selectedLockToken &&
                  selectedLockToken.votes.length &&
                  lockEndDate > now
                    ? "Active"
                    : "Not Active"}
                </Badge>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={onSubmit}
                  disabled={
                    !isValid ||
                    voteSimulation.isLoading ||
                    voteSimulation.isFetching ||
                    isPending
                  }
                >
                  {voteSimulation.isLoading ||
                  voteSimulation.isFetching ||
                  voteSimulation.isPending ||
                  isPending ? (
                    <Spinner />
                  ) : (
                    "Vote"
                  )}
                </Button>
              </div>
            </div>
            {selectedLockToken &&
              pools.map((poolId) => {
                return (
                  <PoolRow
                    key={poolId}
                    selectedVeNFTToken={selectedLockToken}
                    poolId={getAddress(poolId)}
                  />
                );
              })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// function Row({
//   selectedVotes,
//   nftId,
// }: {
//   nftId: string;
//   selectedVotes: { [id: string]: number };
// }) {
//   return (

//   );
// }

function PoolRow({
  poolId,
  selectedVeNFTToken,
}: {
  poolId: Address;
  selectedVeNFTToken: TVeNFTsToken;
}) {
  const { allocations, disallocate, allocate } = useVoteProvider();
  const value = useMemo(() => allocations[poolId] || 0, [poolId, allocations]);
  const bribes = useGetPairBribe({ pair: poolId });
  const totalVotes = useMemo(
    () =>
      bribes
        .map((bribe) => bribe.totalVotes)
        .reduce((prev, curr) => prev + curr, 0n),
    [bribes]
  );
  // Get pools list
  const { pools } = usePoolslistContext();
  const pool = useMemo(
    () =>
      pools.find(
        (pool) => pool.pair_address.toLowerCase() === poolId.toLowerCase()
      ),
    [poolId, pools]
  );
  const token0 = useGetTokenInfo(
    convertWETHToPlainETHIfApplicable(pool?.token0 ?? zeroAddress)
  );
  const token1 = useGetTokenInfo(
    convertWETHToPlainETHIfApplicable(pool?.token1 ?? zeroAddress)
  );
  const poolWeight = useMemo(() => {
    const poolVote = selectedVeNFTToken.votes.find(
      (vote) => vote.pair.toLowerCase() === poolId.toLowerCase()
    );
    return poolVote?.weight ?? 0n;
  }, [selectedVeNFTToken, poolId]);

  const handleMaxClick = useCallback(() => {
    if (!selectedVeNFTToken) return;
    allocate(poolId, 100); // Implemented to allocate percentage left if the allocation is very close to being exhausted
  }, [allocate, selectedVeNFTToken]);

  return (
    !!pool &&
    !!token0 &&
    !!token1 && (
      <div className="pt-8">
        <div className="grid grid-cols-6  text-sm">
          <div className="relative">
            <button
              onClick={() => disallocate(poolId)}
              className="flex items-center rounded-full h-6 w-6 absolute bg-neutral-950  -right-2 -top-2 justify-center"
            >
              <X size={16} />
            </button>
            <PoolHeader
              poolType={pool.stable ? TPoolType.STABLE : TPoolType.VOLATILE}
              token0={token0}
              token1={token1}
            />
          </div>
          <div className="col-span-2 flex justify-center">
            <div className="">
              <div>
                <span className="text-neutral-400">Votes</span>{" "}
                <span>{formatNumber(formatEther(totalVotes))}</span>
              </div>
              <div>
                <span className="text-neutral-400">Total Rewards</span>{" "}
                <span>
                  ${formatNumber(formatEther(pool.incentives + pool.fees))}
                </span>
              </div>
              <div>
                <span className="text-neutral-400">APR</span>{" "}
                <span>{formatEther(pool.emissions)}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-neutral-400">Est. Rewards</div>
            <div>${formatNumber(formatEther(pool.incentives))}</div>
          </div>
          <div>
            <div className="text-neutral-400">Voting Power</div>
            <div>{formatNumber(formatEther(poolWeight))} veRCT</div>
          </div>
          <div className="flex justify-end items-start ">
            <div className="bg-neutral-950 justify-between rounded-md p-2 flex gap-x-2">
              <div className="flex gap-x-1">
                <input
                  placeholder="0"
                  value={value}
                  type="number"
                  min={0}
                  max={100}
                  onChange={(e) => {
                    const v = !isNaN(e.target.valueAsNumber)
                      ? e.target.valueAsNumber
                      : allocations[poolId] || 0;
                    allocate(poolId, v);
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
        </div>
        <div className="flex justify-end">
          <div className="flex gap-x-2">
            <Button onClick={() => allocate(poolId, 0)} size="sm">
              0%
            </Button>
            <Button onClick={() => allocate(poolId, 25)} size="sm">
              25%
            </Button>
            <Button onClick={() => allocate(poolId, 50)} size="sm">
              50%
            </Button>
            <Button onClick={() => allocate(poolId, 75)} size="sm">
              75%
            </Button>
            <Button onClick={() => allocate(poolId, 100)} size="sm">
              100%
            </Button>
          </div>
        </div>
      </div>
    )
  );
}
