import { PAIR_HELPER } from "@/data/constants";
import { useMemo } from "react";
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
  const { data = [] } = useReadContract({
    ...PairHelper,
    address: pairHelper,
    functionName: "getPairBribe",
    args: [limit, offset, pair],
    query: {
      enabled: true,
      refetchInterval: 10_000,
    },
  });

  return data;
}
