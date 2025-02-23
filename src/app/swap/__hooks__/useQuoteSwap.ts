import { useChainId, useReadContract, useWatchBlocks } from "wagmi";
import * as TradeHelper from "@/lib/abis/TradeHelper";
import { formatUnits, parseUnits, zeroAddress } from "viem";
import { useMemo } from "react";
import { TToken } from "@/lib/types";
import { TRADE_HELPER } from "@/data/constants";

export function useQuoteSwap(
  amountIn: number = 0,
  tokenIn: TToken | null,
  tokenOut: TToken | null
) {
  const chainId = useChainId();
  const address = useMemo(() => TRADE_HELPER[chainId], []);
  const {
    data: [receivedAmount] = [BigInt(0), false],
    error,
    isLoading,
    refetch,
  } = useReadContract({
    address,
    ...TradeHelper,
    functionName: "getAmountOut",
    args: [
      parseUnits(String(amountIn), tokenIn?.decimals ?? 18),
      tokenIn?.address ?? zeroAddress,
      tokenOut?.address ?? zeroAddress,
    ],
    query: {
      enabled: amountIn > 0 && tokenIn !== null && tokenOut !== null,
    },
  });

  const amountOut = useMemo(
    () =>
      tokenOut ? Number(formatUnits(receivedAmount, tokenOut.decimals)) : 0,
    [receivedAmount, tokenOut?.decimals]
  );

  useWatchBlocks({
    onBlock: () => {
      refetch()
        .then(() => {
          console.info("Refetching swap quote");
        })
        .catch(console.debug);
    },
  });

  return { amountOut, error, isLoading };
}
