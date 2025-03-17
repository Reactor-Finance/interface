"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import AssetCard from "./assetCard";
import {
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useAddLiquidity } from "../../../__hooks__/useAddLiquidity";
import SubmitButton from "@/components/shared/submitBtn";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { Address, formatUnits, isAddress, parseUnits, zeroAddress } from "viem";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { useCheckPair } from "@/lib/hooks/useCheckPair";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import { ChainId, ETHER, ROUTER, WETH } from "@/data/constants";
import { useQuoteLiquidity } from "@/app/liquidity/__hooks__/useQuoteLiquidity";
import { useGetTokenInfo } from "@/utils";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { useGetPairInfo } from "@/lib/hooks/useGetPairInfo";
import DisplayFormattedNumber from "@/components/shared/displayFormattedNumber";
import { formatNumber } from "@/lib/utils";
import InitPoolInfo from "./initPoolInfo";
import useWrapWrite from "@/lib/hooks/useWrapWrite";
import useInitializePoolValidation from "./hooks/useInitializePoolValidation";
import { useDebounce } from "@/lib/hooks/useDebounce";

const searchParamsSchema = z.object({
  token0: z.string().refine((arg) => isAddress(arg)),
  token1: z.string().refine((arg) => isAddress(arg)),
  version: z.enum(["stable", "concentrated", "volatile"]),
});

