import { useAccount, useChainId, useSimulateContract } from "wagmi";
import { zeroAddress } from "viem";
import { useEffect, useMemo } from "react";
import { ETHER, ROUTER, SLIPPAGE_ZEROS } from "@/data/constants";
import * as Router from "@/lib/abis/Router";
import { useAtomicDate } from "@/lib/hooks/useAtomicDate";
import { useAtom } from "jotai/react";
import { slippageAtom, transactionDeadlineAtom } from "@/store";

interface Props {
  token0: `0x${string}`;
  token1: `0x${string}`;
  stable: boolean;
  amountADesired: bigint;
  amountBDesired: bigint;
  disabled: boolean;
}

export function useAddLiquidity({
  token0,
  token1,
  stable,
  amountADesired,
  amountBDesired,
  disabled,
}: Props) {
  const chainId = useChainId();
  const now = useAtomicDate();
  const { address = zeroAddress } = useAccount();
  const [txDeadline] = useAtom(transactionDeadlineAtom);
  const router = useMemo(() => ROUTER[chainId], [chainId]);
  const liquidityETHNonETHToken = useMemo(
    () => (token0.toLowerCase() !== ETHER.toLowerCase() ? token0 : token1),
    [token0, token1]
  );
  const amountDesiredLiquidityETH = useMemo(
    () =>
      token0.toLowerCase() !== ETHER.toLowerCase()
        ? amountADesired
        : amountBDesired,
    [token0, amountADesired, amountBDesired]
  );
  const msgValueLiquidityETH = useMemo(
    () =>
      token0.toLowerCase() !== ETHER.toLowerCase()
        ? amountBDesired
        : amountADesired,
    [token0, amountBDesired, amountADesired]
  );

  const isAddLiquidityETH = useMemo(
    () =>
      token0.toLowerCase() === ETHER.toLowerCase() ||
      token1.toLowerCase() === ETHER.toLowerCase(),
    [token0, token1]
  );
  const deadline = useMemo(() => {
    const ttl = Math.floor(now.getTime() / 1000) + Number(txDeadline) * 60;
    return BigInt(ttl);
  }, [now, txDeadline]);
  const [slippage] = useAtom(slippageAtom);
  const minOutA =
    amountADesired - (amountADesired * BigInt(slippage)) / SLIPPAGE_ZEROS;
  const minOutB =
    amountBDesired - (amountBDesired * BigInt(slippage)) / SLIPPAGE_ZEROS;
  const { ethSlippage, tokenSlippage } = useMemo(
    () =>
      token0.toLowerCase() === ETHER.toLowerCase()
        ? { ethSlippage: minOutA, tokenSlippage: minOutB }
        : { ethSlippage: minOutB, tokenSlippage: minOutA },
    [token0, minOutA, minOutB]
  );
  const addLiquidityETHSimulation = useSimulateContract({
    ...Router,
    address: router,
    functionName: "addLiquidityETH",
    args: [
      liquidityETHNonETHToken,
      stable,
      amountDesiredLiquidityETH,
      tokenSlippage, //minOutB
      ethSlippage, //minOutA
      address,
      deadline,
    ],
    value: msgValueLiquidityETH,
    query: {
      enabled: address !== zeroAddress && !disabled && isAddLiquidityETH,
    },
  });

  const addLiquiditySimulation = useSimulateContract({
    ...Router,
    address: router,
    functionName: "addLiquidity",
    args: [
      token0,
      token1,
      stable,
      amountADesired,
      amountBDesired,
      minOutA, //minOutA
      minOutB, //minOutB
      address,
      deadline,
    ],
    query: {
      enabled: address !== zeroAddress && !disabled && !isAddLiquidityETH,
    },
  });

  useEffect(() => {
    if (addLiquidityETHSimulation.data || addLiquidityETHSimulation.error) {
      console.log(addLiquidityETHSimulation.error);
      console.log(addLiquidityETHSimulation.data);
    }
  }, [addLiquidityETHSimulation]);

  useEffect(() => {
    if (addLiquiditySimulation.data || addLiquiditySimulation.error) {
      if (addLiquiditySimulation.error)
        console.error(addLiquiditySimulation.error);

      console.log(addLiquiditySimulation.data);
    }
  }, [addLiquiditySimulation]);

  return {
    addLiquiditySimulation,
    addLiquidityETHSimulation,
    isAddLiquidityETH,
  };
}
