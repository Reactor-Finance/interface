import { SimulateContractReturnType, zeroAddress } from "viem";
import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useEffect, useMemo } from "react";
import * as Gauge from "@/lib/abis/Gauge";
import { FormAction, TPair } from "../../types";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { useQueryClient } from "@tanstack/react-query";
export interface StakeProps {
  pairInfo: TPair;
  amount: bigint;
  needsApproval: boolean;
  fetchingApproval: boolean;
  approvalSimulation: SimulateContractReturnType["request"] | undefined;
  allowanceKey: readonly unknown[];
  balanceKey: readonly unknown[];
  closeModal: () => void;
}
export function useStake({
  amount,
  approvalSimulation,
  fetchingApproval,
  needsApproval,
  allowanceKey,
  closeModal,
  balanceKey,
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
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({ hash });
  const { setToast } = useTransactionToastProvider();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (isSuccess) {
      reset();
      if (needsApproval) {
        queryClient.invalidateQueries({ queryKey: allowanceKey });
        setToast({
          hash,
          actionDescription: "Approved",
          actionTitle: "",
        });
        return;
      }

      setToast({
        hash,
        actionDescription: "Approved",
        actionTitle: "",
      });
      queryClient.invalidateQueries({ queryKey: pairInfo.queryKey });
      queryClient.invalidateQueries({ queryKey: balanceKey });
      closeModal();
    }
  }, [
    allowanceKey,
    balanceKey,
    closeModal,
    hash,
    isLoading,
    isSuccess,
    needsApproval,
    pairInfo.queryKey,
    queryClient,
    reset,
    setToast,
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
