import { useChainId, useReadContract, useWatchBlocks } from "wagmi";
import * as TradeHelper from "@/lib/abis/TradeHelper";
import { formatUnits, parseUnits, zeroAddress } from "viem";
import { useMemo } from "react";
import { TToken } from "@/lib/types";
import { ETHER, TRADE_HELPER, WETH } from "@/data/constants";

export function useQuoteSwap({
  amountIn = 0,
  tokenIn,
  tokenOut,
}: {
  amountIn: number;
  tokenIn: TToken | null;
  tokenOut: TToken | null;
}) {
  const chainId = useChainId();
  const weth = useMemo(() => WETH[chainId], [chainId]);
  const address = useMemo(() => TRADE_HELPER[chainId], [chainId]);
  const address0 = useMemo(
    () => (tokenIn?.address.toLowerCase() === ETHER ? weth : tokenIn?.address),
    [tokenIn?.address, weth]
  );
  const address1 = useMemo(
    () =>
      tokenOut?.address.toLowerCase() === ETHER ? weth : tokenOut?.address,
    [tokenOut?.address, weth]
  );
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
      address0 ?? zeroAddress,
      address1 ?? zeroAddress,
    ],
    query: {
      enabled: amountIn > 0 && tokenIn !== null && tokenOut !== null,
    },
  });

  const isIntrinsicWETHProcess = useMemo(
    () =>
      (tokenIn?.address.toLowerCase() === weth.toLowerCase() &&
        tokenOut?.address.toLowerCase() === ETHER.toLowerCase()) ||
      (tokenIn?.address.toLowerCase() === ETHER.toLowerCase() &&
        tokenOut?.address.toLowerCase() === weth.toLowerCase()),
    [weth, tokenIn?.address, tokenOut?.address]
  );

  const amountOut = useMemo(
    () =>
      isIntrinsicWETHProcess
        ? amountIn
        : tokenOut
          ? Number(formatUnits(receivedAmount, tokenOut.decimals))
          : 0,
    [receivedAmount, tokenOut?.decimals]
  );

  useWatchBlocks({
    onBlock: () => {
      void refetch();
    },
  });

  return { amountOut, error, isLoading };
}
