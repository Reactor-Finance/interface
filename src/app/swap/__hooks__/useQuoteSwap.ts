import { useChainId, useReadContract } from "wagmi";
import * as TradeHelper from "@/lib/abis/TradeHelper";
import { formatUnits, parseUnits, zeroAddress } from "viem";
import { useMemo } from "react";
import { TToken } from "@/lib/types";
import { ETHER, TRADE_HELPER, WETH } from "@/data/constants";

export function useQuoteSwap({
  amountIn,
  amountOut,
  tokenIn,
  tokenOut,
  selected,
}: {
  amountIn: number;
  amountOut: number;
  selected: 0 | 1;
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
  const tokensNonNull = useMemo(
    () => tokenIn !== null && tokenOut !== null,
    [tokenIn, tokenOut]
  );
  const {
    data: [receivedAmountOut, amountOutStable] = [BigInt(0), false],
    error: receivedAmountOutError,
    isLoading: amountOutLoading,
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
      enabled: !!amountIn && tokensNonNull && selected === 0,
      refetchInterval: 10_000,
    },
  });
  const {
    isLoading: amountInLoading,
    data: [receivedAmountIn, amountInStable] = [BigInt(0), false],
    error: receivedAmountInError,
  } = useReadContract({
    address,
    ...TradeHelper,
    functionName: "getAmountIn",
    args: [
      parseUnits(String(amountOut), tokenOut?.decimals ?? 18),
      address0 ?? zeroAddress,
      address1 ?? zeroAddress,
    ],
    query: {
      enabled: !!amountOut && tokensNonNull && selected === 1,
      refetchInterval: 10_000,
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

  const receivedAmount = useMemo(
    () => (selected === 0 ? receivedAmountOut : receivedAmountIn),
    [selected, receivedAmountOut, receivedAmountIn]
  );

  const quoteAmount = useMemo(
    () =>
      isIntrinsicWETHProcess
        ? amountIn
        : selected === 0 && tokenOut
          ? Number(formatUnits(receivedAmount, tokenOut.decimals))
          : selected === 1 && tokenIn
            ? Number(formatUnits(receivedAmount, tokenIn.decimals))
            : 0,
    [
      receivedAmount,
      amountIn,
      tokenOut,
      isIntrinsicWETHProcess,
      selected,
      tokenIn,
    ]
  );

  return {
    quoteAmount,
    error: selected === 0 ? receivedAmountOutError : receivedAmountInError,
    isLoading: selected === 0 ? amountInLoading : amountOutLoading,
    stable: amountInStable || amountOutStable,
  };
}
