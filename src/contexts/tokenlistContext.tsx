import { TToken } from "@/lib/types";
import { getTokenlist } from "@/server/queries/tokens";
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
}

const TokenlistContext = createContext<TokenlistContextType>({
  tokenlist: [],
  loading: false,
  error: null,
});

export const TokenlistContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [tokenlist, setTokenlist] = useState<TToken[]>([]);
  const chainId = useChainId();

  useEffect(() => {
    async function fetchTokens() {
      try {
        setLoading(true);
        const list = await getTokenlist(chainId);
        setTokenlist(list);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    }

    fetchTokens();
  }, [chainId]);

  return (
    <TokenlistContext.Provider value={{ tokenlist, loading, error }}>
      {children}
    </TokenlistContext.Provider>
  );
};

export function useTokenlistContext() {
  return useContext(TokenlistContext);
}
