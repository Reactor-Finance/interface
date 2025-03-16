import PoolHeader from "@/components/shared/poolHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePoolslistContext } from "@/contexts/poolsTvl";
import { ChainId, WETH } from "@/data/constants";
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

function checkMonAddr(addr: string) {
  if (
    addr.toLowerCase() ===
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase()
  ) {
    return WETH[ChainId.MONAD_TESTNET];
  } else {
    return addr;
  }
}
export default function AvailablePoolRow({ poolType, token0, token1 }: Props) {
  const { pools } = usePoolslistContext();
  const isStable = poolType === TPoolType["STABLE"];
  const foundPools = pools.filter((pool) => {
    console.log({
      token0: checkMonAddr(token0.address),
      token1: checkMonAddr(token1.address),
      pToken0: checkMonAddr(pool.token0),
      pToken1: checkMonAddr(pool.token1),
      symbol0: token0.symbol,
      symbol1: token1.symbol,
      pSymbol0: pool.token0_symbol,
      pSymbol1: pool.token1_symbol,
      pool: pool.tvlInUsd,
      bool:
        checkMonAddr(pool.token0.toLowerCase()) ===
          checkMonAddr(token0.address.toLowerCase()) &&
        checkMonAddr(pool.token1.toLowerCase()) ===
          checkMonAddr(token1.address.toLowerCase()),

      bool2:
        checkMonAddr(pool.token0.toLowerCase()) ===
          checkMonAddr(token1.address.toLowerCase()) &&
        checkMonAddr(pool.token1.toLowerCase()) ===
          checkMonAddr(token0.address.toLowerCase()),
    });
    if (
      checkMonAddr(pool.token0.toLowerCase()) ===
        checkMonAddr(token0.address.toLowerCase()) &&
      checkMonAddr(pool.token1.toLowerCase()) ===
        checkMonAddr(token1.address.toLowerCase())
    ) {
      if (pool.stable === isStable) return true;
    }
    if (
      checkMonAddr(pool.token0.toLowerCase()) ===
        checkMonAddr(token1.address.toLowerCase()) &&
      checkMonAddr(pool.token1.toLowerCase()) ===
        checkMonAddr(token0.address.toLowerCase())
    ) {
      if (pool.stable === isStable) return true;
    }
  });
  console.log(foundPools);
  return (
    <Card bg="1000" className="grid py-3 grid-cols-4 lg:grid-cols-6 text-sm">
      <div className="col-span-2">
        <PoolHeader token0={token0} token1={token1} poolType={poolType} />
      </div>
      <div className=" flex-col hidden lg:flex">
        <span className="text-neutral-300">TVL</span>
        <span>
          {formatNumber(formatUnits(foundPools?.[0]?.tvlInUsd ?? 0n, 18))}
        </span>
      </div>
      <div className=" flex-col hidden lg:flex">
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
