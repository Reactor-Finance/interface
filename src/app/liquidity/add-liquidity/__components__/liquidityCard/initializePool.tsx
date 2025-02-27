"use client";

import React, { useCallback, useMemo, useState } from "react";
import AssetCard from "./assetCard";
import { TToken } from "@/lib/types";
import {
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useAddLiquidity } from "../../../__hooks__/useAddLiquidity";
import SubmitButton from "@/components/shared/submitBtn";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { formatUnits, isAddress, parseUnits, zeroAddress } from "viem";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { useTokenlistContext } from "@/contexts/tokenlistContext";
import { useCheckPair } from "@/lib/hooks/useCheckPair";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import { ROUTER } from "@/data/constants";
import { useQuoteLiquidity } from "@/app/liquidity/__hooks__/useQuoteLiquidity";
import { BaseError } from "@wagmi/core";

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
  const { request: addLiquidityRequest } = useAddLiquidity({
    token0: token0?.address ?? zeroAddress,
    token1: token1?.address ?? zeroAddress,
    amountADesired,
    amountBDesired,
    stable: version === "stable",
  });

  const {
    writeContract,
    isPending,
    data: hash,
    reset,
    error: writeContractError,
  } = useWriteContract(); // We'll also call reset when transaction toast is closed
  const { isLoading } = useWaitForTransactionReceipt({ hash });

  const onSubmit = useCallback(() => {
    if (token0NeedsApproval && token0ApprovalWriteRequest) {
      reset(); // Call reset first to clear internal state
      writeContract(token0ApprovalWriteRequest);
      return;
    }

    if (token1NeedsApproval && token1ApprovalWriteRequest) {
      reset(); // Call reset first to clear internal state
      writeContract(token1ApprovalWriteRequest);
      return;
    }

    if (addLiquidityRequest) {
      reset(); // Call reset first to clear internal state
      writeContract(addLiquidityRequest as any);
    }
  }, [
    token0NeedsApproval,
    token1NeedsApproval,
    token0ApprovalWriteRequest,
    token1ApprovalWriteRequest,
    addLiquidityRequest,
    writeContract,
    reset,
  ]);

  const approveTokenSymbol = useMemo(() => {
    if (token0NeedsApproval && token0) {
      return token0.symbol;
    }
    if (token1NeedsApproval && token1) {
      return token1.symbol;
    }
  }, [token0, token1, token0NeedsApproval, token1NeedsApproval]);
  const { state } = useGetButtonStatuses({
    isLoading,
    isPending,
    isFetching: token0ApprovalFetching || token1ApprovalFetching,
    needsApproval: token0NeedsApproval || token1NeedsApproval,
  });
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
            value={
              pairExists && quoteLiquidity > 0n
                ? Number(formatUnits(quoteLiquidity, token1.decimals))
                : amount1
            }
            disableInput={pairExists && quoteLiquidity > 0n}
          />
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
        state={state}
        isValid={
          !!token0 &&
          !!token1 &&
          (!token0NeedsApproval && !token1NeedsApproval
            ? Boolean(addLiquidityRequest)
            : true)
        }
        approveTokenSymbol={approveTokenSymbol}
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
