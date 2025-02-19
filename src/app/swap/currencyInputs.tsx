"use client";
import React, { useCallback, useMemo, useState } from "react";
import SwapIconBorder from "@/components/shared/swapIconBorder";
import CurrencyInput from "@/components/shared/currencyInput";
import SearchTokensDailog from "@/components/shared/searchTokensDialog";
import useHandleSetToken from "./hooks/useHandleSetToken";
import { useSwapProvider } from "./swapProvider";
import { Contracts } from "@/lib/contracts";
import useApproveWrite from "@/components/shared/hooks/useApproveWrite";
import { useWriteContract } from "wagmi";
import useSwapSimulate from "./hooks/useSwapSimulate";
export default function CurrencyInputs() {
  const { updateState, state } = useSwapProvider();
  const [isApproving, setIsApproving] = useState(false);
  console.log(isApproving);
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
  const writeApprove = useApproveWrite({
    tokenAddress: state.inToken?.address,
    spender: Contracts.Router.address,
    amount: state.inTokenAmount,
    token: state.inToken,
  });
  const { data: swapSimulation } = useSwapSimulate();
  const { writeContract } = useWriteContract();
  const onSubmit = useCallback(() => {
    if (writeApprove) {
      writeContract(writeApprove);
      setIsApproving(true);
      return;
    }
    if (swapSimulation) {
      writeContract(swapSimulation.request);
    }
  }, [swapSimulation, writeApprove, writeContract]);
  return (
    <div className="relative space-y-1">
      <SearchTokensDailog
        open={state.inTokenModalOpen || state.outTokenModalOpen}
        setOpen={handleSetOpen}
        usePoolTokens
        setToken={handleSetToken}
        matchToken={matchToken}
      />
      <CurrWrapper
        active={state.inTokenSelected}
        onClick={() =>
          updateState({ outTokenSelected: false, inTokenSelected: true })
        }
      >
        <CurrencyInput.Root title="Sell" estimate="0">
          <CurrencyInput.CurrencySelect
            onClick={() => updateState({ inTokenModalOpen: true })}
            token={state.inToken}
          />
          <CurrencyInput.NumberInput
            onChangeValue={(value: string) => {
              updateState({ inTokenAmount: value });
            }}
            disabled={false}
            decimals={10}
          />
        </CurrencyInput.Root>
      </CurrWrapper>
      <SwapIconBorder
        swapClick={() => {
          updateState({
            inToken: state.outToken ? { ...state.outToken } : null,
            outToken: state.inToken ? { ...state.inToken } : null,
          });
        }}
      />
      <CurrWrapper
        active={state.outTokenSelected}
        onClick={() =>
          updateState({ outTokenSelected: true, inTokenSelected: false })
        }
      >
        <CurrencyInput.Root title="Buy" estimate="0">
          <CurrencyInput.CurrencySelect
            onClick={() => updateState({ outTokenModalOpen: true })}
            token={state.outToken}
          />
          <CurrencyInput.NumberInput
            onChangeValue={(value: string) => {
              updateState({ outTokenAmount: value });
            }}
            disabled={false}
            decimals={10}
          />
        </CurrencyInput.Root>
      </CurrWrapper>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}
function CurrWrapper({
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
