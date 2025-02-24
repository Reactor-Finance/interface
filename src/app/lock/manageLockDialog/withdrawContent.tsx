import React, { useEffect } from "react";
import { Alert } from "@/components/ui/alert";
import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Contracts } from "@/lib/contracts";
import useApproveVeRct from "./hooks/useApproveVeRct";
import useGetLockApproval from "./hooks/useGetLockApproval";
import { useQueryClient } from "@tanstack/react-query";
import { useLockProvider } from "../lockProvider";
import SubmitButton from "@/components/shared/submitBtn";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";

export default function WithdrawContent() {
  const { selectedLockToken } = useLockProvider();
  const { data: withdrawSimulation, queryKey: withdrawKey } =
    useSimulateContract({
      ...Contracts.VotingEscrow,
      functionName: "withdraw",
      args: [selectedLockToken?.id ?? 0n],
    });
  const { data: approved, queryKey: getLockKey } = useGetLockApproval();
  const { data: approveSimulation } = useApproveVeRct();
  const { writeContract, reset, isPending, data: hash } = useWriteContract();
  const { isSuccess, isError, isLoading } = useWaitForTransactionReceipt({
    hash,
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (isSuccess) {
      if (!approved) {
        queryClient.invalidateQueries({ queryKey: getLockKey });
        queryClient.invalidateQueries({ queryKey: withdrawKey });
      }
      reset();
    }
  }, [
    isSuccess,
    isError,
    reset,
    approved,
    queryClient,
    getLockKey,
    withdrawKey,
  ]);
  const onSubmit = () => {
    if (!approved && approveSimulation) {
      writeContract(approveSimulation.request);
      return;
    }
    if (withdrawSimulation) {
      writeContract(withdrawSimulation.request);
    }
  };
  const { state } = useGetButtonStatuses({
    isPending,
    isLoading,
    needsApproval: !Boolean(approved),
  });
  return (
    <div className="space-y-4 pt-4">
      <Alert colors="muted">Withdraw veRCT from your expired locks.</Alert>
      <SubmitButton
        onClick={onSubmit}
        state={state}
        isValid={Boolean(withdrawSimulation)}
        approveTokenSymbol="veRCT"
      >
        Withdraw
      </SubmitButton>
    </div>
  );
}
