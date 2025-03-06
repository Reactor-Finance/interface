import * as React from "react";
import { Alert } from "@/components/ui/alert";
import RctInput from "../rctInput";
import {
  useChainId,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { RCT, RCT_DECIMALS, VE } from "@/data/constants";
import { formatNumber } from "@/lib/utils";
import SubmitButton from "@/components/shared/submitBtn";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import usePadLoading from "@/lib/hooks/usePadLoading";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import * as Ve from "@/lib/abis/Ve";
import { TLockToken } from "../types";

// Local constants

export default function IncreaseContent({
  selectedLockToken,
}: {
  selectedLockToken: TLockToken;
}) {
  const chainId = useChainId();
  const rct = React.useMemo(() => RCT[chainId], [chainId]); // RCT
  const ve = React.useMemo(() => VE[chainId], [chainId]); // Escrow
  const [amount, setAmount] = React.useState(0);
  const rctBalance = useGetBalance({ tokenAddress: rct });
  const { writeContract, reset, data: hash, isPending } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({
    hash,
  });

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsedNumber = Number(e.target.value);
      const changeValue = isNaN(parsedNumber) ? amount : parsedNumber;
      setAmount(changeValue);
    },
    [amount, setAmount]
  );

  const { approveWriteRequest, needsApproval, isFetching } = useApproveWrite({
    spender: ve,
    tokenAddress: rct, //rct address
    amount: String(amount),
    decimals: RCT_DECIMALS,
  });

  const { data: increaseAmountSimulation, error: increaseAmountError } =
    useSimulateContract({
      ...Ve,
      address: ve,
      functionName: "increase_amount",
      args: [selectedLockToken.id, parseUnits(String(amount), RCT_DECIMALS)],
    });

  const onSubmit = React.useCallback(() => {
    if (needsApproval && approveWriteRequest) {
      reset();
      writeContract(approveWriteRequest);
      return;
    }
    if (increaseAmountSimulation) {
      reset();
      writeContract(increaseAmountSimulation.request);
      return;
    }
  }, [
    reset,
    needsApproval,
    approveWriteRequest,
    increaseAmountSimulation,
    writeContract,
  ]);

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

  const isValid = React.useMemo(() => {
    return needsApproval
      ? Boolean(approveWriteRequest)
      : Boolean(increaseAmountSimulation) && !Boolean(increaseAmountError);
  }, [
    needsApproval,
    approveWriteRequest,
    increaseAmountSimulation,
    increaseAmountError,
  ]);

  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between">
        <h4>Add to lock</h4>
        <h5 className="text-neutral-300 text-[13px]">
          Available:{" "}
          <span className="text-white">
            {formatNumber(formatUnits(rctBalance.balance, RCT_DECIMALS))} RCT
          </span>
        </h5>
      </div>

      <RctInput value={amount} onChange={handleInputChange} />
      <h3 className="text-lg">Estimates</h3>
      <div className="space-y-1">
        <div className="flex justify-between">
          <h5 className="text-sm text-neutral-200">Deposit</h5>
          <h5 className="text-neutral-100">{formatNumber(amount)} RCT</h5>
        </div>
      </div>
      <Alert colors={"muted"}>
        Depositing into the lock will increase your voting power and rewards.
        You can also extend the lock duration.
      </Alert>
      <SubmitButton state={state} onClick={onSubmit} isValid={isValid}>
        Increase Lock
      </SubmitButton>
    </div>
  );
}
