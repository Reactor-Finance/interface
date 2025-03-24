"use client";
import PoolHeader from "@/components/shared/poolHeader";
import SearchInput from "@/components/shared/searchInput";
import VrctDropdown from "@/components/shared/vrctDropdown";
import Headers from "@/components/ui/headers";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import { SelectItem } from "@/components/ui/select";
import { TableBody, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TPoolType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Page() {
  return (
    <PageMarginContainer>
      <div className="rounded-lg flex flex-col sm:flex-row justify-between items-stretch  gap-y-6 sm:gap-y-0 sm:gap-x-16">
        <div className="text-left h-[120px] sm:w-1/2">
          <Headers.GradiantHeaderOne colorOne="#A0055D" colorTwo="#836EF9">
            Vote
          </Headers.GradiantHeaderOne>
          <p className=" pt-8 text-sm text-neutral-500">
            Use your veRCT to vote for directing emissions to your desired
            pools. Deposit voting incentives to encourage others to do the same.
          </p>
        </div>

        <div className=" space-y-2 flex flex-col justify-between ">
          <div className="flex justify-between gap-x-6">
            <p className="text-neutral-400 text-sm">Total Fees</p>
            <p className="text-neutral-100 text-sm">$165,000,000</p>
          </div>
          <div className="flex justify-between gap-x-6">
            <p className="text-neutral-400 text-sm">Total Incentives:</p>
            <p className="text-neutral-100 text-sm">$44,866,347</p>
          </div>
          <div className="flex justify-between gap-x-6">
            <p className="text-neutral-400 text-sm">Total Rewards:</p>
            <p className="text-neutral-100 text-sm">$44,866,347</p>
          </div>
          <div className="flex justify-between gap-x-6">
            <p className="text-neutral-400 text-sm">Epoch #85 Ends in:</p>
            <p className="text-neutral-100 text-sm">06:17:52:36</p>
          </div>
        </div>
      </div>
      <div className="pt-12"></div>
      <h2 className="text-2xl">Pools</h2>

      <div className="flex justify-between pt-4 items-center">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value={"all"}>All</TabsTrigger>
            <TabsTrigger value={"stable"}>Stable</TabsTrigger>
            <TabsTrigger value={"vol"}>Volatile</TabsTrigger>
            {/* <TabsTrigger value={TabValues.CONCENTRATED}> */}
            {/*   Concentrated */}
            {/* </TabsTrigger> */}
          </TabsList>
        </Tabs>
        <div className="gap-x-4 flex ">
          <div className="w-[285px]">
            <SearchInput
              className="bg-neutral-950 w-[285px]"
              value={""}
              setValue={(value) => {
                console.log(value);
              }}
            ></SearchInput>
          </div>
          <div className="w-[300px]">
            <VrctDropdown placeholder="Select your veRCT">
              <SelectItem value="hello">Hello</SelectItem>
            </VrctDropdown>
          </div>
        </div>
      </div>
      <div className="pt-4"></div>
      <div className="relative">
        <div className="py-2 z-20 px-3 flex gap-x-10 absolute rounded-md bottom-5 -translate-x-1/2 left-1/2 items-center bg-neutral-950">
          <span>
            Voting power used: <span className="text-blue-light">0.3%</span>
          </span>
          <Button variant="filled">Vote</Button>
        </div>
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
            <ExampleRow />
            <ExampleRow />
            <ExampleRow />
            <ExampleRow />
            <ExampleRow />
          </TableBody>
        </table>
      </div>
    </PageMarginContainer>
  );
}
function ExampleRow() {
  return (
    <TableRow cols="10" className="z-10">
      <td className="col-span-3">
        <PoolHeader
          poolType={TPoolType.CONCENTRATED}
          token0={{
            symbol: "ETH",
            address: "0x123",
            decimals: 18,
            logoURI: "https://example.com",
            name: "Ethereum",
            chainId: 1,
          }}
          token1={{
            symbol: "ETH",
            address: "0x123",
            decimals: 18,
            logoURI: "https://example.com",
            name: "Ethereum",
            chainId: 1,
          }}
        />
      </td>
      <td className="text-right">!108,198,100</td>
      <td>11.22%</td>
      <td>~43,279.55</td>
      <td>131331</td>
      <td>131331</td>
      <td>131331</td>
      <td>
        <div className="bg-neutral-800 justify-between rounded-md p-2 flex gap-x-2">
          <div className="flex gap-x-1">
            <input
              placeholder="0"
              className="w-[20px] focus:ring-transparent transition-all focus:w-[35px] bg-transparent"
            />
            <span className="text-neutral-400">%</span>
          </div>
          <button className="text-primary-400 disabled:text-neutral-500">
            Max
          </button>
        </div>
      </td>
    </TableRow>
  );
}
