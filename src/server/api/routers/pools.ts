import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  executeFindPool,
  findPoolSchema,
} from "@/server/queries/pools/getFindPools";
import { executeGetPools, FilterSchema } from "@/server/queries/pools/getPools";
import { zeroAddress } from "viem";
import { ChainId, EXCHANGE_HELPER, PAIR_HELPER } from "@/data/constants";
import { abi } from "@/lib/abis/PairHelper";
import { viemClient } from "@/lib/viemClient";
import { ExchangeHelper } from "@/lib/abis/ExchangeHelper";
//sleep
export const poolsRouter = createTRPCRouter({
  getPools: publicProcedure.input(FilterSchema).query(async ({ input }) => {
    const pools = await executeGetPools(input);
    return pools;
  }),
  getPoolsAndTvl: publicProcedure.query(async () => {
    const randomId = Math.random();
    const now = Math.floor(Date.now() / 1000);
    const yesterday = Math.floor(now - (24 * 60 * 60 * 1000) / 1000);
    const poolData = await viemClient.readContract({
      abi: ExchangeHelper,
      address: EXCHANGE_HELPER[ChainId.MONAD_TESTNET],
      functionName: "getPoolData",
      args: [BigInt(yesterday), BigInt(now)],
    });
    const pools = await viemClient.readContract({
      abi,
      address: PAIR_HELPER[ChainId.MONAD_TESTNET],
      functionName: "getAllPair",
      args: [zeroAddress, 100n, 0n],
    });
    const poolWithDetails = pools
      .map((pool) => {
        const data = poolData.find((data) => data.pair === pool.pair_address);
        return {
          ...pool,
          feeInUsd: data?.fee7 ?? 0n,
          tvlInUsd: data?.tvl ?? 0n,
          volumeInUsd7D: data?.volume24 ?? 0n,
        };
      })
      .filter(
        (pool) => pool.token0 !== zeroAddress && pool.token1 !== zeroAddress
      );
    let totalTvl = BigInt(0);
    let totalFees = BigInt(0);
    let totalVolume = BigInt(0);
    poolWithDetails.forEach((pool) => {
      totalTvl += pool.tvlInUsd;
      totalFees += pool.feeInUsd;
      totalVolume += pool.volumeInUsd7D;
    });
    return {
      randomId,
      pools: poolWithDetails,
      totals: {
        totalTvl,
        totalFees,
        totalVolume,
      },
    };
  }),
  findPool: publicProcedure.input(findPoolSchema).query(async ({ input }) => {
    const pools = await executeFindPool({
      tokenOneAddress: input.tokenOneAddress.toLowerCase(),
      tokenTwoAddress: input.tokenTwoAddress.toLowerCase(),
      isStable: input.isStable,
    });
    return pools;
  }),
});
export type TPoolRouter = typeof poolsRouter;
