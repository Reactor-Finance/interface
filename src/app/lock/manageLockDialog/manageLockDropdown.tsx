import React from "react";
import LockDropdown from "../lockDropdown";
import { formatUnits } from "viem";
import { formatNumber } from "@/lib/utils";
import { useLockTableProvider } from "../lockTable/lockTableProvider";

export default function ManageLockDropdown() {
  const { lockTokens, selectedTokenId, setSelectedTokenId } =
    useLockTableProvider();
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
