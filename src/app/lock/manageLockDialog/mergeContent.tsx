import React from "react";
import { SelectItem } from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import LockDropdown from "../lockDropdown";

export default function MergeContent() {
  return (
    <div className="space-y-4 pt-4">
      <LockDropdown placeholder="Select your veRCT">
        <SelectItem value="apple">Apple</SelectItem>
      </LockDropdown>
      <h2>Merge with</h2>
      <LockDropdown placeholder="Select your veRCT">
        <SelectItem value="apple">Apple</SelectItem>
      </LockDropdown>
      <div className="p-3 bg-neutral-950 border border-neutral-900/80 rounded-sm ">
        <h2>Estimates</h2>
      </div>
      <div className="flex justify-between p-2 ">
        <h5 className="text-sm text-neutral-200">Deposit</h5>
        <h5 className="text-neutral-100">0.00 RCT</h5>
      </div>
      <Alert colors={"muted"}>
        Merging locks will inherit the longest lock time of the two and will
        increase the final Lock voting power by adding up the two underlying
        locked amounts based on the new lock time.
      </Alert>
      <Button disabled size="submit" variant={"primary"}>
        Approve
      </Button>
    </div>
  );
}
