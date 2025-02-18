import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";
import RctInput from "../rctInput";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Alert } from "@/components/ui/alert";
import EstimatesHeader from "../estimateHeader";
import EstimateRow from "../estimateRow";
import useSimulateCreateLock from "./hooks/useSimulateCreateLock";
import { useWriteContract } from "wagmi";
import { Contracts } from "@/lib/contracts";
import { formatUnits, parseUnits } from "viem";
import useSimulateApprove from "@/components/shared/hooks/useSimulateApprove";
import useGetAllowance from "@/components/shared/hooks/useGetAllowance";
import useGetRctBalance from "@/components/shared/hooks/useGetRctBalance";
import { RCT_DECIMALS, TWO_YEARS } from "@/data/constants";
export default function CreateLockDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ amount: "", duration: [0] });
  const { data: createLockSimulation } = useSimulateCreateLock({ form });
  const allowance = useGetAllowance({
    spender: Contracts.VotingEscrow.address,
    tokenAddress: "0x", //rct address
  });
  const { data: approveSimulation } = useSimulateApprove({
    spender: Contracts.VotingEscrow.address,
    tokenAddress: "0x", //rct address
  });
  const { rctBalance } = useGetRctBalance();
  const { writeContract } = useWriteContract();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const onSubmit = () => {
    if ((allowance ?? 0n) < parseUnits(form.amount, 18) && approveSimulation) {
      writeContract(approveSimulation?.request);
    }
    if (createLockSimulation) {
      writeContract(createLockSimulation.request);
    }
  };
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
          <RctInput onChange={handleInputChange} />
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
        <Button
          onClick={onSubmit}
          type="submit"
          size="submit"
          variant="primary"
        >
          Approve
        </Button>
      </DialogContent>
    </Dialog>
  );
}
