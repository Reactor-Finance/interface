import { useSwapProvider } from "../swapProvider";
import { useReadContract } from "wagmi";
import { Contracts } from "@/lib/contracts";
import { Address, formatUnits, parseUnits } from "viem";
import { useEffect } from "react";

export function useQuoteSwap() {
  const { state, updateState } = useSwapProvider();
  const { data: amountOut } = useReadContract({
    ...Contracts.TradeHelper,
    functionName: "getAmountOut",
    args: [
      parseUnits(state.outTokenAmount, 18),
      state.inToken?.address ?? ("0x" as Address),
      state.outToken?.address ?? ("0x" as Address),
    ],
    query: {
      enabled:
        Boolean(state.inToken) &&
        Boolean(state.outToken) &&
        Boolean(state.outTokenSelected),
    },
  });
  const { data: amountIn } = useReadContract({
    ...Contracts.TradeHelper,
    functionName: "getAmountIn",
    args: [
      parseUnits(state.inTokenAmount, 18),
      state.inToken?.address ?? ("0x" as Address),
      state.outToken?.address ?? ("0x" as Address),
    ],
    query: {
      enabled:
        Boolean(state.inToken) &&
        Boolean(state.outToken) &&
        Boolean(state.outTokenSelected),
    },
  });
  // Use token amount inputs as quote display
  useEffect(() => {
    if (state.outTokenSelected) {
      updateState({ inTokenAmount: formatUnits(amountIn?.[0] ?? 0n, 18) });
    }
    if (state.inTokenSelected) {
      updateState({ outTokenAmount: formatUnits(amountOut?.[0] ?? 0n, 18) });
    }
  }, [
    amountIn,
    amountOut,
    state.inTokenSelected,
    state.outTokenSelected,
    updateState,
  ]);
  return { amountOut, amountIn };
}
