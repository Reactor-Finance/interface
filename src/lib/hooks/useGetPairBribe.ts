import { PAIR_HELPER } from "@/data/constants";
import { useEffect, useMemo } from "react";
import { useChainId, useReadContract } from "wagmi";
import * as PairHelper from "@/lib/abis/PairHelper";
import { Address, zeroAddress } from "viem";

export function useGetPairBribe({
  offset = 0n,
  limit = 200n,
  pair = zeroAddress,
}: {
  pair: Address;
  offset?: bigint;
  limit?: bigint;
}) {
  const chainId = useChainId();
  const pairHelper = useMemo(() => PAIR_HELPER[chainId], [chainId]);
  const { data = [], error } = useReadContract({
    ...PairHelper,
    address: pairHelper,
    functionName: "getPairBribe",
    args: [limit, offset, pair],
    query: {
      enabled: pair !== zeroAddress,
      refetchInterval: 300000 /** Refetch every 5 minutes */,
    },
  });

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return data;
}
