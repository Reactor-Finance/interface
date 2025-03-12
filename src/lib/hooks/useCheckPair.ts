import { TRADE_HELPER } from "@/data/constants";
import { useMemo } from "react";
import { useChainId, useReadContract } from "wagmi";
import * as TradeHelper from "../abis/TradeHelper";
import { zeroAddress } from "viem";

export function useCheckPair({
  token0,
  token1,
  stable,
}: {
  token0: `0x${string}`;
  token1: `0x${string}`;
  stable: boolean;
}) {
  const chainId = useChainId();
  const tradeHelper = useMemo(() => TRADE_HELPER[chainId], [chainId]);
  const {
    data = zeroAddress,
    isLoading,
    error,
  } = useReadContract({
    ...TradeHelper,
    address: tradeHelper,
    functionName: "pairFor",
    args: [token0, token1, stable],
    query: { enabled: true, refetchInterval: 10_000 },
  });
  // why do we need to refetch here?
  // useWatchBlocks({
  //   onBlock: () => {
  //     void refetch();
  //   },
  // });

  return { pairExists: data !== zeroAddress, isLoading, error, pair: data };
}
