import { Button } from "@/components/ui/button";
import { Contracts } from "@/lib/contracts";
import React, { useMemo } from "react";
import { useAccount, useSimulateContract, useWriteContract } from "wagmi";
import { useLockProvider } from "./lockProvider";

export default function ClaimAllLocks() {
  const { lockTokens } = useLockProvider();
  const tokenIds = useMemo(
    () => lockTokens.map((token) => token.id),
    [lockTokens]
  );
  const { data: claimAllSimulation } = useSimulateContract({
    ...Contracts.RewardsDistributor,
    functionName: "claim_many",
    args: [tokenIds],
  });
  const { writeContract } = useWriteContract();
  const onSubmit = () => {
    if (claimAllSimulation) {
      writeContract(claimAllSimulation.request);
    }
  };
  const { isConnected } = useAccount();
  if (!isConnected) return;
  return (
    <Button
      onClick={onSubmit}
      disabled={!Boolean(claimAllSimulation)}
      variant={"primary"}
      size="md"
    >
      Claim All Locks
    </Button>
  );
}
