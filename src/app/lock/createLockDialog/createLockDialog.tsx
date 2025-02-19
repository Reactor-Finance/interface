import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useEffect, useMemo, useState } from "react";
import RctInput from "../rctInput";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Alert } from "@/components/ui/alert";
import EstimatesHeader from "../estimateHeader";
import EstimateRow from "../estimateRow";
import useSimulateCreateLock from "./hooks/useSimulateCreateLock";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Contracts } from "@/lib/contracts";
import { formatUnits, parseUnits } from "viem";
import useGetAllowance from "@/components/shared/hooks/useGetAllowance";
import useGetRctBalance from "@/components/shared/hooks/useGetRctBalance";
import { DAYS_14, RCT_DECIMALS, TWO_YEARS } from "@/data/constants";
import useCreateLockValidation from "./hooks/useCreateLockValidation";
import FormErrorMessage from "@/components/shared/formErrorMessage";
import { useLockProvider } from "../lockProvider";
import { useQueryClient } from "@tanstack/react-query";
import useApproveSimulate from "@/components/shared/hooks/useApproveSimulate";
export default function CreateLockDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ amount: "", duration: [DAYS_14] });
  const { queryKey } = useLockProvider();
  const queryClient = useQueryClient();
  const { data: createLockSimulation } = useSimulateCreateLock({ form });
  const { data: allowance, queryKey: allowanceKey } = useGetAllowance({
    spender: Contracts.VotingEscrow.address,
    tokenAddress: Contracts.Reactor.address, //rct address
  });
  const { data: approveSimulation } = useApproveSimulate({
    spender: Contracts.VotingEscrow.address,
    tokenAddress: Contracts.Reactor.address, //rct address
  });
  const { rctBalance, rctQueryKey } = useGetRctBalance();
  const { writeContract, reset, data: hash } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const { error: validationError, isValid } = useCreateLockValidation({ form });
  const onSubmit = () => {
    if ((allowance ?? 0n) < parseUnits(form.amount, 18) && approveSimulation) {
      writeContract(approveSimulation?.request);
    }
    if (createLockSimulation) {
      writeContract(createLockSimulation.request);
    }
  };
  const isApproving = useMemo(() => {
    return (allowance ?? 0n) < parseUnits(form.amount, 18);
  }, [allowance, form.amount]);
  useEffect(() => {
    if (isSuccess) {
      if (isApproving) {
        queryClient.invalidateQueries({ queryKey: allowanceKey });
      } else {
        queryClient.invalidateQueries({ queryKey });
        queryClient.invalidateQueries({ queryKey: rctQueryKey });
        setForm({ amount: "", duration: [DAYS_14] });
      }
      reset();
    }
  }, [
    allowanceKey,
    isApproving,
    isSuccess,
    queryClient,
    queryKey,
    rctQueryKey,
    reset,
  ]);
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
              {formatUnits(rctBalance ?? 0n, RCT_DECIMALS)} RCT
            </span>
          </div>
          <div className="pt-2"></div>
          <RctInput
            value={form.amount}
            name="amount"
            onChange={handleInputChange}
          />
        </div>
        <div className="border-t border-neutral-800 my-2"></div>
        <div className="space-y-3">
          <h2 className="font-medium">Locking For</h2>
          <Slider
            onValueChange={(value) =>
              setForm((prevForm) => ({
                ...prevForm,
                duration: value,
              }))
            }
            defaultValue={[0]}
            min={DAYS_14}
            max={TWO_YEARS}
            step={1000}
          />
          <div className="flex justify-between text-sm text-neutral-200 ">
            <span>14 days</span>
            <span>3 month</span>
            <span>1 years</span>
            <span>2 years</span>
          </div>
        </div>
        <div className="space-y-2">
          <EstimatesHeader />
          <div className="pt-2"></div>
          <EstimateRow title="Deposit" value="0.00 RCT" />
          <EstimateRow title="Voting Power" value="0.00 RCT" />
          <EstimateRow title="Unlock Date" value="-" />
        </div>
        <div className="border-t border-neutral-800 my-2"></div>
        <Alert colors="muted">
          Locking will give you an NFT, referred to as a veNFT. You can increase
          the Lock amount or extend the Lock time at any point after.
        </Alert>
        <div>
          <Button
            onClick={onSubmit}
            disabled={!isValid}
            type="submit"
            size="submit"
            variant="primary"
          >
            {isApproving ? "Approve" : "Create Lock"}
          </Button>

          {validationError && (
            <FormErrorMessage>{validationError}</FormErrorMessage>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
