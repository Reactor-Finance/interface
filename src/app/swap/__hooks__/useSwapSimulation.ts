import * as Router from "@/lib/abis/Router";
import { useAccount, useChainId, useSimulateContract } from "wagmi";
import { useMemo } from "react";
import { parseUnits, zeroAddress } from "viem";
import { ROUTER, WETH } from "@/data/constants";
import { TToken } from "@/lib/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type SwapRoute = {
  from: `0x${string}`;
  to: `0x${string}`;
  stable: boolean;
};

export default function useSwapSimulation({
  amount,
  token0,
  token1,
}: {
  amount: number | null;
  token0: TToken | null;
  token1: TToken | null;
}) {
  const { address } = useAccount();
  const chainId = useChainId();
  const router = useMemo(() => ROUTER[chainId], [chainId]);
  const weth = useMemo(() => WETH[chainId], [chainId]);
  const { slippage, transactionDeadlineInMinutes, multihopsEnabled } =
    useSelector((state: RootState) => state.settings);
  const amountIn = useMemo(
    () =>
      amount !== null && token0 !== null && token1 !== null
        ? parseUnits(String(amount), token0.decimals)
        : BigInt(0),
    [amount, token0, token1]
  );
  const routes: SwapRoute[] = useMemo(
    () =>
      multihopsEnabled
        ? [
            { from: token0?.address ?? zeroAddress, to: weth, stable: false },
            { from: weth, to: token1?.address ?? zeroAddress, stable: false },
          ]
        : [
            {
              from: token0?.address ?? zeroAddress,
              to: token1?.address ?? zeroAddress,
              stable: false,
            },
          ],
    []
  );
  const deadline = useMemo(() => {
    const ttl =
      Math.floor(Date.now() / 1000) + transactionDeadlineInMinutes * 60;
    return BigInt(ttl);
  }, [transactionDeadlineInMinutes]);
  return useSimulateContract({
    ...Router,
    address: router,
    functionName: "swap",
    args: [
      amountIn,
      calculateMinOut(amountIn, slippage),
      routes,
      address ?? zeroAddress,
      deadline,
      true,
    ],
    query: {
      enabled: !!address && !!token0 && !!token1 && amount !== null,
    },
  });
}

function calculateMinOut(amount: bigint, slippagePercentage: number) {
  const slippage = (amount * BigInt(slippagePercentage)) / BigInt(100);
  const minAmount = amount - slippage;
  return minAmount;
}
