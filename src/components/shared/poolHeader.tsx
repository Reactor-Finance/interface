import React from "react";
import CurrenciesOverlapIcons from "./currenciesOverlapIcons";
import { Badge } from "../ui/badge";
import { TPoolType, TToken } from "@/lib/types";

interface Props {
  poolType: TPoolType;
  token0: TToken;
  token1: TToken;
  number?: string;
}

export default function PoolHeader({
  poolType,
  token0,
  token1,
  number,
}: Props) {
  return (
    <div className="flex gap-x-4 items-center">
      {number && <span>{number}</span>}
      <div className="flex gap-x-2 items-center">
        <CurrenciesOverlapIcons token0={token0} token1={token1} />
        <div>
          <h4>
            {`${poolType === TPoolType.STABLE ? "sAMM" : "vAMM"}`}-
            {token0.symbol}/{token1.symbol}
          </h4>
          <div className="space-x-1">
            <PoolBadge poolType={poolType} />
            <Badge border="one" colors="neutral">
              0.3%
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
function PoolBadge({ poolType }: { poolType: TPoolType }) {
  if (poolType === TPoolType.STABLE) {
    return <Badge colors="success">Stable</Badge>;
  }
  if (poolType === TPoolType.CONCENTRATED) {
    return <Badge colors="primary">Concentrated</Badge>;
  }
  if (poolType === TPoolType.VOLATILE) {
    return <Badge colors="yellow">Volatile</Badge>;
  }
}
