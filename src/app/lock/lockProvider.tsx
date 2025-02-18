"use client";
import { Contracts } from "@/lib/contracts";
import React, { createContext, useContext, useMemo, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
export type TLockToken = {
  decimals: number;
  voted: boolean;
  attachments: bigint;
  id: bigint;
  amount: bigint;
  voting_amount: bigint;
  rebase_amount: bigint;
  lockEnd: bigint;
  vote_ts: bigint;
  votes: readonly {
    pair: `0x${string}`;
    weight: bigint;
  }[];
  account: `0x${string}`;
  token: `0x${string}`;
  tokenSymbol: string;
  tokenDecimals: bigint;
};
interface LockProviderType {
  lockTokens: readonly TLockToken[];
  selectedLockToken: TLockToken | undefined;
  selectedTokenId: string;
  setSelectedTokenId: React.Dispatch<React.SetStateAction<string>>;
  queryKey: readonly unknown[];
}

const LiquidityContext = createContext<LockProviderType | undefined>(undefined);
interface Props {
  children: React.ReactNode;
}

export const LockProvider = ({ children }: Props) => {
  const { address } = useAccount();
  const { data: tokens, queryKey } = useReadContract({
    ...Contracts.veNFTHelper,
    functionName: "getNFTFromAddress",
    args: [address ?? "0x"],
    query: {
      enabled: Boolean(address),
    },
  });
  const [selectedTokenId, setSelectedTokenId] = useState<string>("");
  const selectedLockToken = useMemo(() => {
    return tokens?.find((token) => token.id.toString() === selectedTokenId);
  }, [selectedTokenId, tokens]);
  return (
    <LiquidityContext.Provider
      value={{
        selectedLockToken,
        setSelectedTokenId,
        selectedTokenId,
        queryKey,
        lockTokens: tokens ?? [],
      }}
    >
      {children}
    </LiquidityContext.Provider>
  );
};

// Custom hook to use the context
export const useLockProvider = () => {
  const context = useContext(LiquidityContext);
  if (!context) {
    throw new Error("useLockProvider must be used within a LockProvider");
  }
  return context;
};
