import React from "react";
import LockDropdown from "../lockDropdown";
import { formatUnits } from "viem";
import { formatNumber } from "@/lib/utils";
import { useLockProvider } from "../lockProvider";

export default function ManageLockDropdown() {
  const { lockTokens, selectedTokenId, setSelectedTokenId } = useLockProvider();
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
            <span className="text-neutral-200 text-sm">
              {formatNumber(formatUnits(token.amount, token.decimals))} RCT
              locked for 2 years{" "}
            </span>
          </LockDropdown.Item>
        ))}
      </LockDropdown.SelectList>
    </LockDropdown.Root>
  );
}
