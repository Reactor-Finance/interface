import React from "react";
import { formatUnits } from "viem";
import { TPair } from "../../types";
import { TToken } from "@/lib/types";
import usePadLoading from "@/lib/hooks/usePadLoading";
import { StatRow } from "./statRow";
import useQuoteRemoveLiquidity from "../../__hooks__/useQuoteRemoveLiquidity";

interface Props {
  amount: bigint;
  pairInfo: TPair;
  token0: TToken | undefined;
  token1: TToken | undefined;
  percent: number;
}

export default function WithdrawStats({
  token0,
  token1,
  amount,
  percent,
  pairInfo,
}: Props) {
  const { data = [BigInt(0), BigInt(0)], isLoading: quoteLoading } =
    useQuoteRemoveLiquidity({
      token0: pairInfo.token0,
      token1: pairInfo.token1,
      isStable: pairInfo.stable,
      amount,
      enabled: true,
    });

  const isLoading = usePadLoading({ value: quoteLoading, duration: 400 });
  return (
    token0 &&
    token1 && (
      <div className="space-y-2">
        <StatRow title="Withdraw" value={String(percent) + "%"} />
        <StatRow
          title={`Withdrawing ${token0.symbol} `}
          value={formatUnits(data[0], Number(token0.decimals) ?? 18)}
          isLoading={isLoading}
          formatNum
        />
        <StatRow
          formatNum
          title={`Withdrawing ${token1.symbol} `}
          value={formatUnits(data[1], Number(token1.decimals) ?? 18)}
          isLoading={isLoading}
        />
        {/* <StatRow */}
        {/*   title={`Withdrawing ${selectedUserLiquidityPosition?.pair.token1.name} `} */}
        {/*   value={formatUnits( */}
        {/*     data?.[1] ?? 0n, */}
        {/*     Number(selectedUserLiquidityPosition?.pair.token0.decimals) ?? 18 */}
        {/*   )} */}
        {/* /> */}
      </div>
    )
  );
}
