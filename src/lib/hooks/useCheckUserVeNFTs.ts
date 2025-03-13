import { zeroAddress } from "viem";
import { useAccount, useChainId, useReadContract } from "wagmi";
import * as veNFTHelper from "@/lib/abis/veNFTHelper";
import { useEffect, useMemo } from "react";
import { VE_NFT_HELPER } from "@/data/constants";

export function useCheckUserVeNFTs() {
  const { address = zeroAddress } = useAccount();
  const chainId = useChainId();
  const helper = useMemo(() => VE_NFT_HELPER[chainId], [chainId]);
  const { data = [], error } = useReadContract({
    ...veNFTHelper,
    address: helper,
    functionName: "getNFTFromAddress",
    args: [address],
    query: {
      enabled: true,
    },
  });

  // useWatchBlocks({
  //   onBlock: () => {
  //     void refetch();
  //   },
  // });

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return data;
}
