"use client";
import React, { useCallback, useMemo, useState } from "react";
import SwapIconBorder from "@/components/shared/swapIconBorder";
import CurrencyInput from "@/components/shared/currencyInput";
import TokensDailog from "@/components/shared/tokensDialog";
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
import { zeroAddress } from "viem";

export default function SwapView() {
  // Wagmi parameters
  const chainId = useChainId();

  // Amount in
  const [amountIn, setAmountIn] = useState(0);
  // Selected tokens
  const [token0, setToken0] = useState<TToken | null>(null);
  const [token1, setToken1] = useState<TToken | null>(null);

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

  const { data: swapSimulation } = useSwapSimulation({
    amount: amountIn,
    token0,
    token1,
  });
  const { writeContract, isPending, data: hash } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({ hash });

  const switchTokens = useCallback(() => {
    const t0 = token0;
    const t1 = token1;
    // Switch
    setToken0(t1);
    setToken1(t0);
  }, [token0, token1]);

  const onSubmit = useCallback(() => {
    if (approveWriteRequest && needsApproval) {
      writeContract(approveWriteRequest);
      return;
    }
    if (swapSimulation) {
      writeContract(swapSimulation.request);
    }
  }, [approveWriteRequest, needsApproval, swapSimulation, writeContract]);

  const { state: buttonState } = useGetButtonStatuses({
    isPending,
    isLoading,
    needsApproval,
  });
  return (
    <div className="relative space-y-2">
      <TokensDailog
        open={firstDialogOpen}
        onOpen={setFirstDialogOpen}
        onTokenSelected={setToken0}
        selectedTokens={[
          token0?.address ?? zeroAddress,
          token1?.address ?? zeroAddress,
        ]}
      />
      <TokensDailog
        open={secondDialogOpen}
        onOpen={setSecondDialogOpen}
        onTokenSelected={setToken1}
        selectedTokens={[
          token0?.address ?? zeroAddress,
          token1?.address ?? zeroAddress,
        ]}
      />
      <InputPane active={activePane === 0} onClick={() => setActivePane(0)}>
        <CurrencyInput.Root title="Sell" estimate="0">
          <CurrencyInput.CurrencySelect
            onClick={() => setFirstDialogOpen(true)}
            token={token0}
          />
          <CurrencyInput.NumberInput
            onChangeValue={(value: string) => setAmountIn(Number(value))}
            disabled={false}
            decimals={10}
          />
        </CurrencyInput.Root>
      </InputPane>
      <SwapIconBorder swapIconClick={switchTokens} />
      <InputPane active={activePane === 1} onClick={() => setActivePane(1)}>
        <CurrencyInput.Root title="Buy" estimate="0">
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
          isValid={Boolean(swapSimulation)}
          approveTokenSymbol={token0?.symbol}
          onClick={onSubmit}
        >
          Swap
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
