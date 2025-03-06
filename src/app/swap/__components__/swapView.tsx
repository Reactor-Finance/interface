"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import SwapIconBorder from "@/components/shared/swapIconBorder";
import TokensDialog from "@/components/shared/tokensDialog";
import CurrencyInput from "@/components/shared/currencyInput";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import {
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useSwapSimulation } from "../__hooks__/useSwapSimulation";
import SubmitButton from "@/components/shared/submitBtn";
import { useQuoteSwap } from "../__hooks__/useQuoteSwap";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { TToken } from "@/lib/types";
import { ROUTER } from "@/data/constants";
import { formatUnits, parseUnits, zeroAddress } from "viem";
import { useWETHExecutions } from "../__hooks__/useWETHExecutions";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { formatNumber } from "@/lib/utils";
import useSwapValidation from "../__hooks__/useSwapValidation";

export default function SwapView() {
  // Wagmi parameters
  const chainId = useChainId();

  // Amount in
  const [amountIn, setAmountIn] = useState("");
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
  const [activePane, setActivePane] = useState<0 | 1 | null>(null);

  // Quote
  const { amountOut } = useQuoteSwap({
    amountIn,
    tokenIn: token0,
    tokenOut: token1,
  });

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
  const { isLoading } = useWaitForTransactionReceipt({ hash });
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
      reset();
      writeContract(approveWriteRequest);
      return;
    }
    if (swapSimulation) {
      reset();
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
  if (amountIn === "" || amountIn === "") {
    stateValid = false;
  }
  useEffect(() => {
    if (writeError) {
      console.log(writeError);
    }

    if (swapSimulationError) {
      console.log(swapSimulationError);
    }
  }, [writeError, swapSimulationError]);

  return (
    <div className="relative space-y-2">
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
      <InputPane active={activePane === 0} onClick={() => setActivePane(0)}>
        <CurrencyInput.Root
          title="Sell"
          estimate={formatNumber(
            formatUnits(token0Balance, token0?.decimals ?? 18)
          )}
        >
          <CurrencyInput.CurrencySelect
            onClick={() => setFirstDialogOpen(true)}
            token={token0}
          />
          <CurrencyInput.NumberInput
            onChangeValue={(value: string) => setAmountIn(value)}
            disabled={false}
            decimals={10}
          />
        </CurrencyInput.Root>
      </InputPane>
      <SwapIconBorder swapIconClick={switchTokens} />
      <InputPane active={activePane === 1} onClick={() => setActivePane(1)}>
        <CurrencyInput.Root
          title="Buy"
          estimate={formatNumber(
            formatUnits(token1Balance, token1?.decimals ?? 18)
          )}
        >
          <CurrencyInput.CurrencySelect
            onClick={() => setSecondDialogOpen(true)}
            token={token1}
          />
          <CurrencyInput.NumberInput
            value={amountOut}
            disabled={true}
            decimals={10}
          />
        </CurrencyInput.Root>
      </InputPane>

      <div className="pt-2">
        <SubmitButton
          state={buttonState}
          isValid={!!stateValid && isValid}
          validationError={errorMessage}
          disabled={!stateValid}
          approveTokenSymbol={token0?.symbol}
          onClick={onSubmit}
        >
          {isIntrinsicWETHProcess
            ? isWETHToEther
              ? "Unwrap"
              : "Wrap"
            : "Swap"}
        </SubmitButton>
      </div>
    </div>
  );
}

function InputPane({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <div
      data-state={active ? "active" : "inactive"}
      onClick={onClick}
      className="rounded-xl bg-neutral-1000 cursor-pointer data-[state=active]:bg-neutral-1050  py-6 px-4"
    >
      {children}
    </div>
  );
}
