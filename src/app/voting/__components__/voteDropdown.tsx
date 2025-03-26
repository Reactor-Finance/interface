import ManageLockDropdown from "@/app/lock/manageLockDialog/manageLockDropdown";
import { useVeNFTsProvider } from "@/contexts/veNFTsProvider";
import React, { useMemo } from "react";
import { useVoteProvider } from "../__contexts__/voteProvider";

export default function VoteDropdown() {
  const { lockTokens } = useVeNFTsProvider();
  const { setSelectedVeNFT, selectedVeNFT } = useVoteProvider();
  const selectedLockToken = useMemo(
    () =>
      lockTokens.find((token) => String(token.id) === String(selectedVeNFT)),
    [selectedVeNFT]
  );
  return (
    <div>
      {/* TODO: rename ManageLockDropdown */}
      <ManageLockDropdown
        selectedLockToken={selectedLockToken}
        onTokenSelected={(lock) => setSelectedVeNFT(lock?.id)}
        lockTokens={lockTokens}
      ></ManageLockDropdown>
    </div>
  );
}
