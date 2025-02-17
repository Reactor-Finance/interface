import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import RctInput from "../rctInput";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Alert } from "@/components/ui/alert";
import EstimatesHeader from "../estimateHeader";
import EstimateRow from "../estimateRow";

export default function CreateLockDialog() {
  const [open, setOpen] = React.useState(false);
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
              <span className="text-neutral-200">Available:</span> 200 RCT
            </span>
          </div>
          <div className="pt-2"></div>
          <RctInput />
        </div>
        <div className="border-t border-neutral-800 my-2"></div>
        <div className="space-y-3">
          <h2 className="font-medium">Locking For</h2>
          <Slider defaultValue={[33]} max={100} step={1} />
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
        <Button type="submit" size="submit" variant="primary">
          Approve
        </Button>
      </DialogContent>
    </Dialog>
  );
}
