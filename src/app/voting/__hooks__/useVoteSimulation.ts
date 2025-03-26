import { VOTER } from "@/data/constants";
import * as Voter from "@/lib/abis/Voter";
import { useMemo } from "react";
import { Address } from "viem";
import { useChainId, useSimulateContract } from "wagmi";

export function useVoteSimulation({
  tokenId,
  pools,
  weights,
}: {
  tokenId: bigint;
  pools: Address[];
  weights: bigint[];
}) {
  const chainId = useChainId();
  const voter = useMemo(() => VOTER[chainId], [chainId]);
  return useSimulateContract({
    ...Voter,
    address: voter,
    functionName: "vote",
    args: [tokenId, pools, weights],
    query: { enabled: tokenId !== 0n && !!pools.length && !!weights.length },
  });
}
