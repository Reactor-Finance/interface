import React from "react";
import { useChainId, useReadContract } from "wagmi";
import { abi } from "@/lib/abis/Router";
import { ROUTER } from "@/data/constants";
import { formatUnits, zeroAddress } from "viem";
import { TPair } from "../../types";
import { TToken } from "@/lib/types";
import usePadLoading from "@/lib/hooks/usePadLoading";
import { StatRow } from "./statRow";

interface Props {
  amount: bigint;
  pairInfo: TPair;
  token0: TToken | undefined;
  token1: TToken | undefined;
  percent: string;
}

export default function WithdrawStats({
  token0,
  token1,
  amount,
  percent,
  pairInfo,
}: Props) {
  const chainId = useChainId();
  const {
    data,
    isLoading: quoteLoading,
    queryKey,
  } = useReadContract({
    abi,
    address: ROUTER[chainId],
    functionName: "quoteRemoveLiquidity",
    args: [
      pairInfo.token0 ?? zeroAddress,
      pairInfo.token1 ?? zeroAddress,
      pairInfo?.stable,
      amount,
    ],
  });
  console.log({ queryKey }, "quoteRemoveLiq queryKey!!");
  const isLoading = usePadLoading({ value: quoteLoading, duration: 400 });
  if (!token0 || !token1) return;
  return (
    <div className="space-y-2">
      <StatRow title="Withdraw" value={percent + "%"} />
      <StatRow
        title={`Withdrawing ${token0.symbol} `}
        value={formatUnits(data?.[0] ?? 0n, Number(token0.decimals) ?? 18)}
        isLoading={isLoading}
        formatNum
      />
      <StatRow
        formatNum
        title={`Withdrawing ${token1.symbol} `}
        value={formatUnits(data?.[1] ?? 0n, Number(token1.decimals) ?? 18)}
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
  );
}
