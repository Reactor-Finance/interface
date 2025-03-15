"use client";
import { TPoolRouter } from "@/server/api/routers/pools";
import { api } from "@/trpc/react";
import type { inferRouterOutputs } from "@trpc/server";
import React, { createContext, ReactNode, useContext } from "react";
type TPoolsWithTvl = inferRouterOutputs<TPoolRouter>;
export type TPoolExtended = TPoolsWithTvl["getPoolsAndTvl"]["pools"][number];
interface PoolslistContextType {
  pools: TPoolsWithTvl["getPoolsAndTvl"]["pools"];
  totals: TPoolsWithTvl["getPoolsAndTvl"]["totals"] | undefined;
  isLoading: boolean;
}
const PoolslistContext = createContext<PoolslistContextType>({
  pools: [],
  isLoading: false,
  totals: undefined,
});
export const PoolslistContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, isLoading } = api.pool.getPoolsAndTvl.useQuery();
  const pools = data?.pools;
  const totals = data?.totals;
  return (
    <PoolslistContext.Provider
      value={{ isLoading, pools: pools ?? [], totals }}
    >
      {children}
    </PoolslistContext.Provider>
  );
};

export function usePoolslistContext() {
  return useContext(PoolslistContext);
}
