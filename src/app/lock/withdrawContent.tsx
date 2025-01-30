import React from "react";
import LockDropdown from "./lockDropdown";
import { SelectItem } from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function WithdrawContent() {
  return (
    <div className="space-y-4">
      <div></div>
      <LockDropdown placeholder="Select your veRCT">
        <SelectItem value="re">Re</SelectItem>
      </LockDropdown>
      <Alert colors="muted">Withdraw veRCT from your expired locks.</Alert>
      <Button disabled size="submit" variant="primary">
        Approve
      </Button>
    </div>
  );
}
