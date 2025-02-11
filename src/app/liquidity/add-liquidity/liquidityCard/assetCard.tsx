import { Card } from "@/components/ui/card";
import React from "react";
import AssetSymbolAndName from "./assetSymbolAndName";
import { useAccount, useReadContracts } from "wagmi";
import { erc20Abi, formatUnits } from "viem";
import { TAddress } from "@/lib/types";
import Input from "@/components/ui/input";
import { inputPatternNumberMatch } from "@/utils";
interface Props {
  tokenAddress: TAddress;
  setTokenAmount: (address: string) => void;
  tokenAmount: string;
}
export default function AssetCard({
  tokenAddress,
  tokenAmount,
  setTokenAmount,
}: Props) {
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
        <div className="flex items-center">
          <Input
            aria-label="amount"
            className="w-[200px] md:text-lg px-1 py-1 bg-transparent border-none"
            placeholder="0"
            value={tokenAmount}
            onChange={(s) => {
              if (inputPatternNumberMatch(s.target.value, 18)) {
                setTokenAmount(s.target.value);
              }
            }}
          />
        </div>
        <AssetSymbolAndName tokenAddress={tokenAddress} />
      </div>
      <div className="flex justify-between text-[13px]">
        <span className="pl-1">-</span>
        <div className="flex gap-x-1">
          <div>{formatUnits(balanceOf ?? BigInt(0), decimals ?? 18)} </div>
          <button aria-label="Set Max Balance" className="text-primary-400">
            Max
          </button>
        </div>
      </div>
    </Card>
  );
}
