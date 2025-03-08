import { useChainId, useSimulateContract, useWriteContract } from "wagmi";
import { VOTER } from "@/data/constants";
import { Address } from "viem";
import { useEffect, useMemo } from "react";
import * as Voter from "@/lib/abis/Voter";
import { FormAction } from "../types";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
export function useCreateGauge({
  pair,
  enabled,
}: {
  pair: Address;
  enabled: boolean;
}): FormAction {
  const chainId = useChainId();
  const voter = useMemo(() => VOTER[chainId], [chainId]);
  const { data, error } = useSimulateContract({
    ...Voter,
    address: voter,
    functionName: "createGauge",
    args: [pair, 0n],
  });

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { updateState, txReceipt } = useTransactionToastProvider();
  useEffect(() => {
    if (enabled) updateState({ hash });
  }, [enabled, hash, updateState]);
  const onSubmit = () => {
    if (data?.request) {
      writeContract(data.request);
    }
  };
  const { state: buttonState } = useGetButtonStatuses({
    isPending,
    isLoading: txReceipt.isLoading,
  });
  return {
    onSubmit,
    isValid: Boolean(data?.request),
    buttonProps: { state: buttonState },
    errorMessage: null,
  };
}
