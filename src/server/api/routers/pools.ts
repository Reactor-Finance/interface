import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  executeFindPool,
  findPoolSchema,
} from "@/server/queries/pools/getFindPools";
import { executeGetPools, FilterSchema } from "@/server/queries/pools/getPools";
import { zeroAddress } from "viem";
import { abi } from "@/lib/abis/PairHelper";
import { ChainId, PAIR_HELPER } from "@/data/constants";
import { viemClient } from "@/lib/viemClient";
//sleep
export const poolsRouter = createTRPCRouter({
  getPools: publicProcedure.input(FilterSchema).query(async ({ input }) => {
    const pools = await executeGetPools(input);
    return pools;
  }),
  getPoolsAndTvl: publicProcedure.query(async () => {
    const randomId = Math.random();
    const pools = await viemClient.readContract({
      abi,
      address: PAIR_HELPER[ChainId.MONAD_TESTNET],
      functionName: "getAllPair",
      args: [zeroAddress, 200n, 0n],
    });
    const poolWithDetails = pools
      .map((pool) => {
        const randomIntA = Math.floor(Math.random() * 100);
        const randomIntB = Math.floor(Math.random() * 100);
        const randomIntC = Math.floor(Math.random() * 100);
        return {
          ...pool,
          feeInUsd: BigInt(randomIntA),
          tvlInUsd: BigInt(randomIntB),
          volumeInUsd7D: BigInt(randomIntC),
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
