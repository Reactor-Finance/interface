import React from "react";
import { SelectItem } from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import LockDropdown from "../lockDropdown";

export default function WithdrawContent() {
  return (
    <div className="space-y-4 pt-4">
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
