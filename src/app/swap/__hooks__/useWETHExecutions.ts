import { ETHER, WETH } from "@/data/constants";
import { TToken } from "@/lib/types";
import * as Weth from "@/lib/abis/WETH";
import { useMemo } from "react";
import { useChainId, useSimulateContract } from "wagmi";
import { parseEther } from "viem";

export function useWETHExecutions({
  token0,
  token1,
  amount = 0,
}: {
  amount?: number;
  token0: TToken | null;
  token1: TToken | null;
}) {
  const chainId = useChainId();
  const weth = useMemo(() => WETH[chainId], [chainId]);
  const isIntrinsicWETHProcess = useMemo(
    () =>
      (token0?.address.toLowerCase() === weth.toLowerCase() &&
        token1?.address.toLowerCase() === ETHER.toLowerCase()) ||
      (token0?.address.toLowerCase() === ETHER.toLowerCase() &&
        token1?.address.toLowerCase() === weth.toLowerCase()),
    [weth, token0?.address, token1?.address]
  );
  const isWETHToEther = useMemo(
    () => token0?.address === weth,
    [weth, token0?.address]
  );

  const depositSimulation = useSimulateContract({
    ...Weth,
    address: weth,
    functionName: "deposit",
    value: parseEther(String(amount)),
    args: [],
    query: {
      enabled: !!token0 && !!token1 && amount !== null,
    },
  });

  const withdrawalSimulation = useSimulateContract({
    ...Weth,
    address: weth,
    functionName: "withdraw",
    args: [parseEther(String(amount))],
    query: {
      enabled: !!token0 && !!token1 && amount !== null,
    },
  });

  const WETHProcessSimulation = useMemo(() => {
    return { withdrawalSimulation, depositSimulation };
  }, [withdrawalSimulation, depositSimulation]);

  const isToken0 = weth === token0?.address;

  return {
    isToken0,
    isIntrinsicWETHProcess,
    WETHProcessSimulation,
    withdrawalSimulation,
    isWETHToEther,
  };
}
