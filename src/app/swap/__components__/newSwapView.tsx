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
import { ChainId, ETHER, ROUTER, WETH } from "@/data/constants";
import { formatUnits, parseUnits, zeroAddress } from "viem";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import useSwapValidation from "../__hooks__/useSwapValidation";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { ArrowDown } from "lucide-react";
import SwapCard from "./swapCard";
import SubmitButton from "@/components/shared/submitBtn";
import SwapDetails from "./swapDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useWrapWrite from "@/lib/hooks/useWrapWrite";
export default function NewSwapView() {
  // Wagmi parameters
  const chainId = useChainId();
  const {} = useMutation({
    mutationFn: async () => {},
  });
  // Amount in
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  // Selected tokens
  const [token0, setToken0] = useState<TToken | null>(null);
  const [token1, setToken1] = useState<TToken | null>(null);

  // Balances
  const { balance: token0Bal, etherBalance } = useGetBalance({
    tokenAddress: token0?.address ?? zeroAddress,
  });
  const { balance: token1Bal } = useGetBalance({
    tokenAddress: token1?.address ?? zeroAddress,
  });

  const token0Balance =
    token0?.address === ETHER ? etherBalance.value : token0Bal;
  const token1Balance =
    token1?.address === ETHER ? etherBalance.value : token1Bal;
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
  const { approveWriteRequest, needsApproval, allowanceKey } = useApproveWrite({
    tokenAddress: token0?.address,
    spender: router,
    amount: amountIn,
    decimals: token0?.decimals,
  });
  console.log({ approveWriteRequest, needsApproval });

  // Simulate swap
  const { swapSimulation: swapSim, wrapSwapMutation } = useSwapSimulation({
    amount: amountIn,
    token0,
    token1,
    needsApproval,
    minAmountOut: parseUnits(amountOut, token1?.decimals ?? 18),
  });
  const {
    data: swapSimulation,
    error: swapSimulationError,
    isLoading: swapSimulationLoading,
  } = swapSim;

  const {
    writeContract,
    isPending,
    data: hash,
    error: writeError,
    reset,
  } = useWriteContract();
  const { isSuccess, isLoading: _isLoading } = useWaitForTransactionReceipt({
    hash,
  });
  const isLoading = _isLoading || wrapSwapMutation.isPending;
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

  const { needsWrap, resetWrap, depositSimulation } = useWrapWrite({
    amountIn,
    isWmon:
      token0?.address.toLowerCase() ===
      WETH[ChainId.MONAD_TESTNET].toLowerCase(),
  });
  console.log(needsWrap, "needsWrap");
  useEffect(() => {
    if (isSuccess && needsWrap) {
      setToast({ actionDescription: "", actionTitle: "Wrapped", hash });
      resetWrap();
      reset();
      return;
    }
    if (isSuccess && !needsApproval && !needsWrap) {
      reset();
      setAmountIn("");
      setAmountOut("");
    }
    if (isSuccess && needsApproval) {
      queryClient.invalidateQueries({ queryKey: allowanceKey });
      reset();
    }
  }, [
    allowanceKey,
    hash,
    isSuccess,
    needsApproval,
    needsWrap,
    queryClient,
    reset,
    resetWrap,
    setToast,
  ]);
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
    needsWrap,
    needsApproval,
    token0Balance,
    isLoading,
    wrapSimulation: !!depositSimulation?.data?.request,
    simulation: !!swapSimulation?.request,
    approveSimulation: !!approveWriteRequest,
    isSimulationLoading: swapSimulationLoading,
  });
  const onSubmit = useCallback(() => {
    if (needsWrap && depositSimulation.data?.request) {
      writeContract(depositSimulation.data?.request);
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
    needsWrap,
    depositSimulation.data?.request,
    approveWriteRequest,
    needsApproval,
    swapSimulation,
    writeContract,
  ]);

  const { state: buttonState } = useGetButtonStatuses({
    isPending,
    isLoading,
    needsApproval: needsApproval,
  });
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
          value={amountIn}
          selectPain={() => setActivePane(0)}
          token={token0}
          openDialog={() => setFirstDialogOpen(true)}
          balance={formatUnits(token0Balance, token0?.decimals ?? 18)}
          setValue={setAmountIn}
        />
        <SwapCard
          selected={activePane === 1}
          title="Buy"
          token={token1}
          balance={formatUnits(token1Balance, token1?.decimals ?? 18)}
          value={amountOut}
          selectPain={() => setActivePane(1)}
          openDialog={() => setSecondDialogOpen(true)}
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
      {token1 && token0 && amountIn !== "" && (
        <SwapDetails
          amountIn={parseUnits(amountIn, token0?.decimals ?? 18)}
          amountOut={parseUnits(amountOut, token1?.decimals ?? 18)}
          token0={token0}
          token1={token1}
        />
      )}
      <SubmitButton
        onClick={onSubmit}
        validationError={errorMessage}
        state={buttonState}
        isValid={isValid}
      >
        {!needsWrap ? "Swap" : "Wrap"}
      </SubmitButton>
    </div>
  );
}
