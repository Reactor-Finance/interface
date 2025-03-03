"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import AssetCard from "./assetCard";
import { useChainId, useWriteContract } from "wagmi";
import { useAddLiquidity } from "../../../__hooks__/useAddLiquidity";
import SubmitButton from "@/components/shared/submitBtn";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { formatUnits, isAddress, parseUnits, zeroAddress } from "viem";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { useCheckPair } from "@/lib/hooks/useCheckPair";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import { ROUTER } from "@/data/constants";
import { useQuoteLiquidity } from "@/app/liquidity/__hooks__/useQuoteLiquidity";
import { BaseError } from "@wagmi/core";
import { useGetTokenInfo } from "@/utils";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { useQueryClient } from "@tanstack/react-query";

const searchParamsSchema = z.object({
  token0: z.string().refine((arg) => isAddress(arg)),
  token1: z.string().refine((arg) => isAddress(arg)),
  version: z.enum(["stable", "concentrated", "volatile"]),
});

export default function InitializePool() {
  // Wagmi parameters
  const chainId = useChainId();
  // Token list
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
  const token0 = useGetTokenInfo(t0 ?? "0x");
  const token1 = useGetTokenInfo(t1 ?? "0x");

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

  // Quote liquidity
  const quoteLiquidity = useQuoteLiquidity({
    token0: t0 ?? zeroAddress,
    token1: t1 ?? zeroAddress,
    stable: version === "stable",
    amountIn: parseUnits(String(amount0), token0?.decimals ?? 18),
  });

  // Check approval required
  const {
    approveWriteRequest: token0ApprovalWriteRequest,
    needsApproval: token0NeedsApproval,
    isFetching: token0ApprovalFetching,
    allowanceKey: token0AllowanceKey,
  } = useApproveWrite({
    spender: router,
    tokenAddress: token0?.address ?? zeroAddress,
    decimals: token0?.decimals,
    amount: String(amount0),
  });

  const {
    approveWriteRequest: token1ApprovalWriteRequest,
    needsApproval: token1NeedsApproval,
    isFetching: token1ApprovalFetching,
    allowanceKey: token1AllowanceKey,
  } = useApproveWrite({
    spender: router,
    tokenAddress: token1?.address ?? zeroAddress,
    decimals: token1?.decimals,
    amount: String(amount1),
  });

  // Amounts parsed
  const amountADesired = useMemo(
    () => parseUnits(String(amount0), token0?.decimals ?? 18),
    [amount0, token0]
  );
  const amountBDesired = useMemo(
    () =>
      pairExists && quoteLiquidity > BigInt(0)
        ? quoteLiquidity
        : parseUnits(String(amount1), token1?.decimals ?? 18),
    [amount1, token1, pairExists, quoteLiquidity]
  );
  const {
    addLiquidityETHSimulation,
    addLiquiditySimulation,
    isAddLiquidityETH,
  } = useAddLiquidity({
    token0: token0?.address ?? zeroAddress,
    token1: token1?.address ?? zeroAddress,
    amountADesired,
    amountBDesired,
    stable: version === "stable",
  });

  const {
    writeContract,
    reset,
    isPending,
    data: hash,
    error: writeContractError,
  } = useWriteContract(); // We'll also call reset when transaction toast is closed
  const { txReceipt, updateState } = useTransactionToastProvider();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (txReceipt.isSuccess) {
      if (token0NeedsApproval) {
        queryClient.invalidateQueries({ queryKey: token0AllowanceKey });
      }
      if (token1NeedsApproval) {
        queryClient.invalidateQueries({ queryKey: token1AllowanceKey });
      }
      reset();
    }
  }, [
    queryClient,
    reset,
    token0AllowanceKey,
    token0NeedsApproval,
    token1AllowanceKey,
    token1NeedsApproval,
    txReceipt.isSuccess,
  ]);
  useEffect(() => {
    updateState({
      hash,
    });
  }, [hash, token0NeedsApproval, token1NeedsApproval, updateState]);
  useEffect(() => {
    updateState({
      actionTitle:
        token0NeedsApproval || token1NeedsApproval
          ? `Approved ${token0NeedsApproval ? token0?.symbol : token1?.symbol}`
          : "Added Liquidity.",
    });
  }, [
    token0?.symbol,
    token0NeedsApproval,
    token1?.symbol,
    token1NeedsApproval,
    updateState,
  ]);
  console.log({ token0NeedsApproval, token1NeedsApproval });
  const { isLoading } = txReceipt;
  const onSubmit = useCallback(() => {
    if (token0NeedsApproval && token0ApprovalWriteRequest) {
      writeContract(token0ApprovalWriteRequest);
      return;
    }
    if (token1NeedsApproval && token1ApprovalWriteRequest) {
      writeContract(token1ApprovalWriteRequest);
      return;
    }
    if (isAddLiquidityETH) {
      if (addLiquidityETHSimulation.data?.request) {
        writeContract(addLiquidityETHSimulation.data.request);
      }
    } else {
      if (addLiquiditySimulation.data?.request) {
        writeContract(addLiquiditySimulation.data.request);
      }
    }
  }, [
    token0NeedsApproval,
    token0ApprovalWriteRequest,
    token1NeedsApproval,
    token1ApprovalWriteRequest,
    isAddLiquidityETH,
    writeContract,
    addLiquidityETHSimulation,
    addLiquiditySimulation,
  ]);

  const tokenNeedingApproval = useMemo(() => {
    if (token0NeedsApproval && token0) {
      return token0;
    }
    if (token1NeedsApproval && token1) {
      return token1;
    }
  }, [token0, token1, token0NeedsApproval, token1NeedsApproval]);

  const stateValid = useMemo(
    () =>
      !!token0 &&
      !!token1 &&
      (!token0NeedsApproval && !token1NeedsApproval
        ? (Boolean(addLiquidityETHSimulation.data?.request) ||
            Boolean(addLiquiditySimulation.data?.request)) &&
          amountADesired > 0n &&
          amountBDesired > 0n
        : true),
    [
      token0,
      token1,
      token0NeedsApproval,
      token1NeedsApproval,
      addLiquidityETHSimulation,
      addLiquiditySimulation,
      amountADesired,
      amountBDesired,
    ]
  );

  const { state: buttonState } = useGetButtonStatuses({
    isLoading,
    isPending,
    isFetching: token0ApprovalFetching || token1ApprovalFetching,
    needsApproval: token0NeedsApproval || token1NeedsApproval,
  });
  useEffect(() => {
    if (quoteLiquidity && pairExists) {
      setAmount1(Number(formatUnits(quoteLiquidity, token1?.decimals ?? 18)));
    }
  }, [pairExists, quoteLiquidity, token1?.decimals]);
  return (
    <>
      <h2 className="text-xl">
        {pairExists ? "Add Liquidity" : "Initialize Pool"}
      </h2>{" "}
      {!!token0 && (
        <div className="space-y-2">
          <div>
            <label htmlFor="">Asset 1</label>
          </div>
          <AssetCard
            onValueChange={setAmount0}
            token={token0}
            value={amount0}
          />
        </div>
      )}
      {!!token1 && (
        <div className="space-y-2">
          <div>
            <label htmlFor="">Asset 2</label>
          </div>
          <AssetCard
            onValueChange={setAmount1}
            token={token1}
            value={amount1}
            disableInput={pairExists && quoteLiquidity > 0n}
          />
          o{" "}
        </div>
      )}
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
        state={buttonState}
        isValid={stateValid}
        approveTokenSymbol={tokenNeedingApproval?.symbol}
        onClick={onSubmit}
      >
        Add Liquidity
      </SubmitButton>
      {writeContractError && (
        <span className="text-[13px] text-red-400 pt-3 text-center">
          {(writeContractError as BaseError).shortMessage ||
            writeContractError.message}
        </span>
      )}
    </>
  );
}
