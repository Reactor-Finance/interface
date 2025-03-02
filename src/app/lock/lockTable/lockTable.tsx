"use client";
import React, { useState } from "react";
import ManageLockDialog from "../manageLockDialog/manageLockDialog";
import LockRow from "./lockRow";
import { useCheckUserVeNFTs } from "@/lib/hooks/useCheckUserVeNFTs";
import { TLockToken } from "../types";

export default function LockTable() {
  const [manageDialogOpen, setManageDialogOpen] = useState(false);
  const [selectedLockToken, setSelectedLockToken] = useState<TLockToken>();
  const lockTokens = useCheckUserVeNFTs();
  return (
    <>
      <ManageLockDialog
        open={manageDialogOpen}
        setOpen={setManageDialogOpen}
        selectedToken={selectedLockToken}
        reset={() => setSelectedLockToken(undefined)}
        onDropdownChange={setSelectedLockToken}
      />
      <table className="w-full pt-6">
        <caption className="h-0 opacity-0">Locks Table</caption>
        <thead className="text-neutral-400 text-sm">
          {lockTokens.length > 0 && (
            <tr className="grid grid-cols-8 px-6 py-2 font-medium">
              <th className="col-span-2 text-left">Lock ID</th>
              <th>Voting Power</th>
              <th>Rewards</th>
              <th>Unlock Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          )}
        </thead>

        <tbody className="flex flex-col gap-y-2">
          {!lockTokens.length && (
            <tr className="rounded-sm items-center bg-neutral-1000 py-2 px-6">
              <td>
                <p className="text-sm text-neutral-500 px-6">
                  To receive incentives and fees, you need to create a lock and
                  vote with it.
                </p>
              </td>
            </tr>
          )}
          {lockTokens.map((lock) => (
            <LockRow
              key={lock.id.toString()}
              token={lock}
              setOpenModal={setManageDialogOpen}
              onLockActionMenuClicked={setSelectedLockToken}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
