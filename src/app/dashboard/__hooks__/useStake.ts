import { Address, zeroAddress } from "viem";
import { useSimulateContract } from "wagmi";
import { useEffect } from "react";
import * as Gauge from "@/lib/abis/Gauge";

export function useStake({
  gaugeAddress,
  amount,
}: {
  gaugeAddress: Address;
  amount: bigint;
}) {
  const { data, error } = useSimulateContract({
    ...Gauge,
    address: gaugeAddress,
    functionName: "deposit",
    args: [amount],
    query: { enabled: gaugeAddress !== zeroAddress && amount > 0n },
  });

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return {
    simulation:
      gaugeAddress !== zeroAddress && amount > 0n ? data?.request : undefined,
  };
}
