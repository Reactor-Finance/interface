"use client";

import { TToken } from "@/lib/types";
import { api } from "@/trpc/react";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useChainId } from "wagmi";

interface TokenlistContextType {
  tokenlist: TToken[];
  loading: boolean;
  error?: any;
  setSearchQuery: (query: string) => void;
  searchQuery: string;
}

const TokenlistContext = createContext<TokenlistContextType>({
  tokenlist: [],
  loading: false,
  error: null,
  setSearchQuery: console.log,
  searchQuery: "",
});

function useSetInterval(cb: () => void, INTERVAL = 60000) {
  return useEffect(() => {
    const interval = setInterval(cb, INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [INTERVAL]);
}

export const TokenlistContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const chainId = useChainId();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: tokenlist = [],
    isLoading: loading,
    error,
    refetch,
  } = api.tokens.getTokens.useQuery({ chainId, searchQuery });

  useSetInterval(() => {
    void refetch();
  });

  return (
    <TokenlistContext.Provider
      value={{ tokenlist, loading, error, setSearchQuery, searchQuery }}
    >
      {children}
    </TokenlistContext.Provider>
  );
};

export function useTokenlistContext() {
  return useContext(TokenlistContext);
}
