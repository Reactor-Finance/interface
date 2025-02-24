import PoolHeader from "@/components/shared/poolHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TPoolType, TToken } from "@/lib/types";
import Link from "next/link";
import React from "react";
interface Props {
  poolType: TPoolType;
  token0: TToken;
  token1: TToken;
}
export default function AvailablePoolRow({ poolType, token0, token1 }: Props) {
  return (
    <Card bg="1000" className="grid py-3 grid-cols-6 text-sm">
      <div className="col-span-2">
        <PoolHeader token0={token0} token1={token1} poolType={poolType} />
      </div>
      <div className="flex flex-col">
        <span className="text-neutral-300">TVL</span>
        <span>$0.00</span>
      </div>
      <div className="flex flex-col">
        <span className="text-neutral-300">APR</span>
        <span className="text-primary-400">0.00%</span>
      </div>
      <div className="flex flex-col">
        <span className="text-neutral-300">Volume</span>
        <span className="text-primary-400">$0.00</span>
      </div>
      <div className="flex justify-end items-center">
        <Link
          href={`/liquidity/add-liquidity?tokenOne=${token0.address}&tokenTwo=${token1.address}&version=${convertPoolTypeToString(poolType)}`}
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
