"use client";
import React, { useMemo, useState } from "react";
import SwapIconBorder from "@/components/shared/swapIconBorder";
import CurrencyInput from "@/components/shared/currencyInput";
import SearchTokensDailog from "@/components/shared/searchTokensDialog";
import { TAddress, TToken } from "@/lib/types";
type Token = {
  address: TAddress | undefined;
  symbol: string | undefined;
};
type CurrencyInputState = {
  inputOneModal: boolean;
  inputTwoModal: boolean;
  selectedTokens: {
    tokenOne: Token;
    tokenTwo: Token;
  };
};
export default function CurrencyInputs() {
  const [state, setState] = useState<CurrencyInputState>({
    inputOneModal: false,
    inputTwoModal: false,
    selectedTokens: {
      tokenOne: { address: undefined, symbol: undefined },
      tokenTwo: { address: undefined, symbol: undefined },
    },
  });
  const handleSetToken = ({ address, symbol }: TToken) => {
    const bothSelected =
      state.selectedTokens.tokenOne.address &&
      state.selectedTokens.tokenTwo.address;

    if (state.inputOneModal) {
      if (bothSelected) {
        setState((prev) => ({
          ...prev,
          inputOneModal: false,
          selectedTokens: {
            tokenOne: { address, symbol },
            tokenTwo: { address: undefined, symbol: undefined },
          },
        }));
      } else {
        setState((prev) => ({
          ...prev,
          inputOneModal: false,
          selectedTokens: {
            ...prev.selectedTokens,
            tokenOne: { address, symbol },
          },
        }));
      }
    }
    if (state.inputTwoModal) {
      if (bothSelected) {
        setState((prev) => ({
          ...prev,
          inputTwoModal: false,
          selectedTokens: {
            tokenTwo: { address, symbol },
            tokenOne: { address: undefined, symbol: undefined },
          },
        }));
      } else {
        setState((prev) => ({
          ...prev,
          inputTwoModal: false,
          selectedTokens: {
            ...prev.selectedTokens,
            tokenTwo: { address, symbol },
          },
        }));
      }
    }
  };
  const handleSetOpen = (open: boolean) => {
    if (state.inputOneModal) {
      setState((prev) => ({ ...prev, inputOneModal: open }));
    } else {
      setState((prev) => ({ ...prev, inputTwoModal: open }));
    }
  };
  const matchToken = useMemo(() => {
    if (
      state.selectedTokens.tokenTwo.address &&
      state.selectedTokens.tokenOne.address
    ) {
      return;
    }
    if (state.selectedTokens.tokenOne.address) {
      return state.selectedTokens.tokenOne.address;
    } else {
      return state.selectedTokens.tokenTwo.address;
    }
  }, [state.selectedTokens.tokenOne, state.selectedTokens.tokenTwo.address]);
  console.log(matchToken, "match");
  return (
    <>
      <SearchTokensDailog
        open={state.inputOneModal || state.inputTwoModal}
        setOpen={handleSetOpen}
        usePoolTokens
        setToken={handleSetToken}
        matchToken={matchToken}
      />
      <CurrencyInput.Root title="Sell" estimate="0">
        <CurrencyInput.CurrencySelect
          onClick={() => setState((prev) => ({ ...prev, inputOneModal: true }))}
          token={state.selectedTokens.tokenOne.symbol}
          tokenAddress={state.selectedTokens.tokenOne.address}
        />
        <CurrencyInput.NumberInput disabled={false} decimals={10} />
      </CurrencyInput.Root>
      <SwapIconBorder
        onClick={() => {
          setState((prev) => ({
            ...prev,
            inputTwoModal: false,
            selectedTokens: {
              tokenOne: {
                address: prev.selectedTokens.tokenTwo.address,
                symbol: prev.selectedTokens.tokenTwo.symbol,
              },
              tokenTwo: {
                address: prev.selectedTokens.tokenOne.address,
                symbol: prev.selectedTokens.tokenOne.symbol,
              },
            },
          }));
        }}
      />
      <CurrencyInput.Root title="Buy" estimate="0">
        <CurrencyInput.CurrencySelect
          onClick={() => setState((prev) => ({ ...prev, inputTwoModal: true }))}
          token={state.selectedTokens.tokenTwo.symbol}
          tokenAddress={state.selectedTokens.tokenTwo.address}
        />
        <CurrencyInput.NumberInput disabled={false} decimals={10} />
      </CurrencyInput.Root>
    </>
  );
}
