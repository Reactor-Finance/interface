import { Address, erc20Abi, maxUint256, parseUnits } from "viem";
import { useSimulateContract } from "wagmi";
import useGetAllowance from "./useGetAllowance";
import { ETHER } from "@/data/constants";
import { useMemo } from "react";

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
}: {
  tokenAddress: Address | undefined;
  spender: Address;
  // token: TToken | null;
  amount: string;
  decimals?: number;
}) {
  const {
    data: allowance,
    queryKey,
    isLoading,
  } = useGetAllowance({
    tokenAddress,
    spender,
  });
  const { data } = useSimulateContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "approve",
    args: [spender, maxUint256],
  });

  // useWatchBlocks({
  //   onBlock: () => {
  //     void refetch();
  //   },
  // });
  const needsApproval = useMemo(
    () =>
      (allowance ?? 0n) < parseUnits(amount, decimals) &&
      !!tokenAddress &&
      tokenAddress.toLowerCase() !== ETHER.toLowerCase(),
    [allowance, amount, decimals, tokenAddress]
  );

  return {
    approveWriteRequest: data?.request,
    needsApproval,
    allowanceKey: queryKey,
    isFetching: isLoading, // refactor this naming
  };
}
