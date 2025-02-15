import React, { useState } from "react";

import SwapIconBorder from "@/components/shared/swapIconBorder";
import CurrencyInput from "@/components/shared/currencyInput";
import { USDC_ADDRESS } from "@/data/constants";
import SearchTokensDailog from "@/components/shared/searchTokensDialog";
import { TToken } from "@/lib/types";
export default function CurrencyInputs() {
  const [inputOneModal, setInputOneModal] = useState(false);
  const [inputTwoModal, setInputTwoModal] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState<{
    tokenOne: TToken;
    tokenTwo: TToken;
  }>({
    tokenOne: { address: "0x", symbol: "" },
    tokenTwo: { address: "0x", symbol: "" },
  });
  console.log(inputTwoModal, selectedTokens);
  return (
    <>
      <CurrencyInput.Root title="Sell" estimate="0">
        <SearchTokensDailog
          open={inputOneModal}
          setOpen={setInputOneModal}
          setToken={function ({ address, symbol }: TToken): void {
            setSelectedTokens((t) => ({ ...t, tokenOne: { address, symbol } }));
          }}
        />
        <CurrencyInput.CurrencySelect
          onClick={() => {
            setInputOneModal(true);
          }}
          token="USDC"
          tokenAddress={USDC_ADDRESS}
        />
        <CurrencyInput.NumberInput disabled={false} decimals={10} />
      </CurrencyInput.Root>
      <SwapIconBorder />

      <CurrencyInput.Root title="Buy" estimate="0">
        <CurrencyInput.CurrencySelect
          onClick={() => setInputTwoModal(true)}
          token="USDC"
          tokenAddress={USDC_ADDRESS}
        />
        <CurrencyInput.NumberInput disabled={false} decimals={10} />
      </CurrencyInput.Root>
    </>
  );
}
