"use client";
import { useCheckUserVeNFTs } from "@/lib/hooks/useCheckUserVeNFTs";
import { useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAccount } from "wagmi";
export type TVeNFTsToken = {
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
interface VeNFTsProviderType {
  lockTokens: readonly TVeNFTsToken[];
  selectedVeNFTsToken: TVeNFTsToken | undefined;
  reset: () => void;
  selectedTokenId: string;
  setSelectedTokenId: React.Dispatch<React.SetStateAction<string>>;
  queryKey: readonly unknown[];
}

const LiquidityContext = createContext<VeNFTsProviderType | undefined>(
  undefined
);
interface Props {
  children: React.ReactNode;
}

export const VeNFTsProvider = ({ children }: Props) => {
  const { address } = useAccount();
  const { data: locks, queryKey } = useCheckUserVeNFTs();
  const [selectedTokenId, setSelectedTokenId] = useState<string>("");
  const selectedVeNFTsToken = useMemo(() => {
    return locks?.find((token) => token.id.toString() === selectedTokenId);
  }, [locks, selectedTokenId]);
  useEffect(() => {
    if (address) {
      setSelectedTokenId("");
    }
  }, [address]);
  const queryClient = useQueryClient();
  const reset = useCallback(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [queryClient, queryKey]);

  return (
    <LiquidityContext.Provider
      value={{
        reset,
        selectedVeNFTsToken,
        setSelectedTokenId,
        selectedTokenId,
        queryKey,
        lockTokens: locks ?? [],
      }}
    >
      {children}
    </LiquidityContext.Provider>
  );
};

// Custom hook to use the context
export const useVeNFTsProvider = () => {
  const context = useContext(LiquidityContext);
  if (!context) {
    throw new Error("useVeNFTsProvider must be used within a VeNFTsProvider");
  }
  return context;
};
