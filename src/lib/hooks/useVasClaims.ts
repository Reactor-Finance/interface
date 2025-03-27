import { useChainId, useSimulateContract } from "wagmi";
import * as Vas from "../abis/Vas";
import { useMemo } from "react";
import { VAS } from "@/data/constants";

export function useVasClaimForSingleToken({
  tokenId = 0n,
  enableQuery = false,
}: {
  tokenId: bigint;
  enableQuery?: boolean;
}) {
  const chainId = useChainId();
  const vas = useMemo(() => VAS[chainId], [chainId]);
  return useSimulateContract({
    ...Vas,
    address: vas,
    functionName: "claimRewardsForTokenId",
    args: [tokenId],
    query: { enabled: tokenId !== 0n && enableQuery },
  });
}

export function useVasClaimForManyTokens({
  tokenIds = [],
  enableQuery = false,
}: {
  tokenIds: bigint[];
  enableQuery?: boolean;
}) {
  const chainId = useChainId();
  const vas = useMemo(() => VAS[chainId], [chainId]);
  return useSimulateContract({
    ...Vas,
    address: vas,
    functionName: "claimRewardsForTokenIds",
    args: [tokenIds],
    query: { enabled: tokenIds.length !== 0 && enableQuery },
  });
}
