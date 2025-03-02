import React, { useCallback, useMemo } from "react";
import { Alert } from "@/components/ui/alert";
import {
  useChainId,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import SubmitButton from "@/components/shared/submitBtn";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { TLockToken } from "../types";
import * as Ve from "@/lib/abis/Ve";
import { VE } from "@/data/constants";

export default function WithdrawContent({
  selectedLockToken,
}: {
  selectedLockToken: TLockToken;
}) {
  const chainId = useChainId();
  const ve = useMemo(() => VE[chainId], [chainId]);
  const { data: withdrawSimulation } = useSimulateContract({
    ...Ve,
    address: ve,
    functionName: "withdraw",
    args: [selectedLockToken.id],
  });
  const { writeContract, reset, isPending, data: hash } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({
    hash,
  });

  const onSubmit = useCallback(() => {
    if (withdrawSimulation) {
      reset();
      writeContract(withdrawSimulation.request);
    }
  }, [withdrawSimulation, reset, writeContract]);
  const { state } = useGetButtonStatuses({
    isPending,
    isLoading,
    needsApproval: false,
  });
  return (
    <div className="space-y-4 pt-4">
      <Alert colors="muted">Withdraw RCT from your expired locks.</Alert>
      <SubmitButton
        onClick={onSubmit}
        state={state}
        isValid={Boolean(withdrawSimulation)}
      >
        Withdraw
      </SubmitButton>
    </div>
  );
}
