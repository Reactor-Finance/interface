import * as Router from "@/lib/abis/Router";
import { useAccount, useChainId, useSimulateContract } from "wagmi";
import { useMemo } from "react";
import { parseEther, parseUnits, zeroAddress } from "viem";
import { ETHER, ROUTER, WETH } from "@/data/constants";
import { TToken } from "@/lib/types";
import { useAtomicDate } from "@/lib/hooks/useAtomicDate";
import { useAtom } from "jotai/react";
import { multiHopsAtom, slippageAtom, transactionDeadlineAtom } from "@/store";
import { convertETHToWETHIfApplicable } from "@/utils";

type SwapRoute = {
  from: `0x${string}`;
  to: `0x${string}`;
  stable: boolean;
};

export function useSwapSimulation({
  amount,
  token0,
  token1,
  needsApproval,
  minAmountOut = BigInt(0),
  stable = false,
}: {
  amount: number | null;
  token0: TToken | null;
  token1: TToken | null;
  minAmountOut?: bigint;
  needsApproval: boolean;
  stable: boolean;
}) {
  const { address } = useAccount();
  const now = useAtomicDate();
  const chainId = useChainId();
  const router = useMemo(() => ROUTER[chainId], [chainId]);
  const weth = useMemo(() => WETH[chainId], [chainId]);
  const [txDeadline] = useAtom(transactionDeadlineAtom);
  const [slippage] = useAtom(slippageAtom);
  const [multihops] = useAtom(multiHopsAtom);
  const amountIn = useMemo(
    () =>
      amount !== null && token0 !== null && token1 !== null
        ? parseUnits(String(amount), token0.decimals)
        : BigInt(0),
    [amount, token0, token1]
  );
  const routes: SwapRoute[] = useMemo(
    () =>
      multihops &&
      token0?.address.toLowerCase() !== weth.toLowerCase() &&
      token1?.address.toLowerCase() !== weth.toLowerCase() &&
      token0?.address.toLowerCase() !== ETHER.toLowerCase() &&
      token1?.address.toLowerCase() !== ETHER.toLowerCase()
        ? [
            { from: token0?.address ?? zeroAddress, to: weth, stable: false },
            { from: weth, to: token1?.address ?? zeroAddress, stable: false },
          ]
        : [
            {
              from: token0?.address ?? zeroAddress,
              to: convertETHToWETHIfApplicable(token1?.address ?? zeroAddress),
              stable,
            },
          ],
    [multihops, token0?.address, token1?.address, weth, stable]
  );
  const deadline = useMemo(() => {
    const ttl = Math.floor(now.getTime() / 1000) + Number(txDeadline) * 60;
    return BigInt(ttl);
  }, [now, txDeadline]);
  const msgValue = useMemo(
    () =>
      token0?.address.toLowerCase() === weth.toLowerCase() ||
      token0?.address.toLowerCase() === ETHER.toLowerCase()
        ? parseEther(String(amount))
        : BigInt(0),
    [token0, weth, amount]
  );

  return useSimulateContract({
    ...Router,
    address: router,
    functionName: "swap",
    args: [
      amountIn,
      calculateMinOut(minAmountOut, slippage),
      routes,
      address ?? zeroAddress,
      deadline,
      true,
    ],
    value: msgValue,
    query: {
      enabled:
        !!address &&
        !!token0 &&
        !!token1 &&
        amount !== null &&
        address !== zeroAddress &&
        !needsApproval,
    },
  });
}

function calculateMinOut(amount: bigint, slippagePercentage: number) {
  const slippage = (Number(amount) * slippagePercentage) / 100;
  const minAmount = Number(amount) - slippage;
  return BigInt(minAmount);
}
