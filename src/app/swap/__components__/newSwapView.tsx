"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TokensDialog from "@/components/shared/tokensDialog";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import {
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useSwapSimulation } from "../__hooks__/useSwapSimulation";
import { useQuoteSwap } from "../__hooks__/useQuoteSwap";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { TToken } from "@/lib/types";
import { ROUTER } from "@/data/constants";
import { formatUnits, parseUnits, zeroAddress } from "viem";
import { useWETHExecutions } from "../__hooks__/useWETHExecutions";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import useSwapValidation from "../__hooks__/useSwapValidation";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { ArrowDown } from "lucide-react";
import SwapCard from "./swapCard";
import SubmitButton from "@/components/shared/submitBtn";

export default function NewSwapView() {
  // Wagmi parameters
  const chainId = useChainId();

  // Amount in
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  // Selected tokens
  const [token0, setToken0] = useState<TToken | null>(null);
  const [token1, setToken1] = useState<TToken | null>(null);

  // Balances
  const { balance: token0Balance } = useGetBalance({
    tokenAddress: token0?.address ?? zeroAddress,
  });
  const { balance: token1Balance } = useGetBalance({
    tokenAddress: token1?.address ?? zeroAddress,
  });

  // Modal state
  const [firstDialogOpen, setFirstDialogOpen] = useState(false);
  const [secondDialogOpen, setSecondDialogOpen] = useState(false);

  // Active input pane
  const [activePane, setActivePane] = useState<0 | 1>(0);

  // Quote
  const {
    quoteAmount,
    isLoading: amountOutLoading,
    amountInLoading,
  } = useQuoteSwap({
    amountIn,
    amountOut,
    selected: activePane ?? 0,
    tokenIn: token0,
    tokenOut: token1,
  });
  useEffect(() => {
    if (!token0 || !token1) {
      return;
    }
    if (activePane === 0 && amountIn === "") {
      setAmountOut("");
    }
    if (activePane === 1 && amountOut === "") {
      setAmountIn("");
    }
    if (activePane === 0 && !amountOutLoading && amountIn !== "") {
      const rounded = Math.floor(Number(quoteAmount) * 100) / 100;
      setAmountOut(rounded.toString());
    } else if (activePane === 1 && !amountInLoading && amountOut !== "") {
      const rounded = Math.floor(Number(quoteAmount) * 100) / 100;
      setAmountIn(rounded.toString());
    }
  }, [
    token0,
    token1,
    activePane,
    amountIn,
    amountInLoading,
    amountOut,
    amountOutLoading,
    quoteAmount,
  ]);

  // Router by chain ID
  const router = useMemo(() => ROUTER[chainId], [chainId]);
  // checks allowance
  const { approveWriteRequest, needsApproval } = useApproveWrite({
    tokenAddress: token0?.address,
    spender: router,
    amount: String(amountIn),
    decimals: token0?.decimals,
  });

  // Simulate swap
  const { data: swapSimulation, error: swapSimulationError } =
    useSwapSimulation({
      amount: amountIn,
      token0,
      token1,
      minAmountOut: parseUnits(amountOut, token1?.decimals ?? 18),
    });
  console.log({ swapSimulation });
  // Simulate WETH process
  const { isIntrinsicWETHProcess, WETHProcessSimulation, isWETHToEther } =
    useWETHExecutions({
      amount: amountIn,
      token0,
      token1,
    });

  const {
    writeContract,
    isPending,
    data: hash,
    error: writeError,
    reset,
  } = useWriteContract();
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({ hash });
  const { setToast } = useTransactionToastProvider();
  useEffect(() => {
    if (isSuccess) {
      setToast({
        hash,
        actionTitle: "Swapped",
        actionDescription: "Swapped something",
      });
    }
  }, [hash, isLoading, isSuccess, setToast]);
  useEffect(() => {
    if (isSuccess) {
      reset();
      setAmountIn("");
      setAmountOut("");
    }
  }, [isSuccess, reset]);
  const switchTokens = useCallback(() => {
    const t0 = token0;
    const t1 = token1;
    // Switch
    setToken0(t1);
    setToken1(t0);
  }, [token0, token1]);
  const { isValid, message: errorMessage } = useSwapValidation({
    amountIn,
    token0,
    token1,
    token0Balance,
    simulation: !!swapSimulation?.request,
  });
  const onSubmit = useCallback(() => {
    console.log("in here");
    if (isIntrinsicWETHProcess) {
      if (isWETHToEther) {
        const req = WETHProcessSimulation?.withdrawalSimulation?.data?.request;
        if (req) {
          reset();
          writeContract(req);
        }
      } else {
        const req = WETHProcessSimulation?.depositSimulation?.data?.request;
        if (req) {
          reset();
          writeContract(req);
        }
      }
      return;
    }

    if (approveWriteRequest && needsApproval) {
      writeContract(approveWriteRequest);
      return;
    }
    if (swapSimulation) {
      writeContract(swapSimulation.request);
    }
  }, [
    isIntrinsicWETHProcess,
    approveWriteRequest,
    needsApproval,
    swapSimulation,
    isWETHToEther,
    WETHProcessSimulation?.withdrawalSimulation?.data?.request,
    WETHProcessSimulation?.depositSimulation?.data?.request,
    reset,
    writeContract,
  ]);

  const { state: buttonState } = useGetButtonStatuses({
    isPending,
    isLoading,
    needsApproval: needsApproval && !isIntrinsicWETHProcess,
  });
  let stateValid = useMemo(
    () =>
      Boolean(swapSimulation?.request) ||
      Boolean(WETHProcessSimulation.depositSimulation.data) ||
      Boolean(WETHProcessSimulation.withdrawalSimulation.data) ||
      Boolean(approveWriteRequest && needsApproval),
    [
      swapSimulation?.request,
      WETHProcessSimulation.depositSimulation.data,
      WETHProcessSimulation.withdrawalSimulation.data,
      approveWriteRequest,
      needsApproval,
    ]
  );
  console.log();
  if (amountIn === "" || amountIn === "") {
    stateValid = false;
  }
  console.log({ stateValid });
  useEffect(() => {
    if (writeError) {
      console.log(writeError);
    }

    if (swapSimulationError) {
      console.log(swapSimulationError);
    }
  }, [writeError, swapSimulationError]);
  return (
    <div className="space-y-1">
      <TokensDialog
        open={firstDialogOpen}
        onOpen={setFirstDialogOpen}
        onTokenSelected={setToken0}
        selectedTokens={[
          token0?.address ?? zeroAddress,
          token1?.address ?? zeroAddress,
        ]}
      />
      <TokensDialog
        open={secondDialogOpen}
        onOpen={setSecondDialogOpen}
        onTokenSelected={setToken1}
        selectedTokens={[
          token0?.address ?? zeroAddress,
          token1?.address ?? zeroAddress,
        ]}
      />
      <div className="space-y-1 relative">
        <SwapCard
          selected={activePane === 0}
          title="Sell"
          openDialog={() => setFirstDialogOpen(true)}
          balance={formatUnits(token0Balance, token0?.decimals ?? 18)}
          value={amountIn}
          selectPain={() => setActivePane(0)}
          token={token0}
          setValue={setAmountIn}
        />
        <SwapCard
          selected={activePane === 1}
          title="Buy"
          selectPain={() => setActivePane(1)}
          openDialog={() => setSecondDialogOpen(true)}
          token={token1}
          balance={formatUnits(token1Balance, token1?.decimals ?? 18)}
          value={amountOut}
          setValue={setAmountOut}
        />
        <button
          onClick={switchTokens}
          className="h-14 flex items-center justify-center rounded-full w-14 bg-black absolute left-1/2 top-1/2 -translate-y-[calc(50%+4px)] -translate-x-1/2"
        >
          <div className="h-12 w-12 rounded-full bg-neutral-1000 flex items-center justify-center">
            <ArrowDown className="text-neutral-300" size={18} />
          </div>
        </button>
      </div>
      <SubmitButton
        onClick={onSubmit}
        validationError={errorMessage}
        state={buttonState}
        isValid={isValid}
      >
        Swap
      </SubmitButton>
    </div>
  );
}
