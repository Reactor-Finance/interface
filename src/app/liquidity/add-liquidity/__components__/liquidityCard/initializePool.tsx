import React, { useCallback, useEffect, useMemo, useState } from "react";
import AssetCard from "./assetCard";
import { TPoolType, TToken } from "@/lib/types";
import { useChainId, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import useGetAllowances from "./hooks/useGetAllowances";
import useCheckNeedsApproval from "./hooks/useCheckNeedsApproval";
import { useAddLiquidity } from "../../../__hooks__/useAddLiquidity";
import useApproveTokens from "./hooks/useApproveTokens";
import useInitializePoolValidation from "./hooks/useInitializePoolValidation";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "@/components/shared/submitBtn";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { isAddress, zeroAddress } from "viem";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { useTokenlistContext } from "@/contexts/tokenlistContext";
import { useCheckPair } from "@/lib/hooks/useCheckPair";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import { ROUTER } from "@/data/constants";

const searchParamsSchema = z.object({
  token0: z.string().refine((arg) => isAddress(arg)),
  token1: z.string().refine((arg) => isAddress(arg)),
  version: z.enum(["stable", "concentrated", "volatile"]),
});

export default function InitializePool() {
  // Wagmi parameters
  const chainId = useChainId();
  // Token list
  const { tokenlist } = useTokenlistContext();
  // Search params
  const params = useSearchParams();
  const [t0, t1, version] = useMemo(() => {
    const t0 = params.get("token0");
    const t1 = params.get("token1");
    const version = params.get("version");
    const param = { token0: t0, token1: t1, version };

    const afterParse = searchParamsSchema.safeParse(param);
    return (
      afterParse.success
        ? [
            afterParse.data.token0,
            afterParse.data.token1,
            afterParse.data.version,
          ]
        : [null, null, "volatile"]
    ) as [
      `0x${string}` | null,
      `0x${string}` | null,
      "stable" | "concentrated" | "volatile",
    ];
  }, [params]);

  // Tokens
  const [token0, token1] = useMemo(() => {
    const token0 = tokenlist.find((token) => token.address === t0);
    const token1 = tokenlist.find((token) => token.address === t1);
    return [token0, token1] as [TToken | undefined, TToken | undefined];
  }, [t0, t1, tokenlist]);

  // Amounts
  const [amount0, setAmount0] = useState(0);
  const [amount1, setAmount1] = useState(0);

  // Router
  const router = useMemo(() => ROUTER[chainId], [chainId]);

  // Check if pair exists
  const { pairExists } = useCheckPair({
    token0: t0 ?? zeroAddress,
    token1: t1 ?? zeroAddress,
    stable: version === "stable",
  });

  // Check approval required
  const { approveWriteRequest: token0ApprovalWriteRequest, needsApproval: token0NeedsApproval } = useApproveWrite({
    spender: router,
    tokenAddress: token0?.address ?? zeroAddress,
    decimals: token0?.decimals,
    amount: String(amount0)
  });

  const { approveWriteRequest: token1ApprovalWriteRequest, needsApproval: token1NeedsApproval } = useApproveWrite({
    spender: router,
    tokenAddress: token1?.address ?? zeroAddress,
    decimals: token1?.decimals,
    amount: String(amount1)
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
  const { data: approveSimulation, isLoading: isApproveTokensLoading } =
    useApproveTokens({
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
    if (isSuccess) {
      if (needsApprovals?.tokenOne) {
        queryClient.invalidateQueries({ queryKey: tokenOneQueryKey });
        reset();
        return;
      }
      if (needsApprovals?.tokenTwo) {
        queryClient.invalidateQueries({ queryKey: tokenTwoQueryKey });
        reset();
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isSuccess,
    needsApprovals?.tokenOne,
    needsApprovals?.tokenTwo,
    tokenOneQueryKey,
    tokenTwoQueryKey,
  ]);

  const approveTokenSymbol = useMemo(() => {
    if (needsApprovals?.tokenOne) {
      return tokenOneSymbol;
    }
    if (needsApprovals?.tokenTwo) {
      return tokenTwoSymbol;
    }
  }, [
    needsApprovals?.tokenOne,
    needsApprovals?.tokenTwo,
    tokenOneSymbol,
    tokenTwoSymbol,
  ]);
  const { state } = useGetButtonStatuses({
    isLoading,
    isPending,
    isFetching: isApproveTokensLoading,
    needsApproval: needsApprovals?.tokenOne || needsApprovals?.tokenTwo,
  });
  return (
    <>
      <h2 className="text-xl">
        {pairExists ? "Add Liquidity" : "Initialize Pool"}
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
      <SubmitButton
        state={state}
        isValid={poolValidation.isValid}
        approveTokenSymbol={approveTokenSymbol}
        onClick={onSubmit}
      >
        Add Liquidity
      </SubmitButton>
      <span className="text-[13px] text-red-400 pt-3 text-center">
        {poolValidation.error}
      </span>
    </>
  );
}
