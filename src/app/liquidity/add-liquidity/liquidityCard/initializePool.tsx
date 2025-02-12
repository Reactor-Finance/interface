import { Button } from "@/components/ui/button";
import React, { useCallback } from "react";
import AssetCard from "./assetCard";
import { TPoolType } from "@/lib/types";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useLiquidityCardFormProvider } from "./liquidityCardFormProvider";
import useGetAllowances from "./hooks/useGetAllowances";
import useCheckNeedsApproval from "./hooks/useCheckNeedsApproval";
import { useAddLiquidity } from "./hooks/useAddLiquidity";
export default function InitializePool() {
  const { tokenOne, tokenTwo } = useLiquidityCardFormProvider();
  const [tokenOneAmount, setTokenOneAmount] = React.useState("");
  const [tokenTwoAmount, setTokenTwoAmount] = React.useState("");
  const { tokenTwoAllowance, tokenOneAllowance } = useGetAllowances({
    tokenOne,
    tokenTwo,
  });
  const needsApprovals = useCheckNeedsApproval({
    tokenTwoAllowance,
    tokenOneAllowance,
    tokenTwoAmount,
    tokenOneAmount,
  });
  if (needsApprovals?.tokenOne) {
    console.log("approve");
  }
  if (needsApprovals?.tokenTwo) {
    console.log("approve");
  }
  const { poolType } = useLiquidityCardFormProvider();
  const { data } = useAddLiquidity({
    tokenOne,
    tokenTwo,
    tokenOneAmount,
    tokenTwoAmount,
    stable: poolType === TPoolType.STABLE,
  });
  const { writeContract, isPending, data: hash, reset } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const onSubmit = useCallback(() => {
    if (isSuccess) {
      reset();
    }
    if (data?.request) writeContract(data?.request);
  }, [data?.request, isSuccess, reset, writeContract]);
  const isApproving = needsApprovals?.tokenOne || needsApprovals?.tokenTwo;
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
        data-pending={isPending || isLoading || isSuccess ? "true" : "false"}
        onClick={onSubmit}
        variant="primary"
        disabled={!Boolean(data?.request) || isPending || isLoading}
        size="submit"
      >
        {!isPending && !isLoading && !isSuccess && !isApproving
          ? "Add Liquidity"
          : "Approve"}
        {isPending && "Waiting for Signature..."}
        {isLoading && "Transction Pending..."}
        {isSuccess && "Transaction Successful!"}
      </Button>
    </>
  );
}
