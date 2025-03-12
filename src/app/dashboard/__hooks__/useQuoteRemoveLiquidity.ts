import { ROUTER } from "@/data/constants";
import { useChainId, useReadContract } from "wagmi";
import { abi } from "@/lib/abis/Router";
import { getAddress, zeroAddress } from "viem";
import { useMemo } from "react";

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
  const t0 = useMemo(() => (token0 ? getAddress(token0) : undefined), [token0]);
  const t1 = useMemo(() => (token1 ? getAddress(token1) : undefined), [token1]);
  const router = useMemo(() => ROUTER[chainId], [chainId]);

  return useReadContract({
    address: router,
    abi,
    functionName: "quoteRemoveLiquidity",
    args: [t0 ?? zeroAddress, t1 ?? zeroAddress, !!isStable, amount],
    query: {
      enabled,
      refetchInterval: 5_000,
    },
  });
}
