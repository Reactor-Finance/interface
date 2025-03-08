"use client";

import { TToken } from "@/lib/types";
import { api } from "@/trpc/react";
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { useChainId } from "wagmi";

interface TokenlistContextType {
  tokenlist: TToken[];
  filteredList: TToken[];
  loading: boolean;
  hasError?: boolean | null;
  setSearchQuery: (query: string) => void;
  searchQuery: string;
}

const TokenlistContext = createContext<TokenlistContextType>({
  tokenlist: [],
  filteredList: [],
  loading: false,
  hasError: null,
  setSearchQuery: console.log,
  searchQuery: "",
});

export const TokenlistContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const chainId = useChainId();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: tokenlist = [],
    isLoading: loading,
    error,
  } = api.tokens.getTokens.useQuery({ chainId });

  const filteredTokenlist = useMemo(
    () =>
      tokenlist.filter(
        (token) =>
          token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.address.toLowerCase().startsWith(searchQuery.toLowerCase())
      ),
    [tokenlist, searchQuery]
  );

  return (
    <TokenlistContext.Provider
      value={{
        tokenlist,
        filteredList: filteredTokenlist,
        loading,
        hasError: Boolean(error),
        setSearchQuery,
        searchQuery,
      }}
    >
      {children}
    </TokenlistContext.Provider>
  );
};

export function useTokenlistContext() {
  return useContext(TokenlistContext);
}
