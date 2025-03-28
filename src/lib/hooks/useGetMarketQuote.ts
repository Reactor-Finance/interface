import { useChainId, useReadContract } from "wagmi";
import * as Oracle from "../abis/Oracle";
import { useMemo } from "react";
import { ORACLE } from "@/data/constants";
import { zeroAddress } from "viem";

// Quote is in USD
export function useGetMarketQuote({
  disabled,
  tokenAddress,
  value,
  staleTime = 0,
}: {
  tokenAddress: `0x${string}`;
  value: bigint;
  staleTime?: number;
  disabled?: boolean;
}) {
  const chainId = useChainId();
  const oracle = useMemo(() => ORACLE[chainId], [chainId]);
  const {
    data = [BigInt(0), BigInt(0)],
    isLoading,
    error,
  } = useReadContract({
    ...Oracle,
    address: oracle,
    functionName: "getAverageValueInUSD",
    args: [tokenAddress, value],
    query: {
      staleTime,
      enabled: tokenAddress !== zeroAddress && !disabled,
    },
  });

  // useWatchBlocks({
  //   onBlock: () => {
  //     void refetch();
  //   },
  // });

  return { quote: data, isLoading, error };
}
