import { zeroAddress } from "viem";
import { useAccount, useChainId, useReadContract } from "wagmi";
import * as PairHelper from "../abis/PairHelper";
import { useMemo } from "react";
import { PAIR_HELPER } from "@/data/constants";

export function useGetPairInfo({
  pair = zeroAddress,
}: {
  pair: `0x${string}`;
}) {
  const { address = zeroAddress } = useAccount();
  const chainId = useChainId();
  const pairHelper = useMemo(() => PAIR_HELPER[chainId], [chainId]);
  const {
    data: pairInfo,
    isLoading,
    isFetching,
    queryKey,
  } = useReadContract({
    ...PairHelper,
    address: pairHelper,
    functionName: "getPair",
    args: [pair, address],
    query: { enabled: true, refetchInterval: 10_000 },
  });

  // useWatchBlocks({
  //   onBlock: () => {
  //     void refetch();
  //   },
  // });

  return { pairInfo, isLoading: isLoading || isFetching, queryKey };
}
