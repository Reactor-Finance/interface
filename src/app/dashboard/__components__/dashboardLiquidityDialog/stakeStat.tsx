import React from "react";
import { StatRow } from "./statRow";
import { TToken } from "@/lib/types";
import { formatUnits } from "viem";
interface Props {
  action: "stake" | "unstake";
  percent: string;
  token0: TToken | undefined;
  token1: TToken | undefined;
  userTokens0: bigint;
  userTokens1: bigint;
}
export default function StakeStats({
  percent,
  token0,
  token1,
  userTokens0,
  userTokens1,
  action,
}: Props) {
  const a = (userTokens0 * BigInt(percent)) / 100n;
  const b = (userTokens1 * BigInt(percent)) / 100n;
  const verb = action === "stake" ? "To stake" : "To unstake";
  return (
    <div className="space-y-2">
      <StatRow
        title={action === "stake" ? "Stake" : "Unstake"}
        value={percent + "%"}
      />
      <StatRow
        title={verb + " " + token0?.symbol}
        value={`${formatUnits(a, token0?.decimals ?? 18)} ${token0?.symbol}`}
      />
      <StatRow
        title={verb + " " + token1?.symbol}
        value={`${formatUnits(b, token1?.decimals ?? 18)} ${token1?.symbol}`}
      />
    </div>
  );
}
