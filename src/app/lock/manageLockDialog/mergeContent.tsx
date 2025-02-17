import React from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Contracts } from "@/lib/contracts";
import { useSimulateContract, useWriteContract } from "wagmi";
import { parseUnits } from "viem";

export default function MergeContent() {
  const tokenId0 = "1234";
  const tokenId1 = "1234";
  const { data: mergeSimulation } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "merge",
    args: [parseUnits(tokenId0, 0), parseUnits(tokenId1, 0)],
  });
  const { writeContract } = useWriteContract();
  const onSubmit = () => {
    if (mergeSimulation?.request) {
      writeContract(mergeSimulation.request);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <h2>Merge with</h2>
      <div className="p-3 bg-neutral-950 border border-neutral-900/80 rounded-sm ">
        <h2>Estimates</h2>
      </div>
      <div className="flex justify-between p-2 ">
        <h5 className="text-sm text-neutral-200">Deposit</h5>
        <h5 className="text-neutral-100">0.00 RCT</h5>
      </div>
      <Alert colors={"muted"}>
        Merging locks will inherit the longest lock time of the two and will
        increase the final Lock voting power by adding up the two underlying
        locked amounts based on the new lock time.
      </Alert>
      <Button disabled onClick={onSubmit} size="submit" variant={"primary"}>
        Approve
      </Button>
    </div>
  );
}
