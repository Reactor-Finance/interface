import React from "react";
import LockDropdown from "./lockDropdown";
import { SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function TransferContent() {
  return (
    <div className="space-y-4">
      <div></div>
      <LockDropdown placeholder="Select your veRCT">
        <SelectItem value="apple">Apple</SelectItem>
      </LockDropdown>
      <div className="pt-2">
        <label htmlFor="destination">Destination Address</label>
        <div className="pt-1"></div>
        <Input placeholder="0x..." className="bg-neutral-950" />
      </div>
      <Alert colors={"muted"}>
        Transferring a lock will also transfer any rewards and rebases! Before
        continuing, please make sure you have claimed all available rewards.
      </Alert>
      <Button disabled size="submit" variant={"primary"}>
        Approve
      </Button>
    </div>
  );
}
