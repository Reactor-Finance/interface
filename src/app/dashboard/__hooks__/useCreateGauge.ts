import { useChainId, useSimulateContract, useWriteContract } from "wagmi";
import { VOTER } from "@/data/constants";
import { Address } from "viem";
import { useEffect, useMemo } from "react";
import * as Voter from "@/lib/abis/Voter";
import { FormAction } from "../types";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
export function useCreateGauge({ pair }: { pair: Address }): FormAction {
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
    if (hash) updateState({ hash });
  }, [hash, updateState]);
  const onSubmit = () => {
    if (data?.request) {
      writeContract(data.request);
    }
  };
  const { state: buttonState } = useGetButtonStatuses({
    isPending,
    isLoading: txReceipt.isLoading,
  });
  const { isValid, errorMessage } = useMemo(() => {
    if (data?.request) {
      return { isValid: true, errorMessage: null };
    }
    if (error) {
      if (error.message.includes("whitelisted")) {
        return { isValid: false, errorMessage: "Pair Not Whitelisted" };
      }
    }
    return { isValid: false, errorMessage: null };
  }, [data?.request, error]);
  return {
    onSubmit,
    isValid,
    buttonProps: { state: buttonState },
    errorMessage,
  };
}
