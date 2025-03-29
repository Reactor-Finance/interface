"use client";
import SearchInput from "@/components/shared/searchInput";
import Headers from "@/components/ui/headers";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useMemo } from "react";
import VoteTable from "./__components__/voteTable";
import { VoteProvider } from "./__contexts__/voteProvider";
import VotePower from "./__components__/votePower";
import VoteDropdown from "./__components__/voteDropdown";
import { useChainId, useReadContract } from "wagmi";
import { EXCHANGE_HELPER, VOTER } from "@/data/constants";
import * as ExchangeHelper from "@/lib/abis/ExchangeHelper";
import * as Voter from "@/lib/abis/Voter";
import { formatNumber } from "@/lib/utils";
import { formatEther } from "viem";
// import { useAtomicDate } from "@/lib/hooks/useAtomicDate";
import ReactCountdown from "react-countdown";

export default function Page() {
  const chainId = useChainId();
  const exchangeHelper = useMemo(() => EXCHANGE_HELPER[chainId], [chainId]);
  const voter = useMemo(() => VOTER[chainId], [chainId]);
  // const now = useAtomicDate();
  // Stats
  const { data: fees = [BigInt(0)] } = useReadContract({
    ...ExchangeHelper,
    address: exchangeHelper,
    functionName: "getFeesInUSDForAllPairs",
  });
  const { data: incentives = [BigInt(0)] } = useReadContract({
    ...ExchangeHelper,
    address: exchangeHelper,
    functionName: "getBribesInUSDForAllPairs",
  });
  const { data: currentEpoch = BigInt(0) } = useReadContract({
    ...Voter,
    address: voter,
    functionName: "_epochTimestamp",
  });

  const endsIn = useMemo(() => {
    const week = BigInt(60 * 60 * 24 * 7);
    return (currentEpoch + week) * 1000n;
  }, [currentEpoch]);
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
            <p className="text-neutral-100 text-sm">
              ${formatNumber(formatEther(fees[0]))}
            </p>
          </div>
          <div className="flex justify-between gap-x-6">
            <p className="text-neutral-400 text-sm">Total Incentives:</p>
            <p className="text-neutral-100 text-sm">
              ${formatNumber(formatEther(incentives[0]))}
            </p>
          </div>
          <div className="flex justify-between gap-x-6">
            <p className="text-neutral-400 text-sm">Total Rewards:</p>
            <p className="text-neutral-100 text-sm">
              ${formatNumber(formatEther(fees[0] + incentives[0]))}
            </p>
          </div>
          <ReactCountdown
            date={Number(endsIn)}
            renderer={({ days, hours, minutes, seconds, completed }) => (
              <div className="flex justify-between gap-x-6">
                <p className="text-neutral-400 text-sm">
                  Current epoch ends in:
                </p>
                {!completed ? (
                  <p className="text-neutral-100 text-sm">
                    {days}:{hours}:{minutes}:{seconds}
                  </p>
                ) : (
                  <p className="text-neutral-100 text-sm">Completed</p>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <div className="pt-12"></div>
      <h2 className="text-2xl">Pools</h2>

      <VoteProvider>
        <div className="flex justify-end pt-4 items-center">
          {/* <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value={"all"}>All</TabsTrigger>
              <TabsTrigger value={"stable"}>Most Rewarded</TabsTrigger>
              <TabsTrigger value={"vol"}>My Votes</TabsTrigger>
            </TabsList>
          </Tabs> */}
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
            <div className="w-[380px]">
              <VoteDropdown />
            </div>
          </div>
        </div>
        <div className="pt-4"></div>
        <div className="">
          <VotePower />
          <VoteTable />
        </div>
      </VoteProvider>
    </PageMarginContainer>
  );
}
