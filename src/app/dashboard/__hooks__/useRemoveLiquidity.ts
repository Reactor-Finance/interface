import { ROUTER, WETH } from "@/data/constants";
import * as Router from "@/lib/abis/Router";
import { useAtomicDate } from "@/lib/hooks/useAtomicDate";
import { RootState } from "@/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Address, zeroAddress } from "viem";
import { useAccount, useChainId, useSimulateContract } from "wagmi";

export function useRemoveLiquidity({
  token0,
  token1,
  isStable,
  amount,
}: {
  amount: bigint;
  token0: Address;
  token1: Address;
  isStable: boolean;
}) {
  const { address = zeroAddress } = useAccount();
  const chainId = useChainId();
  const now = useAtomicDate();
  const { transactionDeadlineInMinutes } = useSelector(
    (state: RootState) => state.settings
  );
  const router = useMemo(() => ROUTER[chainId], [chainId]);
  const weth = useMemo(() => WETH[chainId], [chainId]);
  const nonETHToken = useMemo(
    () =>
      weth.toLowerCase() === token0.toLowerCase()
        ? token1
        : weth.toLowerCase() === token1.toLowerCase()
          ? token0
          : zeroAddress,
    [weth, token0, token1]
  );

  const deadline = useMemo(() => {
    const ttl =
      Math.floor(now.getTime() / 1000) + transactionDeadlineInMinutes * 60;
    return BigInt(ttl);
  }, [now, transactionDeadlineInMinutes]);

  const removeLiquiditySimulation = useSimulateContract({
    ...Router,
    address: router,
    functionName: "removeLiquidity",
    args: [
      token0,
      token1,
      isStable,
      amount, // liquidity
      0n, //amountBMin
      0n, //amountBMin
      address,
      deadline, //deadline
    ],
    query: { enabled: true },
  });

  const removeLiquidityEthSimulation = useSimulateContract({
    ...Router,
    address: router,
    functionName: "removeLiquidityETH",
    args: [
      nonETHToken,
      isStable,
      amount, // liquidity
      0n, //amountAMin
      0n, //amountETHMin
      address,
      deadline, //deadline
      true, //withFeeOnTransferTokens
    ],
    query: { enabled: true },
  });
  return { removeLiquiditySimulation, removeLiquidityEthSimulation };
}
