import { useAccount, useChainId, useSimulateContract } from "wagmi";
import { zeroAddress } from "viem";
import { useEffect, useMemo } from "react";
import { ETHER, ROUTER } from "@/data/constants";
import * as Router from "@/lib/abis/Router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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
  const { address = zeroAddress } = useAccount();
  const { transactionDeadlineInMinutes } = useSelector(
    (root: RootState) => root.settings
  );
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

  const deadline = useMemo(() => {
    const ttl =
      Math.floor(Date.now() / 1000) + transactionDeadlineInMinutes * 60;
    return () => BigInt(ttl);
  }, [transactionDeadlineInMinutes]);
  const isAddLiquidityETH = useMemo(
    () =>
      token0.toLowerCase() === ETHER.toLowerCase() ||
      token1.toLowerCase() === ETHER.toLowerCase(),
    [token0, token1]
  );
  const addLiquidityETHSimulation = useSimulateContract({
    ...Router,
    address: router,
    functionName: "addLiquidityETH",
    args: [
      liquidityETHNonETHToken,
      stable,
      amountDesiredLiquidityETH,
      BigInt(0),
      BigInt(0),
      address,
      deadline(),
    ],
    value: msgValueLiquidityETH,
    query: {
      enabled: address !== zeroAddress && isAddLiquidityETH && !disabled,
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
      BigInt(0),
      BigInt(0),
      address,
      deadline(),
    ],
    query: {
      enabled: address !== zeroAddress && !isAddLiquidityETH && !disabled,
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
      console.log(addLiquiditySimulation.error);
      console.log(addLiquiditySimulation.data);
    }
  }, [addLiquiditySimulation]);

  return {
    addLiquiditySimulation,
    addLiquidityETHSimulation,
    isAddLiquidityETH,
  };
}
