import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect } from "react";
import AssetCard from "./assetCard";
import { TPoolType } from "@/lib/types";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useLiquidityCardFormProvider } from "./liquidityCardFormProvider";
import useGetAllowances from "./hooks/useGetAllowances";
import useCheckNeedsApproval from "./hooks/useCheckNeedsApproval";
import { useAddLiquidity } from "./hooks/useAddLiquidity";
import useApproveTokens from "./hooks/useApproveTokens";
import useInitializePoolValidation from "./hooks/useInitializePoolValidation";
import { useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const [tokenOneDeposit, setTokenOneDeposit] = React.useState("");
  const [tokenTwoDeposit, setTokenTwoDeposit] = React.useState("");
  const {
    tokenTwoAllowance,
    tokenOneAllowance,
    tokenOneQueryKey,
    tokenTwoQueryKey,
  } = useGetAllowances({
    tokenOne,
    tokenTwo,
  });
  const needsApprovals = useCheckNeedsApproval({
    tokenTwoAllowance,
    tokenOneAllowance,
    tokenTwoDeposit,
    tokenOneDeposit,
  });
  console.log(needsApprovals);
  const { data: approveSimulation } = useApproveTokens({
    approveTokenOne: needsApprovals?.tokenOne ?? false,
    approveTokenTwo: needsApprovals?.tokenTwo ?? false,
  });

  const isApproving = Boolean(
    needsApprovals?.tokenOne || needsApprovals?.tokenTwo
  );

  const { data: addLiquiditySimulation } = useAddLiquidity({
    tokenOne,
    tokenTwo,
    isApproving,
    tokenOneDeposit,
    tokenTwoDeposit,
    stable: poolType === TPoolType.STABLE,
  });
  const { writeContract, isPending, data: hash, reset } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const vaultValidation = useInitializePoolValidation({
    isApproveSimulationValid: Boolean(approveSimulation?.request),
    isAddLiquiditySimulationValid: Boolean(addLiquiditySimulation?.request),
    tokenOneDeposit,
    tokenTwoDeposit,
    isApproving,
    isSuccess,
  });
  console.log(vaultValidation);
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
  useEffect(() => {
    if (!isSuccess) return;
    if (needsApprovals?.tokenOne) {
      queryClient.invalidateQueries({ queryKey: tokenOneQueryKey });
      return;
    }
    if (needsApprovals?.tokenTwo) {
      queryClient.invalidateQueries({ queryKey: tokenTwoQueryKey });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isSuccess,
    needsApprovals?.tokenOne,
    needsApprovals?.tokenTwo,
    tokenOneQueryKey,
    tokenTwoQueryKey,
  ]);

  const action = isApproving
    ? `Approve ${needsApprovals?.tokenOne ? "USDT" : "DAI"}`
    : "Add Liquidity";
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
        disabled={isPending || isLoading || !vaultValidation.isValid}
        size="submit"
      >
        {!isPending && !isLoading && !isSuccess && action}
        {isPending && "Waiting for Signature..."}
        {isLoading && "Transction Pending..."}
        {isSuccess && "Success!"}
      </Button>
      <span className="text-[13px] text-red-400 pt-3 text-center">
        {vaultValidation.error}
      </span>
    </>
  );
}
