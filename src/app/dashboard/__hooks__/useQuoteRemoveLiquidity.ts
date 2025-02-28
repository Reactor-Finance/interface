import { ROUTER } from "@/data/constants";
import { useChainId, useReadContract } from "wagmi";
import { abi } from "@/lib/abis/Router";
import { getAddress } from "viem";
export default function useQuoteRemoveLiquidity({
  token0,
  token1,
  isStable,
  amount,
  enabled,
}: {
  token0: string | undefined;
  token1: string | undefined;
  isStable: boolean | undefined;
  amount: bigint;
  enabled: boolean;
}) {
  const chainId = useChainId();
  const t0 = token0 ? getAddress(token0) : undefined;
  const t1 = token1 ? getAddress(token1) : undefined;
  return useReadContract({
    address: ROUTER[chainId],
    abi,
    functionName: "quoteRemoveLiquidity",
    args: [t0 ?? "0x", t1 ?? "0x", isStable ?? false, amount],
    query: {
      enabled,
    },
  });
}
