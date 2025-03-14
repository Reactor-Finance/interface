import React from "react";
import Headers from "@/components/ui/headers";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import { Card } from "@/components/ui/card";
import barChart from "@/assets/bar-chart.svg";
import coin from "@/assets/coin.svg";
import house from "@/assets/house.svg";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import PoolsTable from "./poolsTable";

export default async function Page() {
  return (
    <PageMarginContainer>
      <Headers.GradiantHeaderOne colorOne="#A0055D" colorTwo="#836EF9">
        Liquidity
      </Headers.GradiantHeaderOne>
      <div className="pt-6"></div>
      <Card bg="1000" className="p-6 space-y-4">
        <div>
          <h2 className="text-[16px]">
            Liquidity Providers (LPs) make low-slippage swaps possible.
          </h2>
          <h3 className="text-neutral-200 text-sm">
            Stake liquidity to earn trading fees and rewards.
          </h3>
        </div>
        <div className="grid gap-x-4 md:grid-cols-3 border-b border-neutral-900 gap-y-2 pb-4">
          <InfoCard title="Total TVL" icon={house} />
          <InfoCard title="Fees" icon={coin} />
          <InfoCard title="Volume" icon={barChart} />
        </div>
        <div className="flex justify-between items-center">
          <h4 className="text-[13px] text-neutral-500 hidden md:block">
            There are currently{" "}
            <span className="text-neutral-200">10 tokens</span> listed.{" "}
            <span className="underline text-neutral-300">View Tokens</span> or{" "}
            <span className="underline text-neutral-300">List new token</span>
          </h4>
          <a href="/liquidity/deposit">
            <Button variant="filled">Deposit Liquidity</Button>
          </a>
        </div>
      </Card>
      <div className="pt-12"></div>
      <h2 className="text-2xl">Pools</h2>
      <PoolsTable />
    </PageMarginContainer>
  );
}

function InfoCard({ icon, title }: { title: string; icon: StaticImageData }) {
  return (
    <Card bg="950" className="py-[10px] px-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-primary-400 text-sm">{title}</h4>
          <span className="text-[16px] font-medium ">N/A</span>
        </div>
        <div>
          <Image src={icon} alt="Total Value Locked Icon" />
        </div>
      </div>
    </Card>
  );
}
