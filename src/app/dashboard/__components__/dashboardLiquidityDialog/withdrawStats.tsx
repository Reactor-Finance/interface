import React from "react";
import { useChainId, useReadContract } from "wagmi";
import { abi } from "@/lib/abis/Router";
import { ROUTER } from "@/data/constants";
import { Address, formatUnits } from "viem";
import { useDashboardLiquidityProvider } from "../../__context__/dashboardLiquidityProvider";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
interface Props {
  token0: Address;
  token1: Address;
  isStable: boolean;
}
export default function WithdrawStats({ token0, token1 }: Props) {
  const { selectedUserLiquidityPosition, state } =
    useDashboardLiquidityProvider();
  const amountPercent = state.sliderValue;
  const a = useGetBalance({
    tokenAddress: selectedUserLiquidityPosition?.pair.id as Address,
  });
  const amount = (a * BigInt(amountPercent)) / 100n;
  const chainId = useChainId();
  const { data } = useReadContract({
    abi,
    address: ROUTER[chainId],
    functionName: "quoteRemoveLiquidity",
    args: [
      token0,
      token1,
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
