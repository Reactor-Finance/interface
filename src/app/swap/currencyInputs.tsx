"use client";
import React, { useMemo, useState } from "react";
import SwapIconBorder from "@/components/shared/swapIconBorder";
import CurrencyInput from "@/components/shared/currencyInput";
import SearchTokensDailog from "@/components/shared/searchTokensDialog";
import { TAddress, TToken } from "@/lib/types";
import { useReadContract, useSimulateContract } from "wagmi";
import { Contracts } from "@/lib/contracts";
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
  const {} = useSimulateContract({
    ...Contracts.Router,
    functionName: "swap",
    args: [
      0n, //amountIn
      0n, //minOut
      [
        {
          from: state.selectedTokens.tokenOne.address ?? "0x",
          to: state.selectedTokens.tokenTwo.address ?? "0x",
          stable: false,
        },
      ],
      "0x", //address
      0n, //deadline
      true, //useTokenAsFee
    ],
  });
  useReadContract({ ...Contracts.Router, functionName: "tradeHelper" });
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
        swapClick={() => {
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
