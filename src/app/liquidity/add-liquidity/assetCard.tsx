"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import AssetSymbolAndName from "./assetSymbolAndName";
import { useAccount, useReadContracts } from "wagmi";
import { erc20Abi, formatUnits } from "viem";
import { TAddress } from "@/lib/types";

export default function AssetCard({
  tokenAddress,
}: {
  tokenAddress: TAddress;
}) {
  const { address } = useAccount();
  const { data: tokenInfo } = useReadContracts({
    contracts: [
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address ?? "0x"],
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
      },
    ],
    query: {
      enabled: Boolean(address),
    },
  });
  const balanceOf = tokenInfo?.[0].result;
  const decimals = tokenInfo?.[1].result;
  return (
    <Card border="900" className="py-3 rounded-md px-4 space-y-2">
      <div className="flex justify-between">
        <span>0</span>
        <AssetSymbolAndName tokenAddress={tokenAddress} />
      </div>
      <div className="flex justify-between text-[13px]">
        <span>-</span>
        <div className="flex gap-x-1">
          <div>{formatUnits(balanceOf ?? BigInt(0), decimals ?? 18)} </div>
          <button className="text-primary-400">Max</button>
        </div>
      </div>
    </Card>
  );
}
