import React from "react";
import LockDropdown from "../lockDropdown";
import { SelectItem } from "@/components/ui/select";
import { useManageLockDialogProvider } from "./manageLockDialogProvider";

export default function ManageLockDropdown() {
  const { lockTokens, selectedTokenId, setSelectedTokenId } =
    useManageLockDialogProvider();
  return (
    <LockDropdown.Root
      onValueChange={(value) => {
        setSelectedTokenId(value);
      }}
      value={selectedTokenId}
    >
      <LockDropdown.Trigger>Selected ID</LockDropdown.Trigger>

      <LockDropdown.SelectList>
        {lockTokens.map((token) => (
          <LockDropdown.Item key={token.id} value={token.id}>
            Lock #${token.id} <span>{token.amount} locked for 2 years</span>
          </LockDropdown.Item>
        ))}
        <SelectItem value={"007"}>
          Lock #007{" "}
          <span className="text-neutral-200">200 locked for 2 years</span>
        </SelectItem>
      </LockDropdown.SelectList>
    </LockDropdown.Root>
  );
}
