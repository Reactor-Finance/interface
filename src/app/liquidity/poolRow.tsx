import CurrenciesOverlapIcons from "@/components/shared/currenciesOverlapIcons";
import PoolHeader from "@/components/shared/poolHeader";
import { Button } from "@/components/ui/button";
import { TableRow } from "@/components/ui/table";
import { TPoolType } from "@/lib/types";
import { Address, getAddress } from "viem";
import React from "react";
import { useRouter } from "next/navigation";
import { TPool } from "@/server/queries/pools/getPools";
import { getLogoAsset } from "@/utils";

export default function PoolRow({
  isStable,
  token0,
  token1,
  volumeUSD,
}: TPool) {
  const router = useRouter();
  const tokenOneAddress = getAddress(token0.id);
  const tokenTwoAddress = getAddress(token1.id);
  const addLiquidityHandler = () => {
    router.push(
      `/liquidity/add-liquidity?tokenOne=${tokenOneAddress}&tokenTwo=${tokenTwoAddress}&version=${isStable ? "stable" : "volatile"}`
    );
  };
  return (
    <TableRow>
      <th className="col-span-4 text-left">
        <PoolHeader
          token0={{
            address: getAddress(tokenOneAddress),
            symbol: token0.symbol,
            decimals: parseInt(token0.decimals),
            logoURI: "",
            name: "",
            chainId: 1,
          }}
          token1={{
            address: getAddress(tokenTwoAddress),
            symbol: token1.symbol,
            decimals: parseInt(token1.decimals),
            logoURI: "",
            name: "",
            chainId: 1,
          }}
          poolType={isStable ? TPoolType.STABLE : TPoolType.VOLATILE}
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
                token0={{
                  address: getAddress(tokenOneAddress),
                  symbol: token0.symbol,
                  decimals: parseInt(token1.decimals),
                  logoURI: getLogoAsset(token1.id as Address),
                  name: "",
                  chainId: 1,
                }}
                token1={{
                  address: getAddress(tokenTwoAddress),
                  symbol: token1.symbol,
                  decimals: parseInt(token1.decimals),
                  logoURI: getLogoAsset(token1.id as Address),
                  name: "",
                  chainId: 1,
                }}
              />
            </div>
          </Button>
        </div>
      </th>
    </TableRow>
  );
}
