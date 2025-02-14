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
import { api } from "@/trpc/react";
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
  const { data: pool } = api.pool.findPool.useQuery({
    tokenOneAddress: tokenOne,
    tokenTwoAddress: tokenTwo,
    isStable: poolType === TPoolType.STABLE,
  });

  const queryClient = useQueryClient();
  const [tokenDeposits, setTokenDeposits] = React.useState({
    tokenOneDeposit: "",
    tokenTwoDeposit: "",
  });
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
    tokenDeposits,
  });
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
    tokenDeposits,
    isApproving,
    stable: poolType === TPoolType.STABLE,
  });
  const { writeContract, isPending, data: hash, reset } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const poolValidation = useInitializePoolValidation({
    isApproveSimulationValid: Boolean(approveSimulation?.request),
    isAddLiquiditySimulationValid: Boolean(addLiquiditySimulation?.request),
    isApproving,
    tokenDeposits,
    isSuccess,
  });
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
      <h2 className="text-xl">
        {(pool?.pairs.length ?? 0) > 0 ? "Add Liquidity" : "Initialize Pool"}
      </h2>{" "}
      <div className="space-y-2">
        <div>
          <label htmlFor="">Asset 1</label>
        </div>
        <AssetCard
          setTokenDeposit={(s: string) => {
            setTokenDeposits((d) => ({ ...d, tokenOneDeposit: s }));
          }}
          tokenDeposit={tokenDeposits.tokenOneDeposit}
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
          setTokenDeposit={(s: string) => {
            setTokenDeposits((d) => ({ ...d, tokenTwoDeposit: s }));
          }}
          tokenDeposit={tokenDeposits.tokenTwoDeposit}
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
        disabled={isPending || isLoading || !poolValidation.isValid}
        size="submit"
      >
        {!isPending && !isLoading && !isSuccess && action}
        {isPending && "Waiting for Signature..."}
        {isLoading && "Transction Pending..."}
        {isSuccess && "Success!"}
      </Button>
      <span className="text-[13px] text-red-400 pt-3 text-center">
        {poolValidation.error}
      </span>
    </>
  );
}
