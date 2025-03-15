import * as Router from "@/lib/abis/Router";
import { useAccount, useChainId, useSimulateContract } from "wagmi";
import { useMemo } from "react";
import { parseEther, parseUnits, zeroAddress } from "viem";
import * as Weth from "@/lib/abis/WETH";
import { ETHER, ROUTER, SLIPPAGE_ZEROS, WETH } from "@/data/constants";
import { TToken } from "@/lib/types";
import { useAtomicDate } from "@/lib/hooks/useAtomicDate";
import { useAtom } from "jotai/react";
import { multiHopsAtom, slippageAtom, transactionDeadlineAtom } from "@/store";
import { useMutation } from "@tanstack/react-query";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { wagmiConfig } from "@/app/providers";
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
}: {
  amount: string;
  token0: TToken | null;
  token1: TToken | null;
  minAmountOut?: bigint;
  needsApproval: boolean;
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
              to: token1?.address ?? zeroAddress,
              stable: false,
            },
          ],
    [multihops, token0?.address, token1?.address, weth]
  );
  const deadline = useMemo(() => {
    const ttl = Math.floor(now.getTime() / 1000) + Number(txDeadline) * 60;
    return BigInt(ttl);
  }, [now, txDeadline]);
  const isEth = useMemo(
    () => token0?.address.toLowerCase() === ETHER.toLowerCase(),
    [token0?.address]
  );
  const msgValue = useMemo(
    () => (isEth ? parseEther(String(amount)) : BigInt(0)),
    [isEth, amount]
  );

  const mutate = useMutation({
    mutationFn: async () => {
      console.log("IN HERE");
      const depositSimulation = await simulateContract(wagmiConfig, {
        ...Weth,
        address: weth,
        functionName: "deposit",
        value: parseEther(String(amount)),
        args: [],
      });
      const hashWrap = await writeContract(
        wagmiConfig,
        depositSimulation.request
      );
      const a = await waitForTransactionReceipt(wagmiConfig, {
        hash: hashWrap,
      });
      if (a.status === "reverted") return a;
      console.log(minAmountOut, amountIn);
      const req = await simulateContract(wagmiConfig, {
        ...Router,
        address: router,
        functionName: "swap",
        args: [
          isEth ? BigInt(0n) : amountIn,
          calculateMinOut(minAmountOut, Number(slippage)),
          routes,
          address ?? zeroAddress,
          deadline,
          true,
        ],
        value: msgValue,
      });
      console.log({ mutate });
      const hash = await writeContract(wagmiConfig, req.request);
      const b = waitForTransactionReceipt(wagmiConfig, { hash });
      return b;
    },
  });
  const swapSimulation = useSimulateContract({
    ...Router,
    address: router,
    functionName: "swap",
    args: [
      amountIn,
      calculateMinOut(minAmountOut, Number(slippage)),
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
        amount !== "" &&
        address !== zeroAddress &&
        !needsApproval,
    },
  });
  return {
    swapSimulation,

    wrapSwapMutation: mutate,
  };
}

function calculateMinOut(amount: bigint, slippagePercentage: number) {
  const slippage = (amount * BigInt(slippagePercentage)) / SLIPPAGE_ZEROS;
  const minAmount = amount - slippage;
  return BigInt(minAmount);
}
