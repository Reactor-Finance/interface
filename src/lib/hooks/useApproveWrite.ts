import { Address, erc20Abi, maxUint256, parseUnits } from "viem";
import { useSimulateContract } from "wagmi";
import useGetAllowance from "./useGetAllowance";
import { ETHER } from "@/data/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

/**
 * Returns write data request only if the allowance is less than the amount
 * returns
 *
 * @approveWriteRequest: undefined,
 * @needsApproval: false,
 * @allowanceKey: queryKey,
 * @isFetching,
 */
export default function useApproveWrite({
  spender,
  tokenAddress,
  amount,
  decimals = 18,
  disabled,
}: {
  tokenAddress: Address | undefined;
  spender: Address;
  // token: TToken | null;
  amount: string;
  decimals?: number;
  disabled?: boolean;
}) {
  const {
    data: allowance,
    queryKey,
    isLoading,
  } = useGetAllowance({
    tokenAddress,
    spender,
    disabled,
  });
  const { data } = useSimulateContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "approve",
    args: [spender, maxUint256],
    query: {
      enabled: !disabled,
    },
  });

  const needsApproval = useMemo(
    () =>
      (allowance ?? 0n) < parseUnits(amount ?? "0", decimals) &&
      tokenAddress?.toLowerCase() !== ETHER.toLowerCase() &&
      tokenAddress !== undefined,
    [allowance, amount, decimals, tokenAddress]
  );
  const queryClient = useQueryClient();
  const resetApproval = useCallback(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient, queryKey]);
  return {
    approveWriteRequest: data?.request,
    needsApproval,
    allowanceKey: queryKey,
    isFetching: isLoading, // refactor this naming
    resetApproval,
  };
}
