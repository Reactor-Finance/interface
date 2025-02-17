import * as React from "react";
import { SelectItem } from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import LockDropdown from "../lockDropdown";
import RctInput from "../rctInput";
export function IncreaseContent() {
  return (
    <div className="space-y-4 pt-4">
      <LockDropdown placeholder="Select a fruit">
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </LockDropdown>
      <div className="flex justify-between">
        <h4>Add to lock</h4>
        <h5 className="text-neutral-200 text-[13px]">Available: 200.00 RCT</h5>
      </div>

      <RctInput />
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
      <Button disabled size="submit" variant={"primary"}>
        Approve
      </Button>
    </div>
  );
}
