"use client";
import React, { useMemo } from "react";

import barChart from "@/assets/bar-chart.svg";
import coin from "@/assets/coin.svg";
import house from "@/assets/house.svg";

import Image, { StaticImageData } from "next/image";
import { Card } from "@/components/ui/card";
import { formatEther } from "viem";
import { formatNumber } from "@/lib/utils";
import { useChainId, useReadContract } from "wagmi";
import { EXCHANGE_HELPER } from "@/data/constants";
import * as ExchangeHelper from "@/lib/abis/ExchangeHelper";
import { useAtomicDate } from "@/lib/hooks/useAtomicDate";

export default function LiquidityInfo() {
  const now = useAtomicDate();
  const { t, yesterday } = useMemo(() => {
    const t = Math.floor(now.getTime() / 1000);
    const gap = 86400; // 24 hours
    const yesterday = t - gap;
    return { t, yesterday };
  }, [now]);
  const chainId = useChainId();
  const exchangeHelper = useMemo(() => EXCHANGE_HELPER[chainId], [chainId]);
  const { data: tvlData = [BigInt(0)] } = useReadContract({
    ...ExchangeHelper,
    address: exchangeHelper,
    functionName: "getTVLInUSDForAllPairs",
  });
  const { data: feesData = [BigInt(0)] } = useReadContract({
    ...ExchangeHelper,
    address: exchangeHelper,
    functionName: "getFeesInUSDForAllPairs",
  });
  const { data: volume24hrData = [BigInt(0)] } = useReadContract({
    ...ExchangeHelper,
    address: exchangeHelper,
    functionName: "getTotalVolumeLockedPerTime",
    args: [BigInt(yesterday), BigInt(t)],
  });
  return (
    <div className="grid gap-x-4 md:grid-cols-3 border-b border-neutral-900 gap-y-2 pb-4">
      <InfoCard
        title="TVL"
        value={formatNumber(formatEther(tvlData[0]))}
        icon={house}
      />
      <InfoCard
        title="Fees"
        value={formatNumber(formatEther(feesData[0]))}
        icon={coin}
      />
      <InfoCard
        title="Volume"
        value={formatNumber(formatEther(volume24hrData[0]))}
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
