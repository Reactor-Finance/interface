import { Button } from "@/components/ui/button";
import React, { useCallback } from "react";
import AssetCard from "./assetCard";
import { TAddress } from "@/lib/types";
import { useCreatePair } from "./hooks/useCreatePair";
import { useWriteContract } from "wagmi";
interface Props {
  tokenOne: TAddress;
  tokenTwo: TAddress;
}
export default function InitializePool({ tokenOne, tokenTwo }: Props) {
  const [tokenOneAmount, setTokenOneAmount] = React.useState("");
  const [tokenTwoAmount, setTokenTwoAmount] = React.useState("");
  const { data } = useCreatePair({ tokenOne, tokenTwo, stable: true });
  const { writeContract } = useWriteContract();
  console.log(data?.request);
  const onSubmit = useCallback(() => {
    if (data?.request) writeContract(data?.request);
  }, [data?.request, writeContract]);

  return (
    <>
      <h2 className="text-xl">Initialize Pool</h2>
      <div className="space-y-2">
        <div>
          <label htmlFor="">Asset 1</label>
        </div>
        <AssetCard
          setTokenAmount={setTokenOneAmount}
          tokenAmount={tokenOneAmount}
          tokenAddress={tokenOne}
        />
      </div>
      <div className="space-y-2">
        <div>
          <label htmlFor="">Asset 2</label>
        </div>
        <AssetCard
          setTokenAmount={setTokenTwoAmount}
          tokenAmount={tokenTwoAmount}
          tokenAddress={tokenTwo}
        />
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
      <Button
        onClick={onSubmit}
        variant="primary"
        disabled={!Boolean(data?.request)}
        size="submit"
      >
        Add Liquidity
      </Button>
    </>
  );
}
