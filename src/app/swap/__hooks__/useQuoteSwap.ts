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
  amountIn: string;
  amountOut: string;
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
  const tokensExist = useMemo(
    () => tokenIn !== null && tokenOut !== null,
    [tokenIn, tokenOut]
  );
  const {
    data: [receivedAmountOut] = [BigInt(0), false],
    error,
    isLoading,
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
      enabled: !!amountIn && tokensExist && selected === 0 && amountIn !== "",
    },
  });
  const {
    isLoading: amountInLoading,
    data: [receivedAmountIn] = [BigInt(0), false],
    error: e,
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
      enabled: !!amountOut && tokensExist && selected === 1 && amountOut !== "",
    },
  });
  console.log(e, receivedAmountIn);
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
        : tokenOut
          ? formatUnits(receivedAmount, tokenOut.decimals)
          : "0",
    [receivedAmount, amountIn, tokenOut, isIntrinsicWETHProcess]
  );

  return { quoteAmount, error, isLoading, amountInLoading };
}
