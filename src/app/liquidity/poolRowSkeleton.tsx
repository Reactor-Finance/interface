import { TableRow } from "@/components/ui/table";
import React from "react";

export default function PoolRowSkeleton() {
  return (
    <TableRow cols="11">
      <th className="col-span-4  rounded-md animate-pulse text-left flex">
        <div className="w-10 h-[40px] bg-neutral-800 rounded-full"></div>
        <div className="w-10 -ml-4 h-[40px] bg-neutral-800 rounded-full"></div>
      </th>
      <Skele />
      <Skele />
      <Skele />
      <Skele />
      <th className="text-left col-span-3 flex justify-end">
        <div className="h-6  rounded-md w-full bg-neutral-800 animate-pulse"></div>
      </th>
    </TableRow>
  );
}
function Skele() {
  return (
    <th className=" flex justify-end">
      <div className=" h-6 rounded-md w-20 bg-neutral-800 animate-pulse"></div>
    </th>
  );
}
