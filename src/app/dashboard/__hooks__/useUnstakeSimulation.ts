import { GauageAbi } from "@/lib/abis/Gauge";
import { Address } from "viem";
import { useSimulateContract } from "wagmi";

export default function useWithdrawSimulation({
  address,
  amount,
}: {
  amount: bigint;
  address: Address | undefined;
}) {
  return useSimulateContract({
    abi: GauageAbi,
    address: address ?? "0x",
    functionName: "withdraw",
    args: [amount],
  });
}
