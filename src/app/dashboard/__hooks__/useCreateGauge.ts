import { useChainId, useSimulateContract } from "wagmi";
import { VOTER } from "@/data/constants";
import { Address, zeroAddress } from "viem";
import { useEffect, useMemo } from "react";
import * as Voter from "@/lib/abis/Voter";

export function useCreateGauge({ pair }: { pair: Address }) {
  const chainId = useChainId();
  const voter = useMemo(() => VOTER[chainId], [chainId]);
  const { data, error, queryKey } = useSimulateContract({
    ...Voter,
    address: voter,
    functionName: "createGauge",
    args: [pair, 0n],
    query: { enabled: pair !== zeroAddress },
  });

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return {
    simulation: pair !== zeroAddress ? data?.request : undefined,
    queryKey,
  };
}
