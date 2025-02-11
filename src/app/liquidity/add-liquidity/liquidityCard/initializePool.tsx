import { Button } from "@/components/ui/button";
import React from "react";
import AssetCard from "./assetCard";
import { TAddress } from "@/lib/types";
interface Props {
  tokenOne: TAddress;
  tokenTwo: TAddress;
}
export default function InitializePool({ tokenOne, tokenTwo }: Props) {
  return (
    <>
      <h2 className="text-xl">Initialize Pool</h2>
      <div className="space-y-2">
        <div>
          <label htmlFor="">Asset 1</label>
        </div>
        <AssetCard tokenAddress={tokenOne} />
      </div>
      <div className="space-y-2">
        <div>
          <label htmlFor="">Asset 2</label>
        </div>
        <AssetCard tokenAddress={tokenTwo} />
      </div>

      <div className="">
        <h5>Starting Liquidity Info</h5>
        <div className="pt-1"></div>
        <div className="space-y-1">
          <div className="flex text-neutral-300 text-sm justify-between">
            <span>USDC per USDT</span>
            <span>-</span>
          </div>
          <div className="flex text-neutral-300 text-sm justify-between">
            <span>USDC per USDT</span>
            <span>-</span>
          </div>
        </div>
      </div>
      <Button variant="primary" disabled size="submit">
        Add Liquidity
      </Button>
    </>
  );
}
