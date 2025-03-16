"use client";
import { ChainId, ETHER, WETH } from "@/data/constants";
import { TPoolRouter } from "@/server/api/routers/pools";
import { api } from "@/trpc/react";
import type { inferRouterOutputs } from "@trpc/server";
import React, { createContext, ReactNode, useContext } from "react";
import { Address } from "viem";
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
export function wmonToMon(addr: Address) {
  if (addr.toLowerCase() === WETH[ChainId.MONAD_TESTNET].toLowerCase()) {
    return ETHER.toLowerCase() as Address;
  } else {
    return addr;
  }
}
export const PoolslistContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, isLoading } = api.pool.getPoolsAndTvl.useQuery();
  const pools = data?.pools;
  const totals = data?.totals;
  const mPools =
    pools?.map((p) => {
      return {
        ...p,
        token0: wmonToMon(p.token0),
        token1: wmonToMon(p.token1),
      };
    }) ?? [];
  console.log(mPools);
  return (
    <PoolslistContext.Provider
      value={{
        isLoading,
        pools: mPools,
        totals,
      }}
    >
      {children}
    </PoolslistContext.Provider>
  );
};

export function usePoolslistContext() {
  return useContext(PoolslistContext);
}
