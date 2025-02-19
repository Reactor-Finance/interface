import React from "react";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Contracts } from "@/lib/contracts";
import { Address } from "viem";
import { useLockProvider } from "../lockProvider";
import useGetButtonStatuses from "@/components/shared/hooks/useGetButtonStatuses";
import SubmitButton from "@/components/shared/submitBtn";

export default function TransferContent() {
  const [toAddress, setAddress] = React.useState("");
  const { selectedLockToken } = useLockProvider();
  const { address } = useAccount();
  const { data: transferSimulation } = useSimulateContract({
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
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({ hash });
  const onSubmit = () => {
    if (transferSimulation) {
      writeContract(transferSimulation.request);
    }
  };
  const { state } = useGetButtonStatuses({ isLoading, isPending });
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
      <SubmitButton
        onClick={onSubmit}
        state={state}
        isValid={Boolean(transferSimulation)}
      >
        Transfer
      </SubmitButton>
    </div>
  );
}
