import { Address, erc20Abi, maxUint256 } from "viem";
import { useSimulateContract } from "wagmi";

export default function useSimulateApprove({
  spender,
  tokenAddress,
}: {
  tokenAddress: Address;
  spender: Address;
}) {
  const { data } = useSimulateContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "approve",
    args: [spender, maxUint256],
  });
  return { data };
}
