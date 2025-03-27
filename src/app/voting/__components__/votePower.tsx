"use client";
import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";
import { useVoteProvider } from "../__contexts__/voteProvider";
import VoteDialog from "./voteDialog";
import { useAccount } from "wagmi";
import { useVeNFTsProvider } from "@/contexts/veNFTsProvider";
import { formatNumber } from "@/lib/utils";
import { formatEther } from "viem";

export default function VotePower() {
  const { disallocateAll, allocations, selectedVeNFT } = useVoteProvider();
  const [open, setOpen] = useState(false);
  const { isConnected } = useAccount();
  const totalPercentage = useMemo(
    () =>
      Object.keys(allocations).length
        ? Object.values(allocations).reduce((prev, curr) => prev + curr, 0)
        : 0,
    [allocations]
  );
  const { lockTokens } = useVeNFTsProvider();
  const amount = useMemo(() => {
    const lock = lockTokens.find((l) => l.id === selectedVeNFT);
    return (BigInt(totalPercentage) * (lock?.voting_amount || 0n)) / 100n;
  }, [lockTokens, selectedVeNFT, totalPercentage]);
  return (
    isConnected &&
    !!selectedVeNFT && (
      <>
        <VoteDialog setOpen={setOpen} open={open} />
        <div className="py-3 z-20 px-6 flex justify-between gap-x-10 w-[520px] fixed rounded-md bottom-8 border border-neutral-950 -translate-x-1/2 left-1/2 items-center bg-neutral-1000">
          <div className="flex gap-x-5 justify-center items-center">
            <span>Voting power used:</span>
            <span className="text-blue-light">{totalPercentage}%</span>
            <div className="bg-purple-400/10 text-purple-400 h-10 w-10 flex justify-center items-center rounded-full text-xs px-1 py-1">
              {formatNumber(formatEther(amount))}
            </div>
          </div>
          <div className="flex gap-x-3">
            <Button
              onClick={() => setOpen(true)}
              variant="primary"
              size="md"
              disabled={amount <= 0n}
            >
              Vote
            </Button>
            <button onClick={disallocateAll} className="text-primary-400">
              Reset
            </button>
          </div>
        </div>
      </>
    )
  );
}
