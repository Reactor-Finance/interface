import { Address, erc20Abi, maxUint256, parseUnits } from "viem";
import { useSimulateContract, useWatchBlocks } from "wagmi";
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
  decimals = 18,
}: {
  tokenAddress: Address | undefined;
  spender: Address;
  // token: TToken | null;
  amount: string;
  decimals?: number;
}) {
  const {
    data: allowance = BigInt(0),
    queryKey,
    isFetching,
    refetch,
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

  useWatchBlocks({
    onBlock: () => {
      void refetch();
    },
  });

  return allowance < parseUnits(amount, decimals) && !!data?.request
    ? {
        approveWriteRequest: data.request,
        needsApproval: true,
        allowanceKey: queryKey,
        isFetching,
      }
    : {
        approveWriteRequest: undefined,
        needsApproval: false,
        allowanceKey: queryKey,
        isFetching,
      };
}
