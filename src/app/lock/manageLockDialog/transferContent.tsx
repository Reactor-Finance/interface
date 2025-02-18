import React from "react";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAccount, useSimulateContract, useWriteContract } from "wagmi";
import { Contracts } from "@/lib/contracts";
import { Address } from "viem";
import { useLockProvider } from "../lockProvider";

export default function TransferContent() {
  const [toAddress, setAddress] = React.useState("");
  const { selectedLockToken } = useLockProvider();
  const { address } = useAccount();
  const { data: transferSimulation, error } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "safeTransferFrom",
    args: [
      address as Address,
      toAddress as Address,
      selectedLockToken?.id ?? 0n,
    ],
    query: {
      enabled: Boolean(address) && Boolean(selectedLockToken),
    },
  });
  console.log({ error, transferSimulation });
  const { writeContract } = useWriteContract();
  const onSubmit = () => {
    if (transferSimulation) {
      writeContract(transferSimulation.request);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="pt-2">
        <label htmlFor="destination">Destination Address</label>
        <div className="pt-1"></div>
        <Input
          placeholder="0x..."
          onChange={(e) => setAddress(e.target.value)}
          value={toAddress}
          className="bg-neutral-950"
        />
      </div>
      <Alert colors={"muted"}>
        Transferring a lock will also transfer any rewards and rebases! Before
        continuing, please make sure you have claimed all available rewards.
      </Alert>
      <Button
        onClick={onSubmit}
        disabled={!Boolean(transferSimulation)}
        size="submit"
        variant={"primary"}
      >
        Transfer
      </Button>
    </div>
  );
}
