import { Card } from "@/components/ui/card";
import React, { useMemo } from "react";
import AssetSymbolAndName from "./assetSymbolAndName";
import { formatUnits } from "viem";
import { TToken } from "@/lib/types";
import Input from "@/components/ui/input";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { formatNumber } from "@/lib/utils";

interface Props {
  token: TToken;
  onValueChange: (value: number) => any;
  value: number;
}

export default function AssetCard({ token, onValueChange, value }: Props) {
  const balance = useGetBalance({ tokenAddress: token.address });
  const formattedBalance = useMemo(
    () => Number(formatNumber(formatUnits(balance, token.decimals))),
    [balance, token.decimals]
  );
  return (
    <Card border="900" className="py-3 rounded-md px-4 space-y-2">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Input
            aria-label="amount"
            className="w-[200px] md:text-lg px-1 py-1 bg-transparent border-none"
            placeholder="0"
            value={value}
            onChange={(s) => {
              onValueChange(Number(s));
            }}
          />
        </div>
        <AssetSymbolAndName tokenAddress={token.address} />
      </div>
      <div className="flex justify-between text-[13px]">
        <span className="pl-1">-</span>
        <div className="flex gap-x-1">
          <div>{formattedBalance} </div>
          <button
            onClick={() => onValueChange(formattedBalance)}
            aria-label="Set Max Balance"
            className="text-primary-400"
          >
            Max
          </button>
        </div>
      </div>
    </Card>
  );
}
