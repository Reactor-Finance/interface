"use client";
import React, { createContext, useContext, useState } from "react";
export type TLockToken = {
  amount: string;
  duration: number;
  id: string;
};
interface ManageLockDialogProviderType {
  lockTokens: TLockToken[];
  selectedTokenId: string;
  setSelectedTokenId: React.Dispatch<React.SetStateAction<string>>;
}

const LiquidityContext = createContext<
  ManageLockDialogProviderType | undefined
>(undefined);
interface Props {
  children: React.ReactNode;
}

export const ManageLockDialogProvider = ({ children }: Props) => {
  // const { address } = useAccount();
  const tokens: TLockToken[] = [];
  const [selectedTokenId, setSelectedTokenId] = useState<string>("");
  return (
    <LiquidityContext.Provider
      value={{
        setSelectedTokenId,
        selectedTokenId,
        lockTokens: tokens,
      }}
    >
      {children}
    </LiquidityContext.Provider>
  );
};

// Custom hook to use the context
export const useManageLockDialogProvider = () => {
  const context = useContext(LiquidityContext);
  if (!context) {
    throw new Error(
      "useManageLockDialogProvider must be used within a MyProvider"
    );
  }
  return context;
};
