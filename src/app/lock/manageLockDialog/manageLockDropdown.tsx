import React, { useCallback } from "react";
import LockDropdown from "../lockDropdown";
import { formatUnits } from "viem";
import { formatNumber } from "@/lib/utils";
import { TLockToken } from "../types";
import { useAtomicDate } from "@/lib/hooks/useAtomicDate";

export default function ManageLockDropdown({
  selectedLockToken,
  onTokenSelected,
  lockTokens,
}: {
  selectedLockToken: TLockToken | undefined;
  onTokenSelected: (token?: TLockToken) => void;
  lockTokens: readonly TLockToken[];
}) {
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
        {selectedLockToken ? (
          <>
            Lock #{selectedLockToken?.id.toString()}{" "}
            <span className="text-neutral-200 text-sm">
              {formatNumber(
                formatUnits(
                  selectedLockToken.amount,
                  selectedLockToken.decimals
                )
              )}{" "}
              RCT
              <span className="text-[12px]">
                {" "}
                locked for {lockPeriod(selectedLockToken.lockEnd)} days{" "}
              </span>
            </span>
          </>
        ) : (
          <div>Select a lock</div>
        )}
      </LockDropdown.Trigger>

      <LockDropdown.SelectList>
        {lockTokens.map((token) => (
          <LockDropdown.Item key={token.id} value={token.id.toString()}>
            Lock #{token.id.toString()}{" "}
            <span className="text-neutral-200 text-sm">
              {formatNumber(formatUnits(token.amount, token.decimals))} RCT
              <span className="text-[12px]">
                {" "}
                locked for {lockPeriod(token.lockEnd)} days{" "}
              </span>
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
