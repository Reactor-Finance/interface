import { PAIR_HELPER } from "@/data/constants";
import { useMemo } from "react";
import { useAccount, useChainId, useReadContract } from "wagmi";
import * as PairHelper from "@/lib/abis/PairHelper";
import { zeroAddress } from "viem";

export function useGetPairs({
  offset = 0n,
  limit = 1_000n,
}: {
  offset?: bigint;
  limit?: bigint;
}) {
  const chainId = useChainId();
  const { address = zeroAddress } = useAccount();
  const pairHelper = useMemo(() => PAIR_HELPER[chainId], [chainId]);
  const { data = [], queryKey = [] } = useReadContract({
    ...PairHelper,
    address: pairHelper,
    functionName: "getAllPair",
    args: [address, limit, offset],
  });
  return data.map((pair) => ({ ...pair, queryKey }));
}
