import ManageLockDropdown from "@/app/lock/manageLockDialog/manageLockDropdown";
import { TLockToken } from "@/app/lock/types";
import { useVeNFTsProvider } from "@/contexts/veNFTsProvider";
import React from "react";
import { useVoteProvider } from "./voteProvider";

export default function VoteDropdown() {
  const { lockTokens } = useVeNFTsProvider();
  const { setSelectedVRCT, selectedVeNFT } = useVoteProvider();
  return (
    <div>
      {/* TODO: rename ManageLockDropdown */}
      <ManageLockDropdown
        selectedLockToken={selectedVeNFT}
        onTokenSelected={function (token?: TLockToken): void {
          setSelectedVRCT(token);
        }}
        lockTokens={lockTokens}
      ></ManageLockDropdown>
    </div>
  );
}
