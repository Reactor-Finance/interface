import React from "react";

export default function PoolsTable() {
  return (
    <table className="w-full">
      <thead className="text-neutral-400 text-sm text-right w-full">
        <tr className=" grid grid-cols-11 gap-x-4 px-4">
          <th className="col-span-4 text-left"># Pool Name</th>
          <th className="">TVL</th>
          <th>APR</th>
          <th>Volume</th>
          <th>Fees</th>
          <th className="text-left col-span-3 ">Liquidity Manager</th>
        </tr>
      </thead>
      <tbody className="gap-y-2 pt-2 flex flex-col">
        <tr className=" grid grid-cols-11 text-right gap-x-4 py-4 bg-neutral-1050 px-4 rounded-md">
          <th className="col-span-4 text-left"># Pool Name</th>
          <th className="">TVL</th>
          <th>APR</th>
          <th>Volume</th>
          <th>Fees</th>
          <th className="text-left col-span-3 ">Liquidity Manager</th>
        </tr>
      </tbody>
    </table>
  );
}
