import { useChainId, useReadContract } from "wagmi";
import * as TradeHelper from "@/lib/abis/TradeHelper";
import { formatUnits, parseUnits, zeroAddress } from "viem";
import { useMemo } from "react";
import { TToken } from "@/lib/types";
import { ETHER, TRADE_HELPER, WETH } from "@/data/constants";

export function useQuoteSwap({
  amountIn,
  tokenIn,
  tokenOut,
}: {
  amountIn: string;
  tokenIn: TToken | null;
  tokenOut: TToken | null;
}) {
  const chainId = useChainId();
  const weth = useMemo(() => WETH[chainId], [chainId]);
  const address = useMemo(() => TRADE_HELPER[chainId], [chainId]);
  const address0 = useMemo(
    () =>
      tokenIn?.address.toLowerCase() === ETHER.toLowerCase()
        ? weth
        : tokenIn?.address,
    [tokenIn?.address, weth]
  );
  const address1 = useMemo(
    () =>
      tokenOut?.address.toLowerCase() === ETHER.toLowerCase()
        ? weth
        : tokenOut?.address,
    [tokenOut?.address, weth]
  );
  const {
    data: [receivedAmount] = [BigInt(0), false],
    error,
    isLoading,
    // refetch,
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
      enabled: !!amountIn && tokenIn !== null && tokenOut !== null,
      staleTime: 5_000
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
          ? formatUnits(receivedAmount, tokenOut.decimals)
          : "0",
    [receivedAmount, amountIn, tokenOut, isIntrinsicWETHProcess]
  );

  // useWatchBlocks({
  //   onBlock: () => {
  //     void refetch();
  //   },
  // });

  return { amountOut, error, isLoading };
}
