import React from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useSimulateContract, useWriteContract } from "wagmi";
import { Contracts } from "@/lib/contracts";
import { parseUnits } from "viem";

export default function WithdrawContent() {
  const tokenId = "1234";
  const { data: withdrawSimulation } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "withdraw",
    args: [parseUnits(tokenId, 0)],
  });
  const { writeContract } = useWriteContract();
  const onSubmit = () => {
    if (withdrawSimulation) {
      writeContract(withdrawSimulation.request);
    }
  };
  return (
    <div className="space-y-4 pt-4">
      <Alert colors="muted">Withdraw veRCT from your expired locks.</Alert>
      <Button onClick={onSubmit} disabled size="submit" variant="primary">
        Approve
      </Button>
    </div>
  );
}
