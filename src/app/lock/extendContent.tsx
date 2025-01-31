import React from "react";
import LockDropdown from "./lockDropdown";
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";

export default function ExtendContent() {
  return (
    <div className="space-y-4">
      <div></div>
      <LockDropdown placeholder="Select your veRCT">
        <SelectItem value="apple">Apple</SelectItem>
      </LockDropdown>
      <Slider defaultValue={[33]} max={100} step={1} />
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
      <Button disabled size="submit" variant="primary">
        Approve
      </Button>
    </div>
  );
}
