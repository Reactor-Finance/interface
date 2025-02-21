"use client";

import React, { useState } from "react";
import Headers from "@/components/ui/headers";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InnerLabelInput from "./input";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import wheel from "@/assets/wheel.svg";
import PoolTable from "./pool_table";
import { DashboardLiquidityProvider } from "./dashLiquidityProvider";

export default function Dashboard() {
  const [isPoolTableOpen, setIsPoolTableOpen] = useState(false);
  return (
    <div>
      <PageMarginContainer>
        <Headers.GradiantHeaderOne colorOne="#A0055D" colorTwo="#836EF9">
          Dashboard
        </Headers.GradiantHeaderOne>
        <div className="pt-4"></div>
        <div className="flex gap-3">
          {/* input part goes here */}
          <InnerLabelInput label="Account" />

          <div className="relative inline-flex items-center justify-between gap-2 rounded-sm border border-neutral-900 bg-transparent px-4 py-2 h-[34px]">
            <span className="text-white text-sm opacity-70">
              Claimable Rewards:
            </span>
            <div className="flex items-center gap-2 justify-between">
              <div className="inline-block text-white text-sm tracking-tighter">
                $0
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6"></div>
        <DashboardLiquidityProvider>
          <div>
            <div className="flex justify-between">
              <Headers.InfoHeaderTwo
                popupContent={<div>explanation goes here</div>}
              >
                Deposit & Staked Liquidity
              </Headers.InfoHeaderTwo>
              <Button variant={"primary"} size="md">
                New Deposit
              </Button>
            </div>
            <div className="pt-6"></div>
            {isPoolTableOpen ? (
              <PoolTable />
            ) : (
              <div className="text-start rounded-sm bg-neutral-1000 font-medium text-neutral-400 py-4 px-6">
                To receive emissions{" "}
                <span
                  className="underline decoration-gray-500 font-semibold cursor-pointer text-white"
                  onClick={() => {
                    setIsPoolTableOpen(true);
                  }}
                >
                  deposit and stake
                </span>{" "}
                your liquidity first.
              </div>
            )}
          </div>
        </DashboardLiquidityProvider>
        <div className="pt-16"></div>
        <Headers.InfoHeaderTwo popupContent={<div>explanation goes here</div>}>
          Locks
        </Headers.InfoHeaderTwo>
        <div className="pt-6"></div>
        <div className="text-start rounded-sm bg-neutral-1000 font-medium text-neutral-400 py-4 px-6">
          To receive incentives and fees, you need to create a lock and vote
          with it.
        </div>
        <div className="pt-6"></div>
        <div className="text-start rounded-sm bg-neutral-1000 font-medium text-neutral-400 py-4 px-6 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-[40px] h-[40px] rounded-[8px] bg-neutral-950 flex items-center justify-center">
                <Image src={wheel} alt="hive" className="w-6 h-6" />
              </div>
              <div>
                <div className="text-white font-semibold">Hive Strategies</div>
                <div className="text-neutral-400 text-sm">
                  You can deposit your locks into a Hive strategy if you want to
                  maximize your voting power.
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button size={"sm"} variant={"outline"}>
              Explore Hives
            </Button>
          </div>
        </div>
      </PageMarginContainer>
    </div>
  );
}
