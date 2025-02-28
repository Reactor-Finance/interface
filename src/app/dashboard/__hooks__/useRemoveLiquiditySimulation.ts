import { ROUTER } from "@/data/constants";
import { abi } from "@/lib/abis/Router";
import { TToken } from "@/lib/types";
import { Address } from "viem";
import { useAccount, useChainId, useSimulateContract } from "wagmi";
export default function useRemoveLiquiditySimulation({
  amount,
  token0,
  token1,
  isStable,
}: {
  amount: bigint;
  pairAddress: Address | undefined;
  token0: TToken;
  token1: TToken;
  isStable: boolean;
}) {
  const { address } = useAccount();
  const chainId = useChainId();
  const removeLiquiditySimulation = useSimulateContract({
    abi,
    address: ROUTER[chainId],
    functionName: "removeLiquidity",
    args: [
      token0.address,
      token1.address,
      isStable,
      amount, // liquidity
      0n, //amountBMin
      0n, //amountBMin
      address ?? "0x",
      0n, //deadline
    ],
  });

  const removeLiquidityEthSimulation = useSimulateContract({
    abi,
    address: ROUTER[chainId],
    functionName: "removeLiquidityETH",
    args: [
      token0.address,
      isStable,
      amount, // liquidity
      0n, //amountAMin
      0n, //amountETHMin
      address ?? "0x",
      0n, //deadline
      false, //withFeeOnTransferTokens
    ],
  });
  return { removeLiquiditySimulation, removeLiquidityEthSimulation };
}
