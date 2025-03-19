import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import {
  useChainId,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import SubmitButton from "@/components/shared/submitBtn";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { TLockToken } from "../types";
import * as Ve from "@/lib/abis/Ve";
import { VE } from "@/data/constants";
import { useAtomicDate } from "@/lib/hooks/useAtomicDate";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useVeNFTsProvider } from "@/contexts/veNFTsProvider";

// Local constants
const YEARS_2 = 62208000;
const DAYS_14 = 1209600;

export default function ExtendContent({
  selectedLockToken,
}: {
  selectedLockToken: TLockToken;
}) {
  const chainId = useChainId();
  const now = useAtomicDate();
  const ve = useMemo(() => VE[chainId], [chainId]); // Escrow
  const [duration, setDuration] = useState(DAYS_14);
  const { writeContract, reset, isPending, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const { reset: resetVeNFTs } = useVeNFTsProvider();
  useEffect(() => {
    if (isSuccess) {
      reset();
      resetVeNFTs();
    }
  }, [isSuccess, reset, resetVeNFTs]);
  const { debouncedValue: durationDe } = useDebounce(duration, 250);
  const { data: increaseUnlockTimeSimulation } = useSimulateContract({
    ...Ve,
    address: ve,
    functionName: "increase_unlock_time",
    args: [selectedLockToken.id, BigInt(durationDe)],
  });

  const onSubmit = useCallback(() => {
    if (increaseUnlockTimeSimulation?.request) {
      writeContract(increaseUnlockTimeSimulation.request);
    }
  }, [increaseUnlockTimeSimulation, writeContract]);

  const { state } = useGetButtonStatuses({
    isLoading,
    isPending,
    needsApproval: false,
  });

  const { newDate, days } = useMemo(() => {
    const newTimestamp = now.getTime() + duration * 1000;
    const date = new Date(newTimestamp);
    const newDate = date.toLocaleDateString();
    const days = secondsToDays(duration);
    return { newDate, days };
  }, [duration, now]);

  return (
    <div className="space-y-4 pt-4">
      <Slider
        value={[duration]}
        defaultValue={[DAYS_14]}
        onValueChange={([value]) => setDuration(value)}
        max={YEARS_2}
        min={DAYS_14}
        step={86400}
      />
      <div className="w-full flex justify-between text-[13px] text-neutral-400">
        <span>Min</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
        <span>Max</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <h5 className="text-sm text-neutral-200">Deposit</h5>
          <h5 className="">{days} Days</h5>
        </div>
        <div className="flex justify-between text-sm">
          <h5 className="text-sm text-neutral-200">New lock time</h5>
          <h5 className="">{newDate}</h5>
        </div>
      </div>

      <Alert colors="muted">
        You can extend lock or increase the lock amount. These actions will
        increase your voting power. The maximum lock time is 2 years.
      </Alert>
      <SubmitButton
        onClick={onSubmit}
        isValid={Boolean(increaseUnlockTimeSimulation)}
        state={state}
      >
        Extend Lock
      </SubmitButton>
    </div>
  );
}

function secondsToDays(seconds: number): number {
  return Math.floor(seconds / (60 * 60 * 24));
}
