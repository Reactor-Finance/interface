"use client";
import React, { useState } from "react";

import SwapIconBorder from "@/components/shared/swapIconBorder";
import CurrencyInput from "@/components/shared/currencyInput";
import { USDC_ADDRESS } from "@/data/constants";
import SearchTokensDailog from "@/components/shared/searchTokensDialog";
import { TToken } from "@/lib/types";
type CurrencyInputState = {
  inputOneModal: boolean;
  inputTwoModal: boolean;
  selectedTokens: {
    tokenOne: TToken;
    tokenTwo: TToken;
  };
};
export default function CurrencyInputs() {
  const [state, setState] = useState<CurrencyInputState>({
    inputOneModal: false,
    inputTwoModal: false,
    selectedTokens: {
      tokenOne: { address: "0x", symbol: "" },
      tokenTwo: { address: "0x", symbol: "" },
    },
  });

  return (
    <>
      <CurrencyInput.Root title="Sell" estimate="0">
        <SearchTokensDailog
          open={state.inputOneModal}
          setOpen={(open) => {
            setState((prev) => ({ ...prev, inputOneModal: open }));
          }}
          usePoolTokens
          setToken={({ address, symbol }: TToken) =>
            setState((prev) => ({
              ...prev,
              selectedTokens: {
                ...prev.selectedTokens,
                tokenOne: { address, symbol },
              },
            }))
          }
        />
        <CurrencyInput.CurrencySelect
          onClick={() => setState((prev) => ({ ...prev, inputOneModal: true }))}
          token="USDC"
          tokenAddress={USDC_ADDRESS}
        />
        <CurrencyInput.NumberInput disabled={false} decimals={10} />
      </CurrencyInput.Root>
      <SwapIconBorder />
      <CurrencyInput.Root title="Buy" estimate="0">
        <SearchTokensDailog
          open={state.inputTwoModal}
          setOpen={(open) =>
            setState((prev) => ({ ...prev, inputTwoModal: open }))
          }
          setToken={({ address, symbol }: TToken) =>
            setState((prev) => ({
              ...prev,
              selectedTokens: {
                ...prev.selectedTokens,
                tokenTwo: { address, symbol },
              },
            }))
          }
          usePoolTokens
        />
        <CurrencyInput.CurrencySelect
          onClick={() => setState((prev) => ({ ...prev, inputTwoModal: true }))}
          token="USDC"
          tokenAddress={USDC_ADDRESS}
        />
        <CurrencyInput.NumberInput disabled={false} decimals={10} />
      </CurrencyInput.Root>
    </>
  );
}
