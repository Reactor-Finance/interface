import PoolHeader from "@/components/shared/poolHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePoolslistContext } from "@/contexts/pairsProvider";
import { TPoolType, TToken } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { convertETHToWETHIfApplicable } from "@/utils";
import Link from "next/link";
import React, { useMemo } from "react";
import { formatUnits } from "viem";
import { useChainId } from "wagmi";

interface Props {
  poolType: TPoolType;
  token0: TToken;
  token1: TToken;
}

export default function AvailablePoolRow({ poolType, token0, token1 }: Props) {
  const chainId = useChainId();
  const { pools } = usePoolslistContext();
  const isStable = useMemo(() => poolType === TPoolType["STABLE"], [poolType]);
  const foundPool = useMemo(
    () =>
      pools.find((pool) => {
        return (
          ((convertETHToWETHIfApplicable(pool.token0, chainId) ===
            convertETHToWETHIfApplicable(token0.address, chainId) &&
            convertETHToWETHIfApplicable(pool.token1, chainId) ===
              convertETHToWETHIfApplicable(token1.address, chainId)) ||
            (convertETHToWETHIfApplicable(pool.token1, chainId) ===
              convertETHToWETHIfApplicable(token0.address, chainId) &&
              convertETHToWETHIfApplicable(pool.token0, chainId) ===
                convertETHToWETHIfApplicable(token1.address, chainId))) &&
          pool.stable === isStable
        );
      }),
    [pools, isStable, token0.address, token1.address]
  );
  return (
    <Card bg="1000" className="grid py-3 grid-cols-4 lg:grid-cols-6 text-sm">
      <div className="col-span-2">
        <PoolHeader token0={token0} token1={token1} poolType={poolType} />
      </div>
      <div className=" flex-col hidden lg:flex">
        <span className="text-neutral-300">TVL</span>
        <span>{formatNumber(formatUnits(foundPool?.tvl ?? 0n, 18))}</span>
      </div>
      <div className=" flex-col hidden lg:flex">
        <span className="text-neutral-300">APR</span>
        <span className="text-primary-400">
          {formatUnits(foundPool?.emissions ?? 0n, 18)}%
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-neutral-300">Volume</span>
        <span className="text-primary-400">
          {formatNumber(formatUnits(foundPool?.volume24hr ?? 0n, 18))}
        </span>
      </div>
      <div className="flex justify-end items-center">
        <Link
          href={`/liquidity/add-liquidity?token0=${token0.address}&token1=${token1.address}&version=${convertPoolTypeToString(poolType)}`}
        >
          <Button size="md" variant="filled">
            Deposit
          </Button>
        </Link>
      </div>
    </Card>
  );
}

function convertPoolTypeToString(poolType: TPoolType) {
  switch (poolType) {
    case TPoolType["STABLE"]:
      return "stable";
    case TPoolType["VOLATILE"]:
      return "volatile";
    case TPoolType["CONCENTRATED"]:
      return "concentrated";
  }
}
