import CurrenciesOverlapIcons from "@/components/shared/currenciesOverlapIcons";
import PoolHeader from "@/components/shared/poolHeader";
import { Button } from "@/components/ui/button";
import { TableRow } from "@/components/ui/table";
import { TPoolType } from "@/lib/types";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { TPool } from "@/server/queries/pools/getPools";
import { useTokenlistContext } from "@/contexts/tokenlistContext";

export default function PoolRow({
  isStable,
  token0,
  token1,
  volumeUSD,
}: TPool) {
  const router = useRouter();
  const { tokenlist } = useTokenlistContext();
  const t0 = useMemo(
    () =>
      tokenlist.find(
        (token) => token.address.toLowerCase() === token0.id.toLowerCase()
      ),
    [tokenlist, token0]
  );
  const t1 = useMemo(
    () =>
      tokenlist.find(
        (token) => token.address.toLowerCase() === token1.id.toLowerCase()
      ),
    [tokenlist, token1]
  );

  const addLiquidityHandler = useCallback(() => {
    router.push(
      `/liquidity/add-liquidity?token0=${t0?.address}&token1=${t1?.address}&version=${isStable ? "stable" : "volatile"}`
    );
  }, [router, t0?.address, t1?.address, isStable]);

  return (
    <TableRow>
      <th className="col-span-4 text-left">
        {!!t0 && !!t1 && (
          <PoolHeader
            token0={t0}
            token1={t1}
            poolType={isStable ? TPoolType.STABLE : TPoolType.VOLATILE}
          />
        )}
      </th>
      <th className="">$5,505,444</th>
      <th className="text-blue-light">11%</th>
      <th>{volumeUSD}</th>
      <th>43,444</th>
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
