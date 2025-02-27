import { VOTER } from "@/data/constants";
import { abi } from "@/lib/abis/Voter";
import { Address } from "viem";
import { useChainId, useReadContract } from "wagmi";
export function useGetGaugeAddress({ poolId }: { poolId: Address }) {
  const chain = useChainId();
  const { data } = useReadContract({
    abi,
    address: VOTER[chain],
    functionName: "poolForGauge",
    args: [poolId],
  });
  return data;
}
