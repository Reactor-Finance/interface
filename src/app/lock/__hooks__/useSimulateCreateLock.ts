import { useChainId, useSimulateContract } from "wagmi";
import * as Ve from "@/lib/abis/Ve";
import { useEffect, useMemo } from "react";
import { VE } from "@/data/constants";

export default function useSimulateCreateLock({
  value,
  duration,
}: {
  value: bigint;
  duration: bigint;
}) {
  const chainId = useChainId();
  const escrow = useMemo(() => VE[chainId], [chainId]);
  const { data, error } = useSimulateContract({
    ...Ve,
    address: escrow,
    functionName: "create_lock",
    args: [value, duration],
  });

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return { data };
}
