import React from "react";
import CurrenciesOverlapIcons from "./currenciesOverlapIcons";
import { Badge } from "../ui/badge";
import { TAddress, TPoolType } from "@/lib/types";
interface Props {
  poolType: TPoolType;
  tokenOne: TAddress;
  tokenTwo: TAddress;
}
export default function PoolHeader({ poolType, tokenOne, tokenTwo }: Props) {
  return (
    <div className="flex gap-x-4 items-center">
      <span>1</span>
      <div className="flex gap-x-2 items-center">
        <CurrenciesOverlapIcons
          tokenOne={{
            alt: "",
            address: tokenOne,
          }}
          tokenTwo={{
            alt: "",
            address: tokenTwo,
          }}
        />
        <div>
          <h4>vAMM-ETH/USDC</h4>
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
