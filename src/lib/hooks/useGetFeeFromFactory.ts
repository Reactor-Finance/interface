import { PAIR_FACTORY } from "@/data/constants";
import * as Factory from "@/lib/abis/Factory";
import { useMemo } from "react";
import { useChainId, useReadContract } from "wagmi";

export function useGetFeeFromFactory(stable: boolean = false) {
  const chainId = useChainId();
  const factory = useMemo(() => PAIR_FACTORY[chainId], [chainId]);
  const { data = BigInt(0) } = useReadContract({
    ...Factory,
    address: factory,
    functionName: "getFee",
    args: [stable],
    query: { enabled: true, refetchInterval: 20_000 },
  });
  return data;
}
