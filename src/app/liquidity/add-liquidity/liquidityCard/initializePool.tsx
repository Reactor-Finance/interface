import { Button } from "@/components/ui/button";
import React, { useCallback } from "react";
import AssetCard from "./assetCard";
import { TPoolType } from "@/lib/types";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useLiquidityCardFormProvider } from "./liquidityCardFormProvider";
import useGetAllowances from "./hooks/useGetAllowances";
import useCheckNeedsApproval from "./hooks/useCheckNeedsApproval";
import { useAddLiquidity } from "./hooks/useAddLiquidity";
import useApproveTokens from "./hooks/useApproveTokens";
import useInitializeVaultValidation from "./hooks/useInitializeVaultValidation";
export default function InitializePool() {
  const {
    tokenOne,
    tokenTwo,
    tokenOneDecimals,
    tokenTwoDecimals,
    tokenOneBalance,
    tokenTwoBalance,
    poolType,
  } = useLiquidityCardFormProvider();
  const [tokenOneDeposit, setTokenOneDeposit] = React.useState("");
  const [tokenTwoDeposit, setTokenTwoDeposit] = React.useState("");
  const { tokenTwoAllowance, tokenOneAllowance } = useGetAllowances({
    tokenOne,
    tokenTwo,
  });
  const needsApprovals = useCheckNeedsApproval({
    tokenTwoAllowance,
    tokenOneAllowance,
    tokenTwoDeposit,
    tokenOneDeposit,
  });
  const { data: addLiquiditySimulation } = useAddLiquidity({
    tokenOne,
    tokenTwo,
    tokenOneDeposit,
    tokenTwoDeposit,
    stable: poolType === TPoolType.STABLE,
  });
  const { data: approveSimulation } = useApproveTokens({
    approveTokenOne: needsApprovals?.tokenOne ?? false,
    approveTokenTwo: needsApprovals?.tokenTwo ?? false,
  });

  const isApproving = Boolean(
    needsApprovals?.tokenOne || needsApprovals?.tokenTwo
  );
  const valid = useInitializeVaultValidation({
    isApproveSimulationValid: Boolean(approveSimulation?.request),
    isAddLiquiditySimulationValid: Boolean(addLiquiditySimulation?.request),
    tokenOneDeposit,
    tokenTwoDeposit,
    isApproving,
  });
  console.log(valid);
  const { writeContract, isPending, data: hash, reset } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const onSubmit = useCallback(() => {
    if (isSuccess) {
      reset();
      return;
    }
    if (approveSimulation?.request) {
      writeContract(approveSimulation?.request);
      return;
    }
    if (addLiquiditySimulation?.request)
      writeContract(addLiquiditySimulation?.request);
  }, [
    addLiquiditySimulation?.request,
    approveSimulation?.request,
    isSuccess,
    reset,
    writeContract,
  ]);
  return (
    <>
      <h2 className="text-xl">Initialize Pool</h2>
      <div className="space-y-2">
        <div>
          <label htmlFor="">Asset 1</label>
        </div>
        <AssetCard
          setTokenDeposit={setTokenOneDeposit}
          tokenDeposit={tokenOneDeposit}
          balanceOf={tokenOneBalance}
          decimals={tokenOneDecimals}
          tokenAddress={tokenOne}
        />
      </div>
      <div className="space-y-2">
        <div>
          <label htmlFor="">Asset 2</label>
        </div>
        <AssetCard
          tokenDeposit={tokenTwoDeposit}
          setTokenDeposit={setTokenTwoDeposit}
          balanceOf={tokenTwoBalance}
          decimals={tokenTwoDecimals}
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
        disabled={isPending || isLoading}
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
