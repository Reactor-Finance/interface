"use client";
import { TPoolRouter } from "@/server/api/routers/pools";
import { api } from "@/trpc/react";
import { convertWETHToPlainETHIfApplicable } from "@/utils";
import type { inferRouterOutputs } from "@trpc/server";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from "react";

import { useChainId } from "wagmi";

type TPoolsWithTvl = inferRouterOutputs<TPoolRouter>;

export type TPoolExtended = TPoolsWithTvl["getPoolsWith24HrData"][number];

interface PoolslistContextType {
  pools: TPoolsWithTvl["getPoolsWith24HrData"];
  isLoading: boolean;
  refresh: () => void;
}

const PoolslistContext = createContext<PoolslistContextType>({
  pools: [],
  isLoading: false,
  refresh: () => {},
});

export const PoolslistContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const chainId = useChainId();
  const {
    data: pools,
    isLoading,
    refetch,
  } = api.pool.getPoolsWith24HrData.useQuery(
    {
      chainId,
    },
    {
      refetchInterval: 300000, // Refetch every 5 minutes
    }
  );
  const refresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  return (
    <PoolslistContext.Provider
      value={{
        isLoading,
        refresh,
        pools:
          pools?.map((pool) => ({
            ...pool,
            token0: convertWETHToPlainETHIfApplicable(pool.token0, chainId),
            token1: convertWETHToPlainETHIfApplicable(pool.token1, chainId),
          })) || [],
      }}
    >
      {children}
    </PoolslistContext.Provider>
  );
};

export function usePoolslistContext() {
  return useContext(PoolslistContext);
}
