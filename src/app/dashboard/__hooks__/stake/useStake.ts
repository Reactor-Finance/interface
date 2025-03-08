import { SimulateContractReturnType, zeroAddress } from "viem";
import { useSimulateContract, useWriteContract } from "wagmi";
import { useEffect, useMemo } from "react";
import * as Gauge from "@/lib/abis/Gauge";
import { FormAction, TPair } from "../../types";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { useQueryClient } from "@tanstack/react-query";
export interface StakeProps {
  pairInfo: TPair;
  amount: bigint;
  balanceKey: readonly unknown[];
  needsApproval: boolean;
  fetchingApproval: boolean;
  approvalSimulation: SimulateContractReturnType["request"] | undefined;
  allowanceKey: readonly unknown[];
}
export function useStake({
  amount,
  approvalSimulation,
  fetchingApproval,
  needsApproval,
  allowanceKey,
  pairInfo,
}: StakeProps): FormAction {
  const gaugeExists = pairInfo.gauge !== zeroAddress;
  const { data, error } = useSimulateContract({
    ...Gauge,
    address: pairInfo.gauge,
    functionName: "deposit",
    args: [amount],
    query: { enabled: gaugeExists && !needsApproval },
  });
  const { writeContract, reset, data: hash, isPending } = useWriteContract({});
  const { updateState, txReceipt } = useTransactionToastProvider();
  useEffect(() => {
    updateState({ hash });
  }, [hash, updateState]);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (txReceipt.isSuccess) {
      reset();
      if (needsApproval) {
        queryClient.invalidateQueries({ queryKey: allowanceKey });
        return;
      }
      queryClient.invalidateQueries({ queryKey: pairInfo.queryKey });
    }
  }, [
    allowanceKey,
    needsApproval,
    pairInfo.queryKey,
    queryClient,
    reset,
    txReceipt.isSuccess,
  ]);
  useEffect(() => {
    if (error) console.log(error);
  }, [error]);
  const onSubmit = () => {
    if (needsApproval && approvalSimulation) {
      writeContract(approvalSimulation);
    }
    if (data?.request) {
      writeContract(data.request);
    }
  };
  const { isValid, errorMessage } = useMemo(() => {
    if (needsApproval) {
      if (approvalSimulation) {
        return { isValid: true, errorMessage: null };
      }
    }
    if (data?.request) {
      return { isValid: true, errorMessage: null };
    }
    return { isValid: false, errorMessage: null };
  }, [approvalSimulation, data?.request, needsApproval]);
  const { isLoading } = txReceipt;
  const { state: buttonState } = useGetButtonStatuses({
    needsApproval,
    isFetching: fetchingApproval,
    isLoading,
    isPending,
  });
  return {
    onSubmit,
    isValid,
    errorMessage,
    buttonProps: { state: buttonState },
  };
}
