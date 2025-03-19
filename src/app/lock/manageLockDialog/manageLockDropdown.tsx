import React, { useCallback } from "react";
import LockDropdown from "../lockDropdown";
import { formatUnits } from "viem";
import { formatNumber } from "@/lib/utils";
import { TLockToken } from "../types";
import { useAtomicDate } from "@/lib/hooks/useAtomicDate";
import { useLockProvider } from "../lockProvider";

export default function ManageLockDropdown({
  selectedLockToken,
  onTokenSelected,
}: {
  selectedLockToken: TLockToken;
  onTokenSelected: (token?: TLockToken) => void;
}) {
  const { lockTokens } = useLockProvider();
  const now = useAtomicDate();

  const lockPeriod = useCallback(
    (endTime: bigint) => {
      const nowSeconds = Math.floor(now.getTime() / 1000);
      const difference = Number(endTime) - nowSeconds;
      return difference >= 0 ? secondsToDays(difference) : 0;
    },
    [now]
  );

  return (
    <LockDropdown.Root
      onValueChange={(value) => {
        onTokenSelected(
          lockTokens.find((token) => token.id.toString() === value)
        );
      }}
      value={selectedLockToken?.id.toString()}
    >
      <LockDropdown.Trigger>
        Lock #{selectedLockToken?.id.toString()}
      </LockDropdown.Trigger>

      <LockDropdown.SelectList>
        {lockTokens.map((token) => (
          <LockDropdown.Item key={token.id} value={token.id.toString()}>
            Lock #{token.id.toString()}{" "}
            <span className="text-neutral-200 text-sm">
              {formatNumber(formatUnits(token.amount, token.decimals))} RCT
              locked for {lockPeriod(token.lockEnd)} days{" "}
            </span>
          </LockDropdown.Item>
        ))}
      </LockDropdown.SelectList>
    </LockDropdown.Root>
  );
}

function secondsToDays(seconds: number): number {
  return Math.floor(seconds / (60 * 60 * 24));
}
