import { Address, erc20Abi, maxUint256, parseUnits } from "viem";
import { useSimulateContract } from "wagmi";
import useGetAllowance from "./useGetAllowance";

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
}: {
  tokenAddress: Address | undefined;
  spender: Address;
  // token: TToken | null;
  amount: string;
}) {
  const {
    data: allowance,
    queryKey,
    isFetching,
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
  if ((allowance ?? 0n) < parseUnits(amount, 18) && data?.request) {
    return {
      approveWriteRequest: data?.request,
      needsApproval: true,
      allowanceKey: queryKey,
    };
  } else {
    return {
      approveWriteRequest: undefined,
      needsApproval: false,
      allowanceKey: queryKey,
      isFetching,
    };
  }
}
