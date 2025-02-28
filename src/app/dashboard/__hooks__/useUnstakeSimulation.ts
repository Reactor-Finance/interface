import { GauageAbi } from "@/lib/abis/Gauge";
import { Address } from "viem";
import { useSimulateContract } from "wagmi";

export default function useWithdrawSimulation({
  address,
  amount,
}: {
  amount: bigint;
  address: Address;
}) {
  return useSimulateContract({
    abi: GauageAbi,
    address,
    functionName: "withdraw",
    args: [amount],
  });
}
