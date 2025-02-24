import { Address, erc20Abi, maxUint256 } from "viem";
import { useSimulateContract } from "wagmi";

export default function useApproveSimulate({
  spender,
  tokenAddress,
}: {
  tokenAddress: Address | undefined;
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
