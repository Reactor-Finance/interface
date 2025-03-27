import { Address, zeroAddress } from "viem";
import { useSimulateContract } from "wagmi";
import { useEffect } from "react";
import * as Gauge from "@/lib/abis/Gauge";

export function useUnstake({
  gaugeAddress,
  amount,
}: {
  gaugeAddress: Address;
  amount: bigint;
}) {
  const { data, error, queryKey } = useSimulateContract({
    ...Gauge,
    address: gaugeAddress,
    functionName: "withdraw",
    args: [amount],
    query: { enabled: gaugeAddress !== zeroAddress },
  });

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return {
    simulation: gaugeAddress !== zeroAddress ? data?.request : undefined,
    queryKey,
  };
}
