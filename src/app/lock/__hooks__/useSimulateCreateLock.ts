import { useChainId, useSimulateContract } from "wagmi";
import * as Ve from "@/lib/abis/Ve";
import { useEffect, useMemo } from "react";
import { VE } from "@/data/constants";
import { useDebounce } from "@/lib/hooks/useDebounce";

export default function useSimulateCreateLock({
  value,
  duration,
}: {
  value: bigint;
  duration: bigint;
}) {
  const { debouncedValue } = useDebounce(value, 250);
  const { debouncedValue: durationDe } = useDebounce(duration, 250);
  const chainId = useChainId();
  const escrow = useMemo(() => VE[chainId], [chainId]);
  const { data, error } = useSimulateContract({
    ...Ve,
    address: escrow,
    functionName: "create_lock",
    args: [debouncedValue, durationDe],
  });

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return { data };
}
