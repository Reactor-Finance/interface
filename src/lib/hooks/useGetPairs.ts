import { PAIR_HELPER } from "@/data/constants";
import { useMemo } from "react";
import { useAccount, useChainId, useReadContract, useWatchBlocks } from "wagmi";
import * as PairHelper from "@/lib/abis/PairHelper";
import { zeroAddress } from "viem";

export function useGetPairs({ offset = 0n }: { offset?: bigint }) {
  const chainId = useChainId();
  const { address = zeroAddress } = useAccount();
  const pairHelper = useMemo(() => PAIR_HELPER[chainId], [chainId]);
  const { data = [], refetch } = useReadContract({
    ...PairHelper,
    address: pairHelper,
    functionName: "getAllPair",
    args: [address, 1_000n, offset],
  });

  useWatchBlocks({
    onBlock: () => {
      void refetch();
    },
  });

  return data;
}
