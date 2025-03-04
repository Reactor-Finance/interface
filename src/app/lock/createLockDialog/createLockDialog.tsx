import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useCallback, useMemo, useState } from "react";
import RctInput from "../rctInput";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Alert } from "@/components/ui/alert";
import EstimatesHeader from "../estimateHeader";
import EstimateRow from "../estimateRow";
import useSimulateCreateLock from "../__hooks__/useSimulateCreateLock";
import {
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { RCT, RCT_DECIMALS, VE } from "@/data/constants";
import SubmitButton from "@/components/shared/submitBtn";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { formatNumber } from "@/lib/utils";
import { useAtomicDate } from "@/lib/hooks/useAtomicDate";

// Local constants
const YEARS_2 = 62208000;
const DAYS_14 = 1209600;

export default function CreateLockDialog() {
  const chainId = useChainId();
  const now = useAtomicDate();
  const rct = useMemo(() => RCT[chainId], [chainId]); // RCT
  const ve = useMemo(() => VE[chainId], [chainId]); // Escrow
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState(DAYS_14);
  const [open, setOpen] = useState(false);
  const rctBalance = useGetBalance({ tokenAddress: rct });
  const { writeContract, reset, data: hash, isPending } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({
    hash,
  });

  const handleInputChange = useCallback(
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

  const { data: createLockSimulation } = useSimulateCreateLock({
    value: parseUnits(String(amount), RCT_DECIMALS),
    duration: BigInt(duration),
  });

  const onSubmit = useCallback(() => {
    if (approveWriteRequest) {
      reset(); // Reset state first
      writeContract(approveWriteRequest);
      return;
    }
    if (createLockSimulation) {
      writeContract(createLockSimulation.request);
    }
  }, [approveWriteRequest, reset, writeContract, createLockSimulation]);

  const { state } = useGetButtonStatuses({
    isLoading,
    isPending,
    needsApproval,
    isFetching,
  });

  const dateString = useMemo(() => {
    const newTimestamp = now.getTime() + duration * 1000;
    const date = new Date(newTimestamp);
    return date.toLocaleDateString();
  }, [duration, now]);

  const isValid = useMemo(
    () =>
      amount > 0 &&
      (Boolean(createLockSimulation) || Boolean(approveWriteRequest)),
    [amount, createLockSimulation, approveWriteRequest]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        className="inline-flex"
        size="md"
        variant="outline"
      >
        Create Lock
      </Button>
      <DialogContent className="space-y-2">
        <DialogTitle className="text-lg">
          Create <span className="text-primary-400">lock</span>
        </DialogTitle>
        <div>
          <div className="flex justify-between">
            <label htmlFor="">Amount to Lock</label>
            <span className="text-sm">
              <span className="text-neutral-200">Available:</span>{" "}
              {formatNumber(formatUnits(rctBalance, RCT_DECIMALS))} RCT
            </span>
          </div>
          <div className="pt-2"></div>
          <RctInput
            value={String(amount)}
            name="amount"
            onChange={handleInputChange}
          />
        </div>
        <div className="border-t border-neutral-800 my-2"></div>
        <div className="space-y-3">
          <h2 className="font-medium">
            Locking For {secondsToDays(duration)} Days
          </h2>
          <Slider
            onValueChange={([value]) => setDuration(value)}
            defaultValue={[duration]}
            min={DAYS_14}
            max={YEARS_2}
            step={86400}
          />
          <div className="flex justify-between text-sm text-neutral-200 ">
            <span>Min</span>
            <span>.</span>
            <span>.</span>
            <span>Max</span>
          </div>
        </div>
        <div className="space-y-2">
          <EstimatesHeader />
          <div className="pt-2"></div>
          <EstimateRow title="Deposit" value={`${amount} RCT`} />
          <EstimateRow title="Voting Power" value="0.00 RCT" />
          <EstimateRow title="Unlock Date" value={dateString} />
        </div>
        <div className="border-t border-neutral-800 my-2"></div>
        <Alert colors="muted">
          Locking will give you an NFT, referred to as a veNFT. You can increase
          the Lock amount or extend the Lock time at any point after.
        </Alert>
        <div className="pt-2">
          <SubmitButton
            state={state}
            onClick={onSubmit}
            isValid={isValid}
            approveTokenSymbol="RCT"
          >
            Create Lock
          </SubmitButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function secondsToDays(seconds: number): number {
  return Math.floor(seconds / (60 * 60 * 24));
}
