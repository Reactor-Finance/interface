import { Address, SimulateContractReturnType, zeroAddress } from "viem";
import { useSimulateContract, useWriteContract } from "wagmi";
import { useEffect, useMemo } from "react";
import * as Gauge from "@/lib/abis/Gauge";
import { FormAction } from "../../types";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { useQueryClient } from "@tanstack/react-query";

export function useStake({
  gaugeAddress,
  amount,
  pairQueryKey,
}: {
  gaugeAddress: Address;
  amount: bigint;
  needsApproval: boolean;
  fetchingApproval: boolean;
  approvalSimulation: SimulateContractReturnType["request"] | undefined;
  pairQueryKey: readonly unknown[];
}): FormAction {
  const gaugeExists = gaugeAddress !== zeroAddress;
  const { data, error } = useSimulateContract({
    ...Gauge,
    address: gaugeAddress,
    functionName: "deposit",
    args: [amount],
    query: { enabled: gaugeExists },
  });
  const { writeContract, data: hash, isPending } = useWriteContract({});
  const { updateState, txReceipt } = useTransactionToastProvider();
  useEffect(() => {
    updateState({ hash });
  }, [hash, updateState]);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (txReceipt.isSuccess) {
      queryClient.invalidateQueries({ queryKey: pairQueryKey });
    }
  }, [pairQueryKey, queryClient, txReceipt.isSuccess]);
  useEffect(() => {
    if (error) console.log(error);
  }, [error]);
  const onSubmit = () => {
    if (data?.request) {
      writeContract(data.request);
    }
  };
  const { isValid, errorMessage } = useMemo(() => {
    if (data?.request) {
      return { isValid: true, errorMessage: null };
    }
    return { isValid: false, errorMessage: null };
  }, [data?.request]);
  const { isLoading } = txReceipt;
  const { state: buttonState } = useGetButtonStatuses({ isLoading, isPending });
  return {
    onSubmit,
    isValid,
    errorMessage,
    buttonProps: { state: buttonState },
  };
}
