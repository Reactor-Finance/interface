import PoolHeader from "@/components/shared/poolHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePoolslistContext } from "@/contexts/poolsTvl";
import { TPoolType, TToken } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { formatUnits } from "viem";

interface Props {
  poolType: TPoolType;
  token0: TToken;
  token1: TToken;
}

export default function AvailablePoolRow({ poolType, token0, token1 }: Props) {
  const { pools } = usePoolslistContext();
  const isStable = poolType === TPoolType["STABLE"];
  const foundPools = pools.filter((pool) => {
    if (
      pool.token0.toLowerCase() === token0.address.toLowerCase() &&
      pool.token1.toLowerCase() === token1.address.toLowerCase()
    ) {
      if (pool.stable === isStable) return pool;
    }
    if (
      pool.token0.toLowerCase() === token1.address.toLowerCase() &&
      pool.token1.toLowerCase() === token0.address.toLowerCase()
    ) {
      if (pool.stable === isStable) return pool;
    }
  });
  console.log(foundPools);
  return (
    <Card bg="1000" className="grid py-3 grid-cols-6 text-sm">
      <div className="col-span-2">
        <PoolHeader token0={token0} token1={token1} poolType={poolType} />
      </div>
      <div className="flex flex-col">
        <span className="text-neutral-300">TVL</span>
        <span>
          {formatNumber(formatUnits(foundPools?.[0]?.tvlInUsd ?? 0n, 18))}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-neutral-300">APR</span>
        <span className="text-primary-400">0.00%</span>
      </div>
      <div className="flex flex-col">
        <span className="text-neutral-300">Volume</span>
        <span className="text-primary-400">
          {formatNumber(formatUnits(foundPools?.[0]?.volumeInUsd7D ?? 0n, 18))}
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
