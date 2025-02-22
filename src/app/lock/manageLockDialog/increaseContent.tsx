import * as React from "react";
import { Alert } from "@/components/ui/alert";
import RctInput from "../rctInput";
import useGetRctBalance from "@/components/shared/hooks/useGetRctBalance";
import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Contracts } from "@/lib/contracts";
import { formatUnits, parseUnits } from "viem";
import { RCT_DECIMALS } from "@/data/constants";
import useGetLockApproval from "./hooks/useGetLockApproval";
import { inputPatternMatch } from "@/lib/utils";
import { useLockProvider } from "../lockProvider";
import useApproveWrite from "@/components/shared/hooks/useApproveWrite";
import useGetButtonStatuses from "@/components/shared/hooks/useGetButtonStatuses";
import SubmitButton from "@/components/shared/submitBtn";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useIncreaseLockValidation } from "./hooks/useIncreaseLockValidation";
import usePadLoading from "@/components/shared/hooks/usePadLoading";
export function IncreaseContent() {
  const [amount, setAmount] = React.useState("");
  const [isApproving, setIsApproving] = React.useState(false);
  const { selectedLockToken } = useLockProvider();
  const tokenId = selectedLockToken?.id.toString() ?? "";
  const { rctBalance, rctQueryKey } = useGetRctBalance();
  const { data: increaseAmountSimulation } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "increase_amount",
    args: [parseUnits(tokenId, 0), parseUnits(amount, RCT_DECIMALS)],
  });
  const { data: approveSimulation } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "approve",
    args: [Contracts.VotingEscrow.address, parseUnits(tokenId, 0)],
  });
  const { approveWriteRequest, needsApproval, isFetching, allowanceKey } =
    useApproveWrite({
      tokenAddress: Contracts.Reactor.address,
      spender: Contracts.VotingEscrow.address,
      amount,
    });
  const isLockApproved = useGetLockApproval();
  const { writeContract, reset, isPending, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const { isValid, validationError } = useIncreaseLockValidation({
    needsApproval,
    isLockApproved: Boolean(isLockApproved),
    rctBalance,
    increaseAmountSimulation: Boolean(increaseAmountSimulation?.request),
    amount,
    approveSimulation: Boolean(approveSimulation?.request),
    approveWriteRequest: Boolean(approveWriteRequest),
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (isSuccess) {
      if (isApproving) {
        queryClient.invalidateQueries({ queryKey: allowanceKey });
        setIsApproving(false);
      } else {
        queryClient.invalidateQueries({ queryKey: rctQueryKey });
        setAmount("");
      }
      reset();
    }
  }, [allowanceKey, isApproving, isSuccess, queryClient, rctQueryKey, reset]);
  const onSubmit = () => {
    if (approveWriteRequest) {
      writeContract(approveWriteRequest);
      setIsApproving(true);
      return;
    }
    if (!isLockApproved && approveSimulation) {
      writeContract(approveSimulation.request);
      setIsApproving(true);
      return;
    }
    if (increaseAmountSimulation) {
      writeContract(increaseAmountSimulation.request);
      return;
    }
  };
  const paddedIsFetching = usePadLoading({
    value: isFetching,
    duration: 300,
  });
  const { state } = useGetButtonStatuses({
    isLoading,
    isPending,
    needsApproval,
    isFetching: paddedIsFetching,
  });
  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between">
        <h4>Add to lock</h4>
        <h5 className="text-neutral-300 text-[13px]">
          Available:{" "}
          <span className="text-white">
            {formatUnits(rctBalance ?? 0n, RCT_DECIMALS)} RCT
          </span>
        </h5>
      </div>

      <RctInput
        value={amount}
        onChange={(e) => {
          if (inputPatternMatch(e.target.value, RCT_DECIMALS)) {
            setAmount(e.target.value);
          }
        }}
      />
      <h3 className="text-lg">Estimates</h3>
      <div className="space-y-1">
        <div className="flex justify-between">
          <h5 className="text-sm text-neutral-200">Deposit</h5>
          <h5 className="text-neutral-100">0.00 RCT</h5>
        </div>
        <div className="flex justify-between">
          <h5 className="text-sm text-neutral-200">Deposit</h5>
          <h5 className="text-neutral-100">0.00 RCT</h5>
        </div>
      </div>
      <Alert colors={"muted"}>
        Depositing into the lock will increase your voting power and rewards.
        You can also extend the lock duration.
      </Alert>
      <SubmitButton
        validationError={validationError}
        state={state}
        onClick={onSubmit}
        isValid={isValid}
      >
        Increase Lock
      </SubmitButton>
    </div>
  );
}
