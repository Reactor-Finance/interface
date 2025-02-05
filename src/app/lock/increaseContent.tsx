import * as React from "react";
import { SelectItem } from "@/components/ui/select";
import symbl from "@/assets/reactor-symbol.svg";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import LockDropdown from "./lockDropdown";
export function IncreaseContent() {
  return (
    <div className="space-y-4">
      <div className="pt-2"></div>
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
      <div className="apply-focus rounded-md bg-neutral-950 border-neutral-900 flex border-[1px]  px-4">
        <div className="border-r-[1px] flex border-neutral-900 py-2 pr-4">
          <Image src={symbl} width={24} height={24} alt="Reactor Ticker" />
          <h2>RCT</h2>
        </div>
        <Input
          ring="none"
          className="border-none peer bg-transparent flex-grow"
        />
      </div>
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
