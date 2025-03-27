import { useCheckPair } from "@/lib/hooks/useCheckPair";
import { useGetPairInfo } from "@/lib/hooks/useGetPairInfo";
import { useMemo } from "react";
import { zeroAddress } from "viem";

export function useQuoteLiquidity({
  token0,
  token1,
  quoting,
  stable,
  amountIn,
}: {
  token0: `0x${string}`;
  token1: `0x${string}`;
  quoting: "in" | "out";
  token0Decimals: number;
  token1Decimals: number;
  stable: boolean;
  amountIn: bigint;
}) {
  const { pair, pairExists } = useCheckPair({ token0, token1, stable });
  const { pairInfo } = useGetPairInfo({ pair });
  const amountOut = useMemo(() => {
    if (pair === zeroAddress || !pairExists) return BigInt(0);
    if (!pairInfo) return BigInt(0);

    const [reserveA, reserveB] = [pairInfo.reserve0, pairInfo.reserve1];
    if (reserveA === 0n || reserveB === 0n || amountIn === 0n) return BigInt(0);
    console.log(reserveA, reserveB, amountIn, "HELLOOOOO");
    if (quoting === "in") {
      return (amountIn * reserveB) / reserveA;
    } else {
      return (amountIn * reserveA) / reserveB;
    }
  }, [pair, pairExists, pairInfo, quoting, amountIn]);
  return amountOut;
}
