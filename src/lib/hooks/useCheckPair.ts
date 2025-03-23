import { ChainId, ETHER, TRADE_HELPER, WETH } from "@/data/constants";
import { useMemo } from "react";
import { useChainId, useReadContract } from "wagmi";
import * as TradeHelper from "../abis/TradeHelper";
import { Address, zeroAddress } from "viem";
const monToWmon = (addr: Address) => {
  if (addr.toLowerCase() === ETHER.toLowerCase()) {
    return WETH[ChainId.MONAD_TESTNET].toLowerCase() as Address;
  } else {
    return addr;
  }
};

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
    args: [monToWmon(token0), monToWmon(token1), stable],
  });
  // why do we need to refetch here?
  // useWatchBlocks({
  //   onBlock: () => {
  //     void refetch();
  //   },
  // });

  return { pairExists: data !== zeroAddress, isLoading, error, pair: data };
}
