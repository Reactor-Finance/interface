import { GauageAbi } from "@/lib/abis/Gauge";
import { Address } from "viem";
import { useSimulateContract } from "wagmi";

export default function useStakeSimulation({
  address,
  amount,
  disabled,
}: {
  amount: bigint;
  address: Address | undefined;
  disabled: boolean;
}) {
  return useSimulateContract({
    abi: GauageAbi,
    address: address ?? "0x",
    functionName: "deposit",
    args: [amount],
    query: { enabled: !disabled },
  });
}
