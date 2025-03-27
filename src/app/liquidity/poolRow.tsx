import CurrenciesOverlapIcons from "@/components/shared/currenciesOverlapIcons";
import PoolHeader from "@/components/shared/poolHeader";
import { Button } from "@/components/ui/button";
import { TableRow } from "@/components/ui/table";
import { TPoolType } from "@/lib/types";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTokenlistContext } from "@/contexts/tokenlistContext";
import { formatNumber } from "@/lib/utils";
import { formatEther } from "viem";
import { TPoolExtended } from "@/contexts/pairsProvider";

export default function PoolRow({
  stable,
  token0,
  token1,
  emissions,
  tvl,
  fees,
  volume24hr,
  reserve0,
  reserve1,
  ...poolData
}: TPoolExtended) {
  const router = useRouter();
  const { tokenlist } = useTokenlistContext();
  const t0 = useMemo(
    () =>
      tokenlist.find(
        (token) => token.address.toLowerCase() === token0.toLowerCase()
      ),
    [tokenlist, token0]
  );
  const t1 = useMemo(
    () =>
      tokenlist.find(
        (token) => token.address.toLowerCase() === token1.toLowerCase()
      ),
    [tokenlist, token1]
  );

  const addLiquidityHandler = useCallback(() => {
    router.push(
      `/liquidity/add-liquidity?token0=${t0?.address}&token1=${t1?.address}&version=${stable ? "stable" : "volatile"}`
    );
  }, [router, stable, t0?.address, t1?.address]);

  return (
    <TableRow cols="11" mobileCols={"6"}>
      <th className="lg:col-span-4  col-span-3 text-left">
        {!!t0 && !!t1 && (
          <PoolHeader
            token0={t0}
            token1={t1}
            poolType={stable ? TPoolType.STABLE : TPoolType.VOLATILE}
            _data={{
              reserve0,
              reserve1,
              emissions,
              token0,
              token1,
              stable,
              ...poolData,
            }}
          />
        )}
      </th>
      <th className="">${formatNumber(formatEther(tvl))}</th>
      <th className="text-blue-light hidden lg:block">
        {formatNumber(formatEther(emissions))}%
      </th>
      <th className="hidden lg:block">${fees}</th>
      <th>${formatNumber(formatEther(volume24hr))}</th>
      <th className="text-left pl-4  lg:col-span-3 ">
        <div className="flex justify-between">
          <span></span>
          <Button
            className="group-hover:bg-neutral-[#303136] hover:bg-[#43444C]"
            onClick={addLiquidityHandler}
          >
            <div className="flex items-center gap-x-1">
              <span>Add</span>
              {!!t0 && !!t1 && (
                <CurrenciesOverlapIcons size="sm" token0={t0} token1={t1} />
              )}
            </div>
          </Button>
        </div>
      </th>
    </TableRow>
  );
}
