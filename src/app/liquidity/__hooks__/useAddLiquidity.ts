import { useAccount, useChainId, useSimulateContract } from "wagmi";
import { Contracts } from "@/lib/contracts";
import { TAddress } from "@/lib/types";
import { useLiquidityCardFormProvider } from "../add-liquidity/__components__/liquidityCard/liquidityCardFormProvider";
import { getAddress, parseUnits, zeroAddress } from "viem";
import { useMemo } from "react";
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
}

export function useAddLiquidity({
  token0,
  token1,
  stable,
  amountADesired,
  amountBDesired,
}: Props) {
  const chainId = useChainId();
  const { address = zeroAddress } = useAccount();
  const { transactionDeadlineInMinutes } = useSelector(
    (root: RootState) => root.settings
  );
  const router = useMemo(() => ROUTER[chainId], [chainId]);
  const liquidityETHNonETHToken = useMemo(
    () => (token0 !== ETHER ? token0 : token1),
    [token0, token1]
  );
  const amountDesiredLiquidityETH = useMemo(
    () => (token0 !== ETHER ? amountADesired : amountBDesired),
    [token0, amountADesired, amountBDesired]
  );
  const msgValueLiquidityETH = useMemo(
    () => (token0 !== ETHER ? amountBDesired : amountADesired),
    [token0, amountBDesired, amountADesired]
  );

  const deadline = useMemo(() => {
    const ttl =
      Math.floor(Date.now() / 1000) + transactionDeadlineInMinutes * 60;
    return () => BigInt(ttl);
  }, [transactionDeadlineInMinutes]);

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
      enabled: address !== zeroAddress,
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
      enabled: address !== zeroAddress,
    },
  });

  const isAddLiquidityETH = useMemo(
    () => token0 === ETHER || token1 === ETHER,
    [token0, token1]
  );
  const simulation = useMemo(
    () =>
      isAddLiquidityETH ? addLiquidityETHSimulation : addLiquiditySimulation,
    [isAddLiquidityETH, addLiquidityETHSimulation, addLiquiditySimulation]
  );

  return { simulation };
}
