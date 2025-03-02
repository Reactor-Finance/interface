import {
  useChainId,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useDashboardLiquidityProvider } from "../__context__/dashboardLiquidityProvider";
import { abi } from "@/lib/abis/Voter";
import { VOTER } from "@/data/constants";
import { FormAction } from "../types";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { Address } from "viem";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useCreateGauge(): FormAction {
  const { selectedUserLiquidityPosition } = useDashboardLiquidityProvider();

  const chainId = useChainId();
  const pairAddress = selectedUserLiquidityPosition?.pair.id
    ? (selectedUserLiquidityPosition?.pair.id as Address)
    : "0x";
  const { data, error, queryKey } = useSimulateContract({
    abi,
    address: VOTER[chainId],
    functionName: "createGauge",
    args: [pairAddress, 0n],
  });
  console.log({ data, error });
  const { writeContract, reset, data: hash, isPending } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const onSubmit = () => {
    if (data?.request) writeContract(data?.request);
  };
  const queryClient = useQueryClient();
  useEffect(() => {
    if (isSuccess) {
      reset();
      queryClient.invalidateQueries({ queryKey });
    }
  }, [isSuccess, queryClient, queryKey, reset]);
  const { state } = useGetButtonStatuses({ isPending, isLoading });
  return {
    isValid: !!data?.request,
    onSubmit,
    buttonProps: { state },
    errorMessage: error?.name ?? null,
  };
}
