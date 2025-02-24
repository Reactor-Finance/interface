import React, { useEffect, useMemo, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { DAYS_14, TWO_YEARS } from "@/data/constants";
import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Contracts } from "@/lib/contracts";
import { useLockProvider } from "../lockProvider";
import useApproveVeRct from "./hooks/useApproveVeRct";
import useGetLockApproval from "./hooks/useGetLockApproval";
import { useDebounce } from "@/components/shared/hooks/useDebounce";
import { parseUnits } from "viem";
import useGetButtonStatuses from "@/components/shared/hooks/useGetButtonStatuses";
import SubmitButton from "@/components/shared/submitBtn";
import { useQueryClient } from "@tanstack/react-query";

export default function ExtendContent() {
  const { selectedLockToken } = useLockProvider();
  const [duration, setDuration] = React.useState([DAYS_14]);
  const [isApproving, setIsApproving] = useState(false);
  const { debouncedValue: durationDebounced } = useDebounce(duration[0], 300);
  const { data: increaseUnlockTimeSimulation, queryKey: increaseLockKey } =
    useSimulateContract({
      ...Contracts.VotingEscrow,
      functionName: "increase_unlock_time",
      args: [
        selectedLockToken?.id ?? 0n,
        parseUnits(durationDebounced.toString(), 0),
      ],
    });
  const { data: approveSimulation, queryKey } = useApproveVeRct();
  const approval = useGetLockApproval();
  const needsApproval = !Boolean(approval.data);
  const { writeContract, isPending, reset, data: hash } = useWriteContract();
  const { isLoading, isError, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (isSuccess) {
      if (isApproving) {
        queryClient.invalidateQueries({ queryKey });
        setIsApproving(false);
      } else {
        queryClient.invalidateQueries({ queryKey: increaseLockKey });
      }
      reset();
    }
    if (isError) {
      reset();
    }
  }, [
    increaseLockKey,
    isApproving,
    isError,
    isSuccess,
    queryClient,
    queryKey,
    reset,
  ]);
  const onSubmit = () => {
    if (needsApproval && approveSimulation) {
      writeContract(approveSimulation.request);
      setIsApproving(true);
      return;
    }
    if (increaseUnlockTimeSimulation?.request) {
      writeContract(increaseUnlockTimeSimulation.request);
    }
  };
  const { state } = useGetButtonStatuses({
    isLoading,
    isPending,
    needsApproval,
  });
  const { newDate, days } = useMemo(() => {
    const newTimestamp = Date.now() + duration[0] * 1000;
    const date = new Date(newTimestamp);
    const newDate =
      date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    const days = secondsToDays(duration[0]);
    return { newDate, days };
  }, [duration]);
  return (
    <div className="space-y-4 pt-4">
      <Slider
        value={duration}
        defaultValue={[DAYS_14]}
        onValueChange={(value) => {
          setDuration(value);
        }}
        max={TWO_YEARS}
        min={DAYS_14}
        step={1000}
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
        <div className="flex justify-between text-sm">
          <h5 className="text-sm text-neutral-100">New est.voting power</h5>
          <h5 className="">24.42 veRCT</h5>
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
