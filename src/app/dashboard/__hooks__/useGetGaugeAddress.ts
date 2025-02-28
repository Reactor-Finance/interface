import { VOTER } from "@/data/constants";
import { abi } from "@/lib/abis/Voter";
import { Address } from "viem";
import { useChainId, useReadContract } from "wagmi";
export function useGetGaugeAddress({
  poolId,
}: {
  poolId: Address | undefined;
}) {
  const chain = useChainId();
  const { data } = useReadContract({
    abi,
    address: VOTER[chain],
    functionName: "poolForGauge",
    args: [poolId ?? "0x"],
  });
  return data;
}
