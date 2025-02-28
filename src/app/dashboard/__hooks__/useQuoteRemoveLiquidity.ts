import { ROUTER } from "@/data/constants";
import { useChainId, useReadContract } from "wagmi";
import { abi } from "@/lib/abis/Router";
import { Address } from "viem";
export default function useQuoteRemoveLiquidity({
  token0,
  token1,
  isStable,
  amount,
  enabled,
}: {
  token0: Address;
  token1: Address;
  isStable: boolean;
  amount: bigint;
  enabled: boolean;
}) {
  const chainId = useChainId();
  return useReadContract({
    address: ROUTER[chainId],
    abi,
    functionName: "quoteRemoveLiquidity",
    args: [token0, token1, isStable, amount],
    query: {
      enabled,
    },
  });
}
