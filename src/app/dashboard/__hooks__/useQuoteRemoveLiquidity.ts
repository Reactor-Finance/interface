import { ROUTER } from "@/data/constants";
import { useChainId, useReadContract } from "wagmi";
import { abi } from "@/lib/abis/Router";
import { getAddress, zeroAddress } from "viem";
import { useMemo } from "react";
import { convertETHToWETHIfApplicable } from "@/utils";

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
  const t0 = useMemo(
    () =>
      token0
        ? convertETHToWETHIfApplicable(getAddress(token0), chainId)
        : undefined,
    [token0, chainId]
  );
  const t1 = useMemo(
    () =>
      token1
        ? convertETHToWETHIfApplicable(getAddress(token1), chainId)
        : undefined,
    [token1, chainId]
  );
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
