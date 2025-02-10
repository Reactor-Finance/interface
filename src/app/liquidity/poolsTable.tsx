import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import PoolRow from "./poolRow";
export default function PoolsTable() {
  return (
    <>
      <table className="w-full">
        <thead className="text-neutral-400 text-sm text-right w-full">
          <tr className=" grid grid-cols-11 gap-x-4 px-4">
            <th className="col-span-4 text-left flex gap-x-4">
              <span>#</span> <span>Pool Name</span>
            </th>
            <th className="">TVL</th>
            <th>APR</th>
            <th>Volume</th>
            <th>Fees</th>
            <th className="text-left col-span-3 ">Liquidity Manager</th>
          </tr>
        </thead>
        <tbody className="gap-y-2 pt-2 flex flex-col">
          <PoolRow />
          <PoolRow />
          <PoolRow />
          <PoolRow />
        </tbody>
      </table>

      <div className="pt-2 block">
        <p className="text-[13px]">
          Page 1 of 34{" "}
          <span className="text-neutral-300">(1 - 250 results)</span>
        </p>
        <div className="flex">
          <button>
            <ChevronLeft className="text-white" />
          </button>
          <button>
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
