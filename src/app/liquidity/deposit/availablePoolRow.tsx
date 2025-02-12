import PoolHeader from "@/components/shared/poolHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TPoolType, TToken } from "@/lib/types";
import Link from "next/link";
import React from "react";
interface Props {
  poolType: TPoolType;
  tokenOne: TToken;
  tokenTwo: TToken;
}
export default function AvailablePoolRow({
  poolType,
  tokenOne,
  tokenTwo,
}: Props) {
  return (
    <Card bg="1000" className="grid py-3 grid-cols-6 text-sm">
      <div className="col-span-2">
        <PoolHeader
          tokenOne={tokenOne}
          tokenTwo={tokenTwo}
          poolType={poolType}
        />
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
          href={`/liquidity/add-liquidity?tokenOne=${tokenOne.address}&tokenTwo=${tokenTwo.address}&version=${convertPoolTypeToString(poolType)}`}
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
    case 0:
      return "stable";
    case 1:
      return "volatile";
    case 2:
      return "concentrated";
  }
}
