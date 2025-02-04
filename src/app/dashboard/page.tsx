"use client";
import React from "react";
import Headers from "@/components/ui/headers";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div>
      <div className="mx-auto px-8 xl:w-[1200px] 2xl:w-[1400px] pt-24">
        <Headers.GradiantHeaderOne colorOne="#A0055D" colorTwo="#836EF9">
          Dashboard
        </Headers.GradiantHeaderOne>
        <div className="pt-6">
          {/* input part goes here */}
        </div>
        <div className="pt-12">
          <div className="flex justify-between pt-12">
            <Headers.InfoHeaderTwo
              popupContent={<div>explanation goes here</div>}
            >
              Deposit & Staked Liquidity
            </Headers.InfoHeaderTwo>
            <Button variant={"primary"} size="md">
              New Deposit
            </Button>
          </div>
          <div className="pt-4">

          </div>
          <div className="text-start rounded-sm bg-neutral-1000 font-medium text-neutral-400 py-4 px-6">
            To receive emissions{" "}
            <span
              className="underline decoration-gray-500 font-semibold cursor-pointer text-white"
              onClick={() => {}}
            >
              deposit and stake
            </span>{" "}
            your liquidity first.
          </div>
        </div>
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
                <img src="/wheel.svg" alt="hive" className="w-6 h-6" />
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
      </div>
    </div>
  );
}
