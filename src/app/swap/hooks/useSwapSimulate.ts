import { Contracts } from "@/lib/contracts";
import { useSwapProvider } from "../swapProvider";
import { useAccount, useSimulateContract } from "wagmi";
import { useMemo } from "react";
import { parseUnits } from "viem";

export default function useSwapSimulate() {
  const { state } = useSwapProvider();
  const { address } = useAccount();
  const amountIn = useMemo(() => {
    return parseUnits(state.inTokenAmount, 18);
  }, [state.inTokenAmount]);
  return useSimulateContract({
    ...Contracts.Router,
    functionName: "swap",
    args: [
      amountIn, //amountIn
      calculateMinOut(amountIn, 5), //minOut
      [
        {
          from: state.inToken?.address ?? "0x",
          to: state.outToken?.address ?? "0x",
          stable: false,
        },
      ],
      address ?? "0x", //address
      BigInt(Date.now() + 1000 * 60 * 4), //deadline
      true, //useTokenAsFee
    ],
    query: {
      enabled:
        Boolean(state.inToken) && Boolean(state.outToken) && Boolean(address),
    },
  });
}
function calculateMinOut(amount: bigint, slippagePercentage: number) {
  const slippage = (amount * BigInt(slippagePercentage)) / BigInt(100);
  const minAmount = amount - slippage;
  return minAmount;
}
