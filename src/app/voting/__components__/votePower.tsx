"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useVoteProvider } from "./voteProvider";
import VoteDialog from "./voteDialog";
import { useAccount } from "wagmi";

export default function VotePower() {
  const { totalPercent, selectedVeNFTPoolsAmount, selectedVeNFT } =
    useVoteProvider();
  const [open, setOpen] = useState(false);
  const { address } = useAccount();
  if (!address) return null;
  if (!selectedVeNFT) return;
  return (
    <>
      <VoteDialog setOpen={setOpen} open={open} />
      <div className="py-3 z-20 px-6 flex gap-x-10 fixed rounded-md bottom-8 border border-neutral-950 -translate-x-1/2 left-1/2 items-center bg-neutral-1000">
        <div className="flex gap-x-4 items-center">
          <span>
            Voting power used:{" "}
            <span className="text-blue-light">{totalPercent} %</span>
          </span>
          <div className="bg-purple-400/10 text-purple-400 h-7 w-7 flex justify-center items-center rounded-full">
            {selectedVeNFTPoolsAmount}
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          variant="primary"
          disabled={totalPercent <= 0}
        >
          Vote
        </Button>
      </div>
    </>
  );
}