export default function AddLiquidityCard() {
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

  // Tokens
  const token0 = useGetTokenInfo(t0 ?? "0x");
  const token1 = useGetTokenInfo(t1 ?? "0x");

  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");
  const { debouncedValue: amount0Bounced } = useDebounce(amount0, 300);
  const { debouncedValue: amount1Bounced } = useDebounce(amount1, 300);
  useEffect(() => {
    // reset inputs if change pool version
    setAmount0("");
    setAmount1("");
  }, [version]);

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
    token0Decimals:
      selectedInput === "0"
        ? (token0?.decimals ?? 18)
        : (token1?.decimals ?? 18),
    token1Decimals:
      selectedInput === "0"
        ? (token1?.decimals ?? 18)
        : (token0?.decimals ?? 18),
    stable: version === "stable",
    amountIn: parseUnits(
      selectedInput === "0" ? amount0 : amount1,
      token0?.decimals ?? 18
    ),
  });
  // find which token is wmon
  const wmonToken = useMemo(() => {
    if (token0?.address === WETH[ChainId.MONAD_TESTNET]) {
      return "token0";
    }
    if (token1?.address === WETH[ChainId.MONAD_TESTNET]) {
      return "token1";
    }
    return "none";
  }, [token0?.address, token1?.address]);
  const { needsWrap, resetWrap, depositSimulation } = useWrapWrite({
    amountIn: wmonToken === "token0" ? amount0 : amount1,
    isWmon: wmonToken !== "none",
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
    amount: amount0Bounced,
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
    amount: amount1Bounced,
  });

  // Amounts parsed
  const amountADesired = useMemo(
    () => parseUnits(amount0Bounced, token0?.decimals ?? 18),
    [amount0Bounced, token0?.decimals]
  );
  const amountBDesired = useMemo(
    () => parseUnits(amount1Bounced, token1?.decimals ?? 18),
    [amount1Bounced, token1?.decimals]
  );
  const {
    addLiquidityETHSimulation,
    addLiquiditySimulation,
    isAddLiquidityETH,
  } = useAddLiquidity({
    disabled:
      token1NeedsApproval ||
      token1NeedsApproval ||
      amount0 === "" ||
      amount1 === "",
    token0: token0?.address ?? zeroAddress,
    token1: token1?.address ?? zeroAddress,
    amountADesired,
    amountBDesired,
    stable: version === "stable",
  });

  const { writeContract, reset, isPending, data: hash } = useWriteContract(); // We'll also call reset when transaction toast is closed
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const { setToast } = useTransactionToastProvider();
  const { balance: balance0Raw, balanceQueryKey: bal0Key } = useGetBalance({
    tokenAddress: token0?.address ?? zeroAddress,
  });
  const {
    balance: balance1Raw,
    etherBalance,
    balanceQueryKey: bal1Key,
  } = useGetBalance({
    tokenAddress: token1?.address ?? zeroAddress,
  });

  const balance0 =
    token0?.address.toLowerCase() === ETHER.toLowerCase()
      ? etherBalance.value
      : balance0Raw;
  const balance1 =
    token1?.address.toLowerCase() === ETHER.toLowerCase()
      ? etherBalance.value
      : balance1Raw;

  const { balance, balanceQueryKey: lpQueryKey } = useGetBalance({
    tokenAddress: (pair as Address) ?? zeroAddress,
  });
  const queryClient = useQueryClient();
  const { pairInfo, queryKey: pairKey } = useGetPairInfo({ pair });
  const resetAfterSwap = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: bal0Key });
    queryClient.invalidateQueries({ queryKey: bal1Key });
    queryClient.invalidateQueries({ queryKey: pairKey });
    queryClient.invalidateQueries({ queryKey: lpQueryKey });
  }, [bal0Key, bal1Key, lpQueryKey, pairKey, queryClient]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      if (needsWrap) {
        resetWrap();
        setToast({
          actionTitle: "Wrapped",
          actionDescription: "",
          hash,
        });
        return;
      }
      if (token0NeedsApproval) {
        queryClient.invalidateQueries({ queryKey: token0AllowanceKey });
        setToast({
          actionTitle: "Approved",
          actionDescription: "",
          hash,
        });
        return;
      }
      if (token1NeedsApproval) {
        queryClient.invalidateQueries({ queryKey: token1AllowanceKey });
        setToast({
          actionTitle: "Approved",
          actionDescription: "",
          hash,
        });
        return;
      }
      if (!token0NeedsApproval || !token1NeedsApproval) {
        setToast({
          actionTitle: "Added Liquidity",
          actionDescription: "",
          hash,
        });
        resetAfterSwap();
        setAmount0("");
        setAmount1("");
      }
    }
  }, [
    hash,
    isSuccess,
    needsWrap,
    queryClient,
    reset,
    resetAfterSwap,
    resetWrap,
    setToast,
    token0AllowanceKey,
    token0NeedsApproval,
    token1AllowanceKey,
    token1NeedsApproval,
  ]);
  const onSubmit = useCallback(() => {
    if (needsWrap && depositSimulation.data?.request) {
      writeContract(depositSimulation.data?.request);
      return;
    }
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
    needsWrap,
    depositSimulation.data?.request,
    token0NeedsApproval,
    token0ApprovalWriteRequest,
    token1NeedsApproval,
    token1ApprovalWriteRequest,
    isAddLiquidityETH,
    writeContract,
    addLiquidityETHSimulation?.data?.request,
    addLiquiditySimulation?.data?.request,
  ]);

  const tokenNeedingApproval = useMemo(() => {
    if (token0NeedsApproval && token0) {
      return token0;
    }
    if (token1NeedsApproval && token1) {
      return token1;
    }
  }, [token0, token1, token0NeedsApproval, token1NeedsApproval]);

  let stateValid = useMemo(
    () =>
      (!!token0 &&
        !!token1 &&
        (!token0NeedsApproval && !token1NeedsApproval
          ? (Boolean(addLiquidityETHSimulation.data?.request) ||
              Boolean(addLiquiditySimulation.data?.request)) &&
            amountADesired > 0n &&
            amountBDesired > 0n
          : true)) ||
      needsWrap,
    [
      token0,
      token1,
      token0NeedsApproval,
      token1NeedsApproval,
      addLiquidityETHSimulation.data?.request,
      addLiquiditySimulation.data?.request,
      amountADesired,
      amountBDesired,
      needsWrap,
    ]
  );
  const { isValid, errorMessage } = useInitializePoolValidation({
    amount0,
    needsWrap,
    amount1,
    token0,
    token1,
    balance0,
    balance1,
  });
  stateValid = stateValid && isValid;
  const { state: buttonState } = useGetButtonStatuses({
    isLoading,
    isPending,
    isFetching: token0ApprovalFetching || token1ApprovalFetching,
    needsApproval: token0NeedsApproval || token1NeedsApproval,
  });
  useEffect(() => {
    if (!pairExists) return;
    if (selectedInput === "0") {
      if (quoteLiquidity === 0n) {
        setAmount1(amount0);
        return;
      }
      if (quoteLiquidity && pairExists) {
        let num = parseFloat(
          formatUnits(quoteLiquidity, token1?.decimals ?? 18)
        );
        num = Math.floor(num * 100) / 100;
        setAmount1(num.toString());
      }
      if (amount0 === "" && pairExists) {
        setAmount1("");
      }
    } else {
      if (quoteLiquidity === 0n) {
        setAmount0(amount0);
      }
      if (quoteLiquidity && pairExists) {
        console.log(quoteLiquidity);
        let num = parseFloat(
          formatUnits(quoteLiquidity, token1?.decimals ?? 18)
        );
        console.log(num, "NM========");

        num = Math.floor(num * 100) / 100;

        setAmount0(num.toString());
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
  console.log({ addLiquiditySimulation });
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
      {!pairExists && (
        <InitPoolInfo
          amount0={amount0}
          amount1={amount1}
          token0={token0}
          token1={token1}
        />
      )}
      {pairExists && (
        <>
          <div className="">
            <h5>Reserve Info</h5>
            <div className="pt-1"></div>
            <div className="space-y-1">
              <div className="flex text-neutral-300 text-sm justify-between">
                <span>{token0?.symbol} Amount</span>
                <span>
                  <DisplayFormattedNumber
                    num={formatNumber(
                      formatUnits(
                        pairInfo?.reserve0 ?? 0n,
                        token0?.decimals ?? 18
                      )
                    )}
                  />
                </span>
              </div>
              <div className="flex text-neutral-300 text-sm justify-between">
                <span>{token1?.symbol} Amount</span>
                <span>
                  <DisplayFormattedNumber
                    num={formatNumber(
                      formatUnits(
                        pairInfo?.reserve1 ?? 0n,
                        token1?.decimals ?? 18
                      )
                    )}
                  />
                </span>
              </div>
            </div>
          </div>
          <div>
            <h5>My Info</h5>

            <div className="flex pt-1 text-neutral-300 text-sm justify-between">
              <span>Amount</span>
              <span>
                <DisplayFormattedNumber
                  num={formatNumber(formatUnits(balance ?? 0n, 18))}
                />{" "}
                lp
              </span>
            </div>
          </div>
        </>
      )}
      <SubmitButton
        state={buttonState}
        isValid={stateValid}
        validationError={errorMessage}
        approveTokenSymbol={tokenNeedingApproval?.symbol}
        onClick={onSubmit}
      >
        {needsWrap ? "Wrap" : "Add Liquidity"}
      </SubmitButton>
    </>
  );
}
