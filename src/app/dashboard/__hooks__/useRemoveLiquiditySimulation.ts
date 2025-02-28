import { ROUTER } from "@/data/constants";
import { abi } from "@/lib/abis/Router";
import { getAddress } from "viem";
import { useAccount, useChainId, useSimulateContract } from "wagmi";
export default function useRemoveLiquiditySimulation({
  amount,
  token0,
  token1,
  isStable,
  enabled,
}: {
  amount: bigint;
  token0: string | undefined;
  token1: string | undefined;
  isStable: boolean | undefined;
  enabled: boolean;
}) {
  const { address } = useAccount();
  const chainId = useChainId();
  const t0 = token0 ? getAddress(token0) : undefined;
  const t1 = token1 ? getAddress(token1) : undefined;
  const removeLiquiditySimulation = useSimulateContract({
    abi,
    address: ROUTER[chainId],
    functionName: "removeLiquidity",
    args: [
      t0 ?? "0x",
      t1 ?? "0x",
      !!isStable,
      amount, // liquidity
      0n, //amountBMin
      0n, //amountBMin
      address ?? "0x",
      0n, //deadline
    ],
    query: { enabled },
  });

  const removeLiquidityEthSimulation = useSimulateContract({
    abi,
    address: ROUTER[chainId],
    functionName: "removeLiquidityETH",
    args: [
      t0 ?? "0x",
      !!isStable,
      amount, // liquidity
      0n, //amountAMin
      0n, //amountETHMin
      address ?? "0x",
      0n, //deadline
      false, //withFeeOnTransferTokens
    ],
    query: { enabled },
  });
  return { removeLiquiditySimulation, removeLiquidityEthSimulation };
}
