"use client";
import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";
import { useVoteProvider } from "./voteProvider";
import VoteDialog from "./voteDialog";
import { useAccount } from "wagmi";

export default function VotePower() {
  const { totalPercent, veNFTsAndPoolsMap, selectedVeNFT } = useVoteProvider();
  const amount = useMemo(() => {
    // loop veNFTsAndPoolsMap
    let amt = 0;
    for (const veNFT in veNFTsAndPoolsMap) {
      // loop pools
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const _pool in veNFTsAndPoolsMap[veNFT]) {
        amt++;
      }
    }
    return amt;
  }, [veNFTsAndPoolsMap]);
  const [open, setOpen] = useState(false);
  const { address } = useAccount();
  if (!address) return null;
  if (!selectedVeNFT) return;
  return (
    <>
      <VoteDialog setOpen={setOpen} open={open} />
      <div className="py-3 z-20 px-6 flex justify-between gap-x-10 w-[460px] fixed rounded-md bottom-8 border border-neutral-950 -translate-x-1/2 left-1/2 items-center bg-neutral-1000">
        <div className="flex gap-x-1 items-center">
          <div>Voting power used: </div>
          <div className="text-blue-light flex">
            <div className="text-blue-light w-4">{totalPercent}</div>
            <div>%</div>
          </div>
          <div className="bg-purple-400/10 ml-2 text-purple-400 h-7 w-7 flex justify-center items-center rounded-full">
            {amount}
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          variant="primary"
          size="md"
          disabled={amount <= 0}
        >
          Vote
        </Button>
      </div>
    </>
  );
}
