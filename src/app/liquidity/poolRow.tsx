import CurrenciesOverlapIcons from "@/components/shared/currenciesOverlapIcons";
import PoolHeader from "@/components/shared/poolHeader";
import { Button } from "@/components/ui/button";
import { TableRow } from "@/components/ui/table";
import { TPoolData, TPoolType } from "@/lib/types";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTokenlistContext } from "@/contexts/tokenlistContext";
import { formatNumber } from "@/lib/utils";
import { Address, formatEther } from "viem";
import { useGetMarketQuote } from "@/lib/hooks/useGetMarketQuote";

export default function PoolRow({
  stable,
  token0,
  token1,
  emissions,
  reserve0,
  reserve1,
  ...poolData
}: TPoolData) {
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

  const { quote: marketQuote0 } = useGetMarketQuote({
    tokenAddress: token0 as Address,
    value: reserve0,
  });
  const { quote: marketQuote1 } = useGetMarketQuote({
    tokenAddress: token1 as Address,
    value: reserve1,
  });
  const volumeUSD = useMemo(
    () => marketQuote0[0] + marketQuote1[0],
    [marketQuote0, marketQuote1]
  );

  const addLiquidityHandler = useCallback(() => {
    router.push(
      `/liquidity/add-liquidity?token0=${t0?.address}&token1=${t1?.address}&version=${stable ? "stable" : "volatile"}`
    );
  }, [router, stable, t0?.address, t1?.address]);

  return (
    <TableRow>
      <th className="col-span-4 text-left">
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
      <th className="">${formatNumber(formatEther(volumeUSD))}</th>
      <th className="text-blue-light">
        {formatNumber(formatEther(emissions))}%
      </th>
      <th>{}</th>
      <th>{}</th>
      <th className="text-left pl-4 col-span-3 ">
        <div className="flex justify-between">
          <span></span>
          <Button variant="filled" onClick={addLiquidityHandler}>
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
