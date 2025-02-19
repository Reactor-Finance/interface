import React from "react";
import { Alert } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { TWO_YEARS } from "@/data/constants";
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

export default function ExtendContent() {
  const { selectedLockToken } = useLockProvider();
  const [duration, setDuration] = React.useState([0]);
  const { debouncedValue: durationDebounced } = useDebounce(duration[0], 300);
  const { data: increaseUnlockTimeSimulation } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "increase_unlock_time",
    args: [
      selectedLockToken?.id ?? 0n,
      parseUnits(durationDebounced.toString(), 0),
    ],
  });
  const { data: approveSimulation } = useApproveVeRct();
  const approval = useGetLockApproval();
  const needsApproval = !Boolean(approval.data);
  const { writeContract, isPending, data: hash } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({ hash });
  const onSubmit = () => {
    if (needsApproval && approveSimulation) {
      writeContract(approveSimulation.request);
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
  return (
    <div className="space-y-4 pt-4">
      <Slider
        value={duration}
        defaultValue={[33]}
        onValueChange={(value) => {
          setDuration(value);
        }}
        max={TWO_YEARS}
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
          <h5 className="">13 Days</h5>
        </div>
        <div className="flex justify-between text-sm">
          <h5 className="text-sm text-neutral-200">New lock time</h5>
          <h5 className="">Tue, 31 Oct 2024</h5>
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
