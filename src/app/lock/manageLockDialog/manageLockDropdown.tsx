import React from "react";
import LockDropdown from "../lockDropdown";
import { useManageLockDialogProvider } from "./manageLockDialogProvider";
import { formatUnits } from "viem";

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
      <LockDropdown.Trigger>Lock #{selectedTokenId}</LockDropdown.Trigger>

      <LockDropdown.SelectList>
        {lockTokens.map((token) => (
          <LockDropdown.Item key={token.id} value={token.id.toString()}>
            Lock #{token.id}{" "}
            <span>
              {formatUnits(token.amount, token.decimals)}rct locked for 2 years
            </span>
          </LockDropdown.Item>
        ))}
      </LockDropdown.SelectList>
    </LockDropdown.Root>
  );
}
