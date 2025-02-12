"use client";
import { TAddress, TPoolType } from "@/lib/types";
import React, { createContext, useContext } from "react";
import { erc20Abi } from "viem";
import { useReadContracts } from "wagmi";

interface LiquidityCardFormProviderType {
  tokenOneDecimals: number | undefined;
  tokenTwoDecimals: number | undefined;
  poolType: TPoolType | undefined;
}

const LiquidityContext = createContext<
  LiquidityCardFormProviderType | undefined
>(undefined);
interface Props {
  children: React.ReactNode;
  tokenOne: TAddress;
  tokenTwo: TAddress;
  poolType: TPoolType;
}

export const LiquidityCardFormProvider = ({
  children,
  tokenOne,
  tokenTwo,
  poolType,
}: Props) => {
  const { data } = useReadContracts({
    contracts: [
      {
        address: tokenOne,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: tokenTwo,
        abi: erc20Abi,
        functionName: "decimals",
      },
    ],
  });
  const tokenOneDecimals = data?.[0].result;
  const tokenTwoDecimals = data?.[1].result;
  return (
    <LiquidityContext.Provider
      value={{
        poolType,
        tokenOneDecimals,
        tokenTwoDecimals,
      }}
    >
      {children}
    </LiquidityContext.Provider>
  );
};

// Custom hook to use the context
export const useLiquidityCardFormProvider = () => {
  const context = useContext(LiquidityContext);
  if (!context) {
    throw new Error(
      "useLiquidityCardFormProvider must be used within a MyProvider"
    );
  }
  return context;
};
