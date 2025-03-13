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
import { ROUTER, WETH } from "@/data/constants";
import { parseUnits, zeroAddress } from "viem";
import { useWETHExecutions } from "../__hooks__/useWETHExecutions";
import useSwapValidation from "../__hooks__/useSwapValidation";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { ArrowDown } from "lucide-react";
import SwapCard from "./swapCard";
import SubmitButton from "@/components/shared/submitBtn";
import SwapDetails from "./swapDetails";
import { useQueryClient } from "@tanstack/react-query";

export default function SwapView() {
  // Wagmi parameters
  const chainId = useChainId();

  // Amount in
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  // Selected tokens
  const [token0, setToken0] = useState<TToken | null>(null);
  const [token1, setToken1] = useState<TToken | null>(null);

  // Modal state
  const [firstDialogOpen, setFirstDialogOpen] = useState(false);
  const [secondDialogOpen, setSecondDialogOpen] = useState(false);

  // Active input pane
  const [activePane, setActivePane] = useState<0 | 1>(0);

  // Quote
  const {
    quoteAmount,
    isLoading: quoteSwapLoading,
    stable: swapStable,
  } = useQuoteSwap({
    amountIn: Number(amountIn),
    amountOut: Number(amountOut),
    selected: activePane ?? 0,
    tokenIn: token0,
    tokenOut: token1,
  });
  const roundedQuoteAmount = useMemo(
    () => Math.floor(quoteAmount * 100) / 100,
    [quoteAmount]
  );

  useEffect(() => {
    if (!token0 || !token1 || quoteSwapLoading) {
      return;
    }
    switch (activePane) {
      case 0: {
        setAmountOut(String(roundedQuoteAmount));
        break;
      }
      case 1: {
        setAmountIn(String(roundedQuoteAmount));
        break;
      }
    }
  }, [token0, token1, activePane, quoteSwapLoading, roundedQuoteAmount]);

  // Router by chain ID
  const router = useMemo(() => ROUTER[chainId], [chainId]);
  // WETH
  const weth = useMemo(() => WETH[chainId], [chainId]);
  // checks allowance
  const { approveWriteRequest, needsApproval, allowanceKey } = useApproveWrite({
    tokenAddress: token0?.address,
    spender: router,
    amount: String(amountIn),
    decimals: token0?.decimals,
  });

  // Simulate swap
  const { data: swapSimulation, error: swapSimulationError } =
    useSwapSimulation({
      amount: Number(amountIn),
      token0,
      token1,
      needsApproval,
      minAmountOut: parseUnits(amountOut, token1?.decimals ?? 18),
      stable: swapStable,
    });
  // Simulate WETH process
  const { isIntrinsicWETHProcess, WETHProcessSimulation, isWETHToEther } =
    useWETHExecutions({
      amount: Number(amountIn),
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
    if (isSuccess && !needsApproval) {
      setToast({
        hash,
        actionTitle: "Swapped",
        actionDescription: "Swapped something",
      });
    } else if (!needsApproval && isSuccess) {
      setToast({
        hash,
        actionTitle: "Approve",
        actionDescription: "",
      });
    }
  }, [hash, isLoading, isSuccess, needsApproval, setToast]);

  const queryClient = useQueryClient();
  useEffect(() => {
    if (isSuccess && !needsApproval) {
      reset();
      setAmountIn("");
      setAmountOut("");
    }
    if (isSuccess && needsApproval) {
      queryClient.invalidateQueries({ queryKey: allowanceKey });
      reset();
    }
  }, [allowanceKey, isSuccess, needsApproval, queryClient, reset]);

  const switchTokens = useCallback(() => {
    const t0 = token0;
    const t1 = token1;
    // Switch
    setToken0(t1);
    setToken1(t0);
  }, [token0, token1]);

  const { isValid, message: errorMessage } = useSwapValidation({
    amountIn: Number(amountIn),
    token0,
    token1,
    isLoading,
    simulation: !!swapSimulation?.request,
    approveSimulation: !!approveWriteRequest,
    needsApproval,
  });

  const onSubmit = useCallback(() => {
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
  const stateValid = useMemo(
    () =>
      Number(amountIn) > 0 &&
      Number(amountOut) > 0 &&
      (Boolean(swapSimulation?.request) ||
        Boolean(WETHProcessSimulation.depositSimulation.data) ||
        Boolean(WETHProcessSimulation.withdrawalSimulation.data) ||
        Boolean(approveWriteRequest && needsApproval)),
    [
      swapSimulation?.request,
      WETHProcessSimulation.depositSimulation.data,
      WETHProcessSimulation.withdrawalSimulation.data,
      approveWriteRequest,
      needsApproval,
      amountIn,
      amountOut,
    ]
  );

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
          active={activePane === 0}
          title="Sell"
          value={String(amountIn)}
          onContainerClick={() => setActivePane(0)}
          token={token0}
          onButtonClick={() => setFirstDialogOpen(true)}
          setValue={setAmountIn}
        />
        <SwapCard
          active={activePane === 1}
          title="Buy"
          token={token1}
          value={amountOut}
          onContainerClick={() => setActivePane(1)}
          onButtonClick={() => setSecondDialogOpen(true)}
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
      {token1 && token0 && Number(amountIn) > 0 && (
        <SwapDetails token0={token0} token1={token1} />
      )}
      <SubmitButton
        onClick={onSubmit}
        validationError={errorMessage}
        state={buttonState}
        isValid={isValid && stateValid}
      >
        {!isIntrinsicWETHProcess ? (
          "Swap"
        ) : (
          <>
            {token0?.address.toLowerCase() === weth.toLowerCase()
              ? "Unwrap"
              : "Wrap"}
          </>
        )}
      </SubmitButton>
    </div>
  );
}
