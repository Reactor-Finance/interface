import { useCheckPair } from "@/lib/hooks/useCheckPair";
import { useGetPairInfo } from "@/lib/hooks/useGetPairInfo";
import { useMemo } from "react";
import { zeroAddress } from "viem";

export function useQuoteLiquidity({
  token0,
  token1,
  stable,
  amountIn,
}: {
  token0: `0x${string}`;
  token1: `0x${string}`;
  stable: boolean;
  amountIn: bigint;
}) {
  const { pair, pairExists } = useCheckPair({ token0, token1, stable });
  const { pairInfo } = useGetPairInfo({ pair });
  const amountOut = useMemo(() => {
    if (pair === zeroAddress || !pairExists) return BigInt(0);
    if (!pairInfo) return BigInt(0);
    const [reserveA, reserveB] =
      pairInfo.token0.toLowerCase() === token0.toLowerCase()
        ? [pairInfo.reserve0, pairInfo.reserve1]
        : [pairInfo.reserve1, pairInfo.reserve0];
    return (amountIn * reserveB) / reserveA;
  }, [pair, pairExists, pairInfo, token0]);
  return amountOut;
}
