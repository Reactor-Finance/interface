import { Address, erc20Abi, maxUint256, parseUnits } from "viem";
import { useSimulateContract } from "wagmi";
import useGetAllowance from "./useGetAllowance";
import { TToken } from "@/lib/types";

/**
 * Returns write data request only if the allowance is less than the amount
 */
export default function useApproveWrite({
  spender,
  tokenAddress,
  amount,
}: {
  tokenAddress: Address | undefined;
  spender: Address;
  token: TToken | null;
  amount: string;
}) {
  const { data: allowance } = useGetAllowance({ tokenAddress, spender });
  const { data } = useSimulateContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "approve",
    args: [spender, maxUint256],
  });
  if ((allowance ?? 0n) < parseUnits(amount, 18) && data?.request) {
    return data?.request;
  } else {
    return undefined;
  }
}
