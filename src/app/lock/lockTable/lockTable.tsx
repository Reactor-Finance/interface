"use client";
import React, { useState } from "react";
import ManageLockDialog from "../manageLockDialog/manageLockDialog";
import LockRow from "./lockRow";
import { useLockProvider } from "../lockProvider";

export default function LockTable() {
  const [manageDialogState, setManageDialogState] = useState(false);
  const { lockTokens } = useLockProvider();
  return (
    <>
      <ManageLockDialog
        open={manageDialogState}
        setOpen={setManageDialogState}
      />
      <table className="w-full pt-6">
        <caption className="h-0 opacity-0">Locks Table</caption>
        <thead className="text-neutral-400 text-sm">
          {lockTokens.length > 0 && (
            <tr className="grid grid-cols-8 px-6 py-2 font-medium">
              <th className="col-span-2 text-left">Lock ID</th>
              <th>Voting Power</th>
              <th>APR</th>
              <th>Rewards</th>
              <th>Unlock Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          )}
        </thead>

        <tbody className="flex flex-col gap-y-2">
          <tr className="py-4">
            <td>
              <p className="text-sm text-neutral-500 px-6">
                To receive incentives and fees, you need to create a lock and
                vote with it.
              </p>
            </td>
          </tr>
          {lockTokens?.map((lock) => (
            <LockRow
              key={lock.id.toString()}
              token={lock}
              setOpenModal={setManageDialogState}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
