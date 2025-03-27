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
import { formatUnits, isAddress, parseUnits, zeroAddress } from "viem";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useCheckPair } from "@/lib/hooks/useCheckPair";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import { ROUTER } from "@/data/constants";
import { useQuoteLiquidity } from "@/app/liquidity/__hooks__/useQuoteLiquidity";
import { useGetTokenInfo } from "@/utils";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { useGetPairInfo } from "@/lib/hooks/useGetPairInfo";
import DisplayFormattedNumber from "@/components/shared/displayFormattedNumber";
import { formatNumber } from "@/lib/utils";
import InitPoolInfo from "./initPoolInfo";
import useInitializePoolValidation from "./hooks/useInitializePoolValidation";
import { useDebounce } from "@/lib/hooks/useDebounce";
import useGetToken from "@/lib/hooks/useGetToken";

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
      return { t0: undefined, t1: undefined, version: "stable" };
    }
    const { token1, token0, version: v } = afterParse.data;
    return { t1: token1, t0: token0, version: v };
  }, [params]);

  // Direct tokens
  const token0 = useGetTokenInfo(t0 ?? zeroAddress);
  const token1 = useGetTokenInfo(t1 ?? zeroAddress);
  const routerNav = useRouter();
  // If token is not in our token list, then fetch from contract
  const { isFetched: fetched0, token: fetchedToken0 } = useGetToken({
    address: t0,
    disabled: !!token0,
  });
  const { isFetched: fetched1, token: fetchedToken1 } = useGetToken({
    address: t1,
    disabled: !!token1,
  });

  const asset0 = useMemo(
    () =>
      !!token0
        ? token0
        : fetched0 && !!fetchedToken0
          ? fetchedToken0
          : undefined,
    [fetched0, fetchedToken0, token0]
  );
  const asset1 = useMemo(
    () =>
      !!token1
        ? token1
        : fetched1 && !!fetchedToken1
          ? fetchedToken1
          : undefined,
    [fetched1, fetchedToken1, token1]
  );
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");
  const { debouncedValue: amount0Bounced } = useDebounce(amount0, 300);
  const { debouncedValue: amount1Bounced } = useDebounce(amount1, 300);

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
        ? (asset0?.decimals ?? 18)
        : (asset1?.decimals ?? 18),
    token1Decimals:
      selectedInput === "0"
        ? (asset0?.decimals ?? 18)
        : (asset1?.decimals ?? 18),
    stable: version === "stable",
    quoting: selectedInput === "0" ? "in" : "out",
    amountIn: parseUnits(
      selectedInput === "0" ? amount0 : amount1,
      asset0?.decimals ?? 18
    ),
  });
  // We don't use wrapping any more
  // const wmonToken = useMemo(() => {
  //   if (token0?.address === WETH[ChainId.MONAD_TESTNET]) {
  //     return "token0";
  //   }
  //   if (token1?.address === WETH[ChainId.MONAD_TESTNET]) {
  //     return "token1";
  //   }
  //   return "none";
  // }, [token0?.address, token1?.address]);
  // const { needsWrap, resetWrap, depositSimulation } = useWrapWrite({
  //   amountIn: wmonToken === "token0" ? amount0 : amount1,
  //   isWmon: wmonToken !== "none",
  //   disabled: wmonToken === "token0" ? amount0 === "" : amount1 === "",
  // });
  // Check approval required
  const {
    approveWriteRequest: token0ApprovalWriteRequest,
    needsApproval: token0NeedsApproval,
    isFetching: token0ApprovalFetching,
    allowanceKey: token0AllowanceKey,
  } = useApproveWrite({
    spender: router,
    tokenAddress: asset0?.address ?? zeroAddress,
    decimals: asset0?.decimals,
    amount: amount0Bounced,
    disabled: isNaN(Number(amount0)) || Number(amount0) <= 0,
  });

  const {
    approveWriteRequest: token1ApprovalWriteRequest,
    needsApproval: token1NeedsApproval,
    isFetching: token1ApprovalFetching,
    allowanceKey: token1AllowanceKey,
  } = useApproveWrite({
    spender: router,
    tokenAddress: asset1?.address ?? zeroAddress,
    decimals: asset1?.decimals,
    amount: amount1Bounced,
    disabled: isNaN(Number(amount1)) || Number(amount1) <= 0,
  });

  // Amounts parsed
  const amountADesired = useMemo(
    () => parseUnits(amount0Bounced, asset0?.decimals ?? 18),
    [amount0Bounced, asset0?.decimals]
  );
  const amountBDesired = useMemo(
    () => parseUnits(amount1Bounced, asset1?.decimals ?? 18),
    [amount1Bounced, asset1?.decimals]
  );
  const {
    addLiquidityETHSimulation,
    addLiquiditySimulation,
    isAddLiquidityETH,
  } = useAddLiquidity({
    disabled:
      token1NeedsApproval ||
      token1NeedsApproval ||
      isNaN(Number(amount0)) ||
      Number(amount0) <= 0 ||
      isNaN(Number(amount1)) ||
      Number(amount1) <= 0,
    token0: asset0?.address ?? zeroAddress,
    token1: asset1?.address ?? zeroAddress,
    amountADesired,
    amountBDesired,
    stable: version === "stable",
  });

  const { writeContract, reset, isPending, data: hash } = useWriteContract(); // We'll also call reset when transaction toast is closed
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  const { setToast } = useTransactionToastProvider();
  const { balance: balance0, queryKey: balance0QueryKey } = useGetBalance({
    tokenAddress: asset0?.address ?? zeroAddress,
  });
  const { balance: balance1, queryKey: balance1QueryKey } = useGetBalance({
    tokenAddress: asset1?.address ?? zeroAddress,
  });

  const { balance: lpBalance, queryKey: lpQueryKey } = useGetBalance({
    tokenAddress: pairExists ? pair : zeroAddress,
  });
  const queryClient = useQueryClient();
  const { pairInfo, queryKey: pairQueryKey } = useGetPairInfo({ pair });
  const resetAfterLPProvision = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: balance0QueryKey });
    queryClient.invalidateQueries({ queryKey: balance1QueryKey });
    queryClient.invalidateQueries({ queryKey: pairQueryKey });
    queryClient.invalidateQueries({ queryKey: lpQueryKey });
  }, [
    balance0QueryKey,
    balance1QueryKey,
    lpQueryKey,
    pairQueryKey,
    queryClient,
  ]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      // if (needsWrap) {
      //   resetWrap();
      //   setToast({
      //     actionTitle: "Wrapped",
      //     actionDescription: "",
      //     hash,
      //   });
      //   return;
      // }
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
        resetAfterLPProvision();
        setAmount0("");
        setAmount1("");
      }
    }
  }, [
    hash,
    isSuccess,
    queryClient,
    reset,
    resetAfterLPProvision,
    setToast,
    token0AllowanceKey,
    token0NeedsApproval,
    token1AllowanceKey,
    token1NeedsApproval,
  ]);

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
      addLiquidityETHSimulation.data?.request,
      addLiquiditySimulation.data?.request,
      amountADesired,
      amountBDesired,
    ]
  );

  const { isValid: poolInitValid, errorMessage } = useInitializePoolValidation({
    amount0,
    needsWrap: false,
    amount1,
    token0,
    token1,
    balance0,
    balance1,
  });

  const { state: buttonState } = useGetButtonStatuses({
    isLoading,
    isPending,
    isFetching: token0ApprovalFetching || token1ApprovalFetching,
    needsApproval: token0NeedsApproval || token1NeedsApproval,
  });
  // logic to set quote amounts to inputs
  useEffect(() => {
    if (!pairExists) return;
    if (selectedInput === "0") {
      if (quoteLiquidity === 0n) {
        setAmount1(amount0);
        return;
      }
      if (quoteLiquidity && pairExists) {
        let num = parseFloat(
          formatUnits(quoteLiquidity, asset1?.decimals ?? 18)
        );
        num = Math.floor(num * 100) / 100;
        setAmount1(num.toString());
      }
      if (isNaN(Number(amount0)) || (Number(amount0) <= 0 && pairExists)) {
        setAmount1("");
      }
    } else {
      if (quoteLiquidity === 0n) {
        setAmount0(amount0);
      }
      if (quoteLiquidity && pairExists) {
        let num = parseFloat(
          formatUnits(quoteLiquidity, asset1?.decimals ?? 18)
        );
        num = Math.floor(num * 100) / 100;
        setAmount0(num.toString());
      }
      if (isNaN(Number(amount1)) || (Number(amount1) <= 0 && pairExists)) {
        setAmount0("");
      }
    }
  }, [
    amount0,
    amount1,
    pairExists,
    quoteLiquidity,
    selectedInput,
    asset0?.decimals,
    asset1?.decimals,
  ]);

  useEffect(() => {
    if (!asset0 || !asset1) routerNav.push("/");
  }, [asset0, asset1, routerNav]);

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
                  num={formatNumber(formatUnits(lpBalance, 18))}
                />{" "}
                lp
              </span>
            </div>
          </div>
        </>
      )}
      <SubmitButton
        state={buttonState}
        isValid={stateValid || poolInitValid}
        validationError={errorMessage}
        approveTokenSymbol={tokenNeedingApproval?.symbol}
        onClick={onSubmit}
      >
        Add Liquidity
      </SubmitButton>
    </>
  );
}
