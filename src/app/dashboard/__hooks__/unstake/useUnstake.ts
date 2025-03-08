import { zeroAddress } from "viem";
import { useSimulateContract, useWriteContract } from "wagmi";
import { useEffect, useMemo } from "react";
import * as Gauge from "@/lib/abis/Gauge";
import { FormAction, TPair } from "../../types";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { useQueryClient } from "@tanstack/react-query";
export interface UnstakeProps {
  pairInfo: TPair;
  amount: bigint;
  balanceKey: readonly unknown[];
  closeModal: () => void;
}
export function useUnstake({
  pairInfo,
  closeModal,
  amount,
}: UnstakeProps): FormAction {
  console.log({ amount }, "unstake");
  const gaugeExists = pairInfo.gauge !== zeroAddress;
  const { data, error } = useSimulateContract({
    ...Gauge,
    address: pairInfo.gauge,
    functionName: "withdraw",
    args: [amount],
    query: { enabled: gaugeExists },
  });
  useEffect(() => {
    console.log(error);
  }, [error]);
  const { isPending, data: hash, reset, writeContract } = useWriteContract();
  const { txReceipt, updateState } = useTransactionToastProvider();
  useEffect(() => {
    updateState({ hash });
  }, [hash, updateState]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (txReceipt.isSuccess) {
      queryClient.invalidateQueries({ queryKey: pairInfo.queryKey });
      closeModal();
      reset();
    }
  }, [closeModal, pairInfo.queryKey, queryClient, reset, txReceipt.isSuccess]);
  const onSubmit = () => {
    if (data?.request) {
      writeContract(data.request);
    }
  };
  const { state } = useGetButtonStatuses({
    isPending,
    isLoading: txReceipt.isLoading,
  });
  const { isValid, errorMessage } = useMemo(() => {
    if (data?.request) {
      return { isValid: true, errorMessage: null };
    }
    if (error) {
      return { isValid: false, errorMessage: "Error Occured" };
    }
    return { isValid: false, errorMessage: null };
  }, [data?.request, error]);
  return {
    onSubmit,
    errorMessage,
    isValid,
    buttonProps: { state },
  };
}
