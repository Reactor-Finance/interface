"use client";

import { TToken } from "@/lib/types";
import { api } from "@/trpc/react";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useChainId } from "wagmi";

interface TokenlistContextType {
  tokenlist: TToken[];
  loading: boolean;
  hasError?: boolean | null;
  setSearchQuery: (query: string) => void;
  searchQuery: string;
}

const TokenlistContext = createContext<TokenlistContextType>({
  tokenlist: [],
  loading: false,
  hasError: null,
  setSearchQuery: console.log,
  searchQuery: "",
});
// no reason to refetch this will change infrequently
// function useSetInterval(cb: () => void, INTERVAL = 60000) {
//   return useEffect(() => {
//     const interval = setInterval(cb, INTERVAL);
//     return () => {
//       clearInterval(interval);
//     };
//   }, [INTERVAL, cb]);
// }

export const TokenlistContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const chainId = useChainId();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: tokenlist = [],
    isLoading: loading,
    error,
  } = api.tokens.getTokens.useQuery({ chainId, searchQuery });
  return (
    <TokenlistContext.Provider
      value={{
        tokenlist,
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
