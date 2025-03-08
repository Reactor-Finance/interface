"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import AssetCard from "./assetCard";
import { useChainId, useWriteContract } from "wagmi";
import { useAddLiquidity } from "../../../__hooks__/useAddLiquidity";
import SubmitButton from "@/components/shared/submitBtn";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { Address, formatUnits, isAddress, parseUnits, zeroAddress } from "viem";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { useCheckPair } from "@/lib/hooks/useCheckPair";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import { ROUTER } from "@/data/constants";
import { useQuoteLiquidity } from "@/app/liquidity/__hooks__/useQuoteLiquidity";
import { useGetTokenInfo } from "@/utils";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import AddLiquidityInfo from "./addLiquidityInfo";
import { useGetPairInfo } from "@/lib/hooks/useGetPairInfo";

const searchParamsSchema = z.object({
  token0: z.string().refine((arg) => isAddress(arg)),
  token1: z.string().refine((arg) => isAddress(arg)),
  version: z.enum(["stable", "concentrated", "volatile"]),
});

export default function InitializePool() {
  // Wagmi parameters
  const chainId = useChainId();
  const [selectedInput, setSelectedInput] = useState<"0" | "1">("0");
  // Token list
  // Search params
  const params = useSearchParams();
  const { t0, t1, version } = useMemo(() => {
    const t0 = params.get("token0");
    const t1 = params.get("token1");
    const version = params.get("version");
    const param = { token0: t0, token1: t1, version };

    const afterParse = searchParamsSchema.safeParse(param);
    if (!afterParse.success) {
      console.log("failed parse");
      return { t0: undefined, t1: undefined, version: "stable" };
    }
    const { token1, token0, version: v } = afterParse.data;
    return { t1: token1, t0: token0, version: v };
  }, [params]);
  useEffect(() => {}, []);

  console.log({ t0, t1 }, "LOOGGG===========");
  // Tokens
  const token0 = useGetTokenInfo(t0 ?? "0x");
  const token1 = useGetTokenInfo(t1 ?? "0x");

  // const { data: pools } = api.pool.findPool.useQuery(
  //   {
  //     tokenOneAddress: token0?.address ?? "0x",
  //     tokenTwoAddress: token1?.address ?? "0x",
  //     isStable: version === "stable",
  //   },
  //   { enabled: Boolean(token0) && Boolean(token1) }
  // );
  // const pair = pools?.pairs[0];
  // Amounts
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");

  // Router
  const router = useMemo(() => ROUTER[chainId], [chainId]);

  // Check if pair exists
  const { pairExists, pair } = useCheckPair({
    token0: t0 ?? zeroAddress,
    token1: t1 ?? zeroAddress,
    stable: version === "stable",
  });

  // Quote liquidity
  const quoteLiquidity = useQuoteLiquidity({
    token0: (selectedInput === "0" ? t0 : t1) ?? zeroAddress,
    token1: (selectedInput === "0" ? t1 : t0) ?? zeroAddress,
    stable: version === "stable",
    amountIn: parseUnits(
      selectedInput === "0" ? amount0 : amount1,
      token0?.decimals ?? 18
    ),
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
    () => parseUnits(amount0, token0?.decimals ?? 18),
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
    disabled:
      token1NeedsApproval ||
      token1NeedsApproval ||
      (amount0 === "" && amount1 === ""),
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

  const { balance: balance0, balanceQueryKey: bal0Key } = useGetBalance({
    tokenAddress: token0?.address ?? zeroAddress,
  });
  const { balance: balance1, balanceQueryKey: bal1Key } = useGetBalance({
    tokenAddress: token1?.address ?? zeroAddress,
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (txReceipt.isSuccess) {
      reset();
      if (token0NeedsApproval) {
        queryClient.invalidateQueries({ queryKey: token0AllowanceKey });
        return;
      }
      if (token1NeedsApproval) {
        queryClient.invalidateQueries({ queryKey: token1AllowanceKey });
        return;
      }
      if (!token0NeedsApproval || !token1NeedsApproval) {
        queryClient.invalidateQueries({ queryKey: bal0Key });
        queryClient.invalidateQueries({ queryKey: bal1Key });
        setAmount0("");
        setAmount1("");
      }
    }
  }, [
    bal0Key,
    bal1Key,
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
    if (amount0 && amount1) {
      console.log({
        actionTitle:
          token0NeedsApproval || token1NeedsApproval
            ? `Approved ${token0NeedsApproval ? token0?.symbol : token1?.symbol}`
            : "Added Liquidity.",
      });
    }
    if (
      amount0 &&
      amount1 &&
      !token0ApprovalFetching &&
      !token1ApprovalFetching
    ) {
      updateState({
        actionTitle:
          token0NeedsApproval || token1NeedsApproval
            ? `Approved ${token0NeedsApproval ? token0?.symbol : token1?.symbol}`
            : "Added Liquidity.",
      });
    }
  }, [
    amount0,
    amount1,
    token0?.symbol,
    token0ApprovalFetching,
    token0NeedsApproval,
    token1?.symbol,
    token1ApprovalFetching,
    token1NeedsApproval,
    updateState,
  ]);
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
  const { balance } = useGetBalance({
    tokenAddress: (pair as Address) ?? zeroAddress,
  });
  const { state: buttonState } = useGetButtonStatuses({
    isLoading,
    isPending,
    isFetching: token0ApprovalFetching || token1ApprovalFetching,
    needsApproval: token0NeedsApproval || token1NeedsApproval,
  });
  useEffect(() => {
    if (selectedInput === "0") {
      if (quoteLiquidity && pairExists) {
        setAmount1(formatUnits(quoteLiquidity, token1?.decimals ?? 18));
      }
      if (amount0 === "" && pairExists) {
        setAmount1("");
      }
    } else {
      if (quoteLiquidity && pairExists) {
        setAmount0(formatUnits(quoteLiquidity, token0?.decimals ?? 18));
      }
      if (amount1 === "" && pairExists) {
        setAmount0("");
      }
    }
  }, [
    amount0,
    amount1,
    pairExists,
    quoteLiquidity,
    selectedInput,
    token0?.decimals,
    token1?.decimals,
  ]);
  const { pairInfo } = useGetPairInfo({ pair });
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
            balance={balance0}
            onValueChange={setAmount0}
            token={token0}
            value={amount0}
            onFocus={() => setSelectedInput("0")}
          />
        </div>
      )}
      {!!token1 && (
        <div className="space-y-2">
          <div>
            <label htmlFor="">Asset 2</label>
          </div>
          <AssetCard
            balance={balance1}
            onValueChange={setAmount1}
            token={token1}
            value={amount1}
            onFocus={() => setSelectedInput("1")}
          />
        </div>
      )}
      {!pair && (
        <AddLiquidityInfo
          amount0={amount0}
          amount1={amount1}
          token0={token0}
          token1={token1}
        />
      )}
      {pair && (
        <>
          <div className="">
            <h5>Reserve Info</h5>
            <div className="pt-1"></div>
            <div className="space-y-1">
              <div className="flex text-neutral-300 text-sm justify-between">
                <span>{token0?.symbol} Amount</span>
                <span>
                  {formatUnits(
                    pairInfo?.reserve0 ?? "0",
                    token0?.decimals ?? 18
                  )}
                </span>
              </div>
              <div className="flex text-neutral-300 text-sm justify-between">
                <span>{token1?.symbol} Amount</span>
                <span>
                  {formatUnits(
                    pairInfo?.reserve0 ?? "0",
                    token0?.decimals ?? 18
                  )}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h5>My Info</h5>

            <div className="flex pt-1 text-neutral-300 text-sm justify-between">
              <span>Amount</span>
              <span>{formatUnits(balance ?? 0n, 18)} lp</span>
            </div>
          </div>
        </>
      )}
      <SubmitButton
        state={buttonState}
        isValid={stateValid}
        approveTokenSymbol={tokenNeedingApproval?.symbol}
        onClick={onSubmit}
      >
        Add Liquidity
      </SubmitButton>
      {writeContractError && (
        <span className="text-[13px] text-red-400 pt-3 text-center"></span>
      )}
    </>
  );
}
