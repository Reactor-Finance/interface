import { PAIR_HELPER } from "@/data/constants";
import { useEffect, useMemo } from "react";
import { useChainId, useReadContract, useWatchBlocks } from "wagmi";
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
  const { data = [], refetch, error } = useReadContract({
    ...PairHelper,
    address: pairHelper,
    functionName: "getPairBribe",
    args: [limit, offset, pair],
  });

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  useWatchBlocks({
    onBlock: () => {
      void refetch();
    },
  });

  return data;
}
