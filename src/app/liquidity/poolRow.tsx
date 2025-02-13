"use client";
import CurrenciesOverlapIcons from "@/components/shared/currenciesOverlapIcons";
import PoolHeader from "@/components/shared/poolHeader";
import { Button } from "@/components/ui/button";
import { TableRow } from "@/components/ui/table";
import { TPoolType } from "@/lib/types";
import { TPool } from "@/server/queries/pools";
import { getAddress } from "viem";
import React from "react";
import { useRouter } from "next/navigation";

export default function PoolRow({ token0, token1, volumeUSD }: TPool) {
  const router = useRouter();
  const tokenOneAddress = getAddress(token0.id);
  const tokenTwoAddress = getAddress(token1.id);
  const addLiquidityHandler = () => {
    router.push(
      `/liquidity/add-liquidity?tokenOne=${tokenOneAddress}&tokenTwo=${tokenTwoAddress}&version=${token0.pairBase[0].isStable ? "stable" : "volatile"}`
    );
  };
  return (
    <TableRow>
      <th className="col-span-4 text-left">
        <PoolHeader
          tokenOne={{
            address: getAddress(tokenOneAddress),
            symbol: token0.symbol,
          }}
          tokenTwo={{
            address: getAddress(tokenTwoAddress),
            symbol: token1.symbol,
          }}
          poolType={
            token0.pairBase[0].isStable ? TPoolType.STABLE : TPoolType.VOLATILE
          }
        />
      </th>
      <th className="">$5,505,444</th>
      <th className="text-blue-light">11%</th>
      <th>{volumeUSD}</th>
      <th>43,444</th>
      <th className="text-left col-span-3 ">
        <div className="flex justify-between">
          <span></span>
          <Button variant="filled" onClick={addLiquidityHandler}>
            <div className="flex items-center gap-x-1">
              <span>Add</span>
              <CurrenciesOverlapIcons
                size="sm"
                tokenOne={{
                  alt: token0.symbol,
                  address: getAddress(tokenOneAddress),
                }}
                tokenTwo={{
                  alt: token1.symbol,
                  address: getAddress(tokenTwoAddress),
                }}
              />
            </div>
          </Button>
        </div>
      </th>
    </TableRow>
  );
}
