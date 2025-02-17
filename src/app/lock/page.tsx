"use client";
import React from "react";
import Headers from "@/components/ui/headers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import ManageLockDialog from "./manageLockDialog/manageLockDialog";
import CreateLockDialog from "./createLockDialog/createLockDialog";
import HiveTable from "./hiveTable/hiveTable";
export default function Lock() {
  return (
    <div>
      <PageMarginContainer>
        <div className="flex justify-between">
          <div className="w-[640px]">
            <div className="">
              <Headers.GradiantHeaderOne
                colorOne="#A0055D"
                colorTwo="#836EF9F2"
              >
                Lock
              </Headers.GradiantHeaderOne>
            </div>
            <h2 className="text-neutral-300 pt-6 text-[13px]">
              Lock RCT into veRCT to earn and govern. Vote with veRCT to earn
              bribes and trading fees. veRCT can be transferred, merged and
              split. You can hold multiple positions.
            </h2>
          </div>
          <div>
            <CreateLockDialog />
          </div>
        </div>
        <div className="flex justify-between pt-12">
          <Headers.InfoHeaderTwo popupContent={<div></div>}>
            Locks
          </Headers.InfoHeaderTwo>
          <ManageLockDialog />
        </div>
        <div className="pt-8"></div>
        <table className="w-full pt-6">
          <caption className="h-0 opacity-0">Locks Table</caption>
          <thead className="text-neutral-400 text-sm">
            <tr className="grid grid-cols-8 px-6 py-2 font-medium">
              <th className="col-span-2 text-left">Lock ID</th>
              <th>Voting Power</th>
              <th>APR</th>
              <th>Rewards</th>
              <th>Unlock Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="grid text-center rounded-sm grid-cols-8 items-center bg-neutral-1000 py-2 px-6">
              <td className="bg-neutral-1000 text-left col-span-2">
                Row 1, Cell 1
              </td>
              <td className="">
                <span className="block">396 veRCT</span>
                <span className="block text-neutral-500 text-[12px]">
                  Locked 396 RCT
                </span>
              </td>
              <td className="">11.22</td>
              <td className="">0.00 RCT</td>
              <td className="">5 June 2025</td>
              <td className="">
                <Badge border="one" colors="success">
                  Success
                </Badge>
              </td>
              <td>
                <div className="flex gap-x-4 justify-end">
                  <Button variant={"primary"} size="xs">
                    Claim
                  </Button>
                  <Button variant={"outline"} size="xs">
                    Test
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="pt-16"></div>
        <Headers.InfoHeaderTwo popupContent={<div></div>}>
          Hive
        </Headers.InfoHeaderTwo>
        <HiveTable />
      </PageMarginContainer>
    </div>
  );
}
