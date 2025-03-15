"use client";
import React from "react";

import barChart from "@/assets/bar-chart.svg";
import coin from "@/assets/coin.svg";
import house from "@/assets/house.svg";

import Image, { StaticImageData } from "next/image";
import { usePoolslistContext } from "@/contexts/poolsTvl";
import { Card } from "@/components/ui/card";
import { formatEther } from "viem";
import { formatNumber } from "@/lib/utils";

export default function LiquidityInfo() {
  const { totals } = usePoolslistContext();
  return (
    <div className="grid gap-x-4 md:grid-cols-3 border-b border-neutral-900 gap-y-2 pb-4">
      <InfoCard
        title="Total TVL"
        value={formatNumber(formatEther(totals?.totalTvl ?? 0n) ?? "0")}
        icon={house}
      />
      <InfoCard
        title="Fees"
        value={formatNumber(formatEther(totals?.totalFees ?? 0n) ?? "0")}
        icon={coin}
      />
      <InfoCard
        title="Volume"
        value={formatNumber(formatEther(totals?.totalVolume ?? 0n) ?? "0")}
        icon={barChart}
      />
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  value: string;
  title: string;
  icon: StaticImageData;
}) {
  return (
    <Card bg="950" className="py-[10px] px-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-primary-400 text-sm">{title}</h4>
          <span className="text-[16px] font-medium ">${value}</span>
        </div>
        <div>
          <Image src={icon} alt="Total Value Locked Icon" />
        </div>
      </div>
    </Card>
  );
}
