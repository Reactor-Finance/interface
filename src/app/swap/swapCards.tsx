"use client";
import React, { useCallback, useMemo, useState } from "react";
import SwapIconBorder from "@/components/shared/swapIconBorder";
import SearchTokensDailog from "@/components/shared/searchTokensDialog";
import useHandleSetToken from "./hooks/useHandleSetToken";
import { useSwapProvider } from "./swapProvider";
import { Contracts } from "@/lib/contracts";
import useApproveWrite from "@/components/shared/hooks/useApproveWrite";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import useSwapSimulate from "./hooks/useSwapSimulate";
import SubmitButton from "@/components/shared/submitBtn";
import { useQuoteSwap } from "./hooks/useQuoteSwap";
import useGetButtonStatuses from "@/components/shared/hooks/useGetButtonStatuses";
import SwapCard from "./swapCard";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
export default function SwapCards() {
  const { updateState, state } = useSwapProvider();
  const [isApproving, setIsApproving] = useState(false);
  console.log(isApproving);
  const {} = useQuoteSwap();
  const handleSetToken = useHandleSetToken();
  const handleSetOpen = (open: boolean) => {
    if (state.inTokenModalOpen) {
      updateState({ inTokenModalOpen: open });
    } else {
      updateState({ outTokenModalOpen: open });
    }
  };
  // @matchToken used as a query filter to get
  // tokens in liquidity pools that have the selected token
  // only returns if one token is selected
  const matchToken = useMemo(() => {
    if (state.inToken && state.outToken) {
      return;
    }
    if (state.inToken) {
      return state.inToken?.address;
    } else if (state.outToken) {
      return state.outToken.address;
    }
  }, [state.inToken, state.outToken]);

  // checks allowance
  const { approveWriteRequest, needsApproval } = useApproveWrite({
    tokenAddress: state.inToken?.address,
    spender: Contracts.Router.address,
    amount: state.inTokenAmount,
  });
  const { data: swapSimulation } = useSwapSimulate();

  const { writeContract, isPending, data: hash } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({ hash });
  const onSubmit = useCallback(() => {
    if (approveWriteRequest) {
      writeContract(approveWriteRequest);
      setIsApproving(true);
      return;
    }
    if (swapSimulation) {
      writeContract(swapSimulation.request);
    }
  }, [approveWriteRequest, swapSimulation, writeContract]);
  const { state: buttonState } = useGetButtonStatuses({
    isPending,
    isLoading,
    needsApproval,
  });
  return (
    <div className="relative space-y-2">
      <SearchTokensDailog
        open={state.inTokenModalOpen || state.outTokenModalOpen}
        setOpen={handleSetOpen}
        usePoolTokens
        setToken={handleSetToken}
        matchToken={matchToken}
      />
      <SwapCard onSelect={() => {}} />
      <SwapIconBorder
        swapClick={() => {
          updateState({
            inToken: state.outToken ? { ...state.outToken } : null,
            outToken: state.inToken ? { ...state.inToken } : null,
          });
        }}
      />
      <SwapCard onSelect={() => {}} />

      <Card className="bg-transparent space-y-4 text-sm border border-neutral-800">
        <div className="flex justify-between">
          <span>Recieved</span>
          <span>Recieved</span>
        </div>
        <button className="flex gap-x-1 text-blue-light">
          <span>Show Detailed Breakdown</span>
          <ChevronDown />
        </button>
      </Card>
      <div className="pt-2">
        <SubmitButton
          state={buttonState}
          isValid={Boolean(swapSimulation)}
          approveTokenSymbol={state.inToken?.symbol}
          onClick={onSubmit}
        >
          Swap
        </SubmitButton>
      </div>
    </div>
  );
}
