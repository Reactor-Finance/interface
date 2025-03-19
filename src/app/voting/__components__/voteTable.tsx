import React from "react";
import VoteRow from "./voteRow";
import { TableBody } from "@/components/ui/table";

export default function VoteTable() {
  return (
    <table className="w-full">
      <thead>
        <tr className="grid grid-cols-10 gap-x-4 px-4 text-neutral-500 text-sm font-normal text-right">
          <th className="col-span-3 text-left">Pool Name</th>
          <th className="text-right">Pool Name</th>
          <th>Pool Name</th>
          <th>Pool Name</th>
          <th>Pool Name</th>
          <th>Pool Name</th>
          <th>Pool Name</th>
          <th className="text-right">Pool Name</th>
        </tr>
      </thead>
      <TableBody>
        <VoteRow id="1" />
        <VoteRow id="2" />
        <VoteRow id="3" />
      </TableBody>
    </table>
  );
}
