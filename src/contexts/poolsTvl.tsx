"use client";
import { TPools } from "@/server/queries/pools/getPools";
import { api } from "@/trpc/react";
import React, { createContext, ReactNode, useContext } from "react";

interface PoolslistContextType {
  pools: TPools["pairs"];
}

const PoolslistContext = createContext<PoolslistContextType>({
  pools: [],
});

export const PoolslistContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: pools } = api.pool.getPools.useQuery({});
  console.log(pools);
  return (
    <PoolslistContext.Provider value={{ pools: pools?.pairs ?? [] }}>
      {children}
    </PoolslistContext.Provider>
  );
};

export function usePoolslistContext() {
  return useContext(PoolslistContext);
}
