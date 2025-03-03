import React from "react";
import { useChainId, useReadContract } from "wagmi";
import { abi } from "@/lib/abis/Router";
import { ROUTER } from "@/data/constants";
import { Address, formatUnits, zeroAddress } from "viem";
import { useDashboardLiquidityProvider } from "../../__context__/dashboardLiquidityProvider";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
export default function WithdrawStats() {
  const { selectedUserLiquidityPosition, state } =
    useDashboardLiquidityProvider();
  const amountPercent = state.sliderValue;
  const a = useGetBalance({
    tokenAddress: selectedUserLiquidityPosition?.pair.id as Address,
  });
  const amount = (a * BigInt(amountPercent)) / 100n;
  const chainId = useChainId();
  const token0Addr = selectedUserLiquidityPosition?.pair.token0.id as
    | Address
    | undefined;
  const token1Addr = selectedUserLiquidityPosition?.pair.token1.id as
    | Address
    | undefined;
  const { data } = useReadContract({
    abi,
    address: ROUTER[chainId],
    functionName: "quoteRemoveLiquidity",
    args: [
      token0Addr ?? zeroAddress,
      token1Addr ?? zeroAddress,
      !!selectedUserLiquidityPosition?.pair.isStable,
      amount,
    ],
  });
  return (
    <div>
      <StatRow
        title={`Withdrawing ${selectedUserLiquidityPosition?.pair.token0.name} `}
        value={formatUnits(
          data?.[0] ?? 0n,
          Number(selectedUserLiquidityPosition?.pair.token0.decimals) ?? 18
        )}
      />
      <StatRow
        title={`Withdrawing ${selectedUserLiquidityPosition?.pair.token1.name} `}
        value={formatUnits(
          data?.[1] ?? 0n,
          Number(selectedUserLiquidityPosition?.pair.token0.decimals) ?? 18
        )}
      />
      <StatRow title="Percent" value={amountPercent.toString()} />
    </div>
  );
}

function StatRow({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-white">{title}</span>
      <span>{value}</span>
    </div>
  );
}
