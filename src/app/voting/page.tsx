"use client";
import SearchInput from "@/components/shared/searchInput";
import VrctDropdown from "@/components/shared/vrctDropdown";
import Headers from "@/components/ui/headers";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import { SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import VoteTable from "./__components__/voteTable";
import { VoteProvider } from "./__components__/voteProvider";
import VotePower from "./__components__/votePower";

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

      <VoteProvider>
        <div className="flex justify-between pt-4 items-center">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value={"all"}>All</TabsTrigger>
              <TabsTrigger value={"stable"}>Most Rewarded</TabsTrigger>
              <TabsTrigger value={"vol"}>My Votes</TabsTrigger>
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
          <VotePower />
          <VoteTable />
        </div>
      </VoteProvider>
    </PageMarginContainer>
  );
}
