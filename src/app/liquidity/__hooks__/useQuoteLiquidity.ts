import { useCheckPair } from "@/lib/hooks/useCheckPair";
import { useGetPairInfo } from "@/lib/hooks/useGetPairInfo";
import { useMemo } from "react";
import { zeroAddress } from "viem";

export function useQuoteLiquidity({
  token0,
  token1,
  token0Decimals,
  token1Decimals,
  stable,
  amountIn,
}: {
  token0: `0x${string}`;
  token1: `0x${string}`;
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
    const [reserveA, reserveB] =
      pairInfo.token0.toLowerCase() === token0.toLowerCase()
        ? [pairInfo.reserve0, pairInfo.reserve1]
        : [pairInfo.reserve1, pairInfo.reserve0];

    console.log({ token0, token1, amountIn, pairInfo });
    let amount =
      amountIn > 0n && reserveB > 0n && reserveA > 0n
        ? (amountIn * reserveB) / reserveA
        : BigInt(0);
    const decimalDiff = token0Decimals - token1Decimals;
    console.log(decimalDiff, amount, "DECIMALLL ============");
    amount = amount / BigInt(10) ** BigInt(Math.abs(decimalDiff));
    return amount / BigInt(10) ** BigInt(Math.abs(decimalDiff));
  }, [
    pair,
    pairExists,
    pairInfo,
    token0,
    token1,
    amountIn,
    token0Decimals,
    token1Decimals,
  ]);
  return amountOut;
}
