import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  executeFindPool,
  findPoolSchema,
} from "@/server/queries/pools/getFindPools";
import { FilterSchema, executeGetPools } from "@/server/queries/pools/getPools";
import { zeroAddress } from "viem";
import { ChainId, EXCHANGE_HELPER, PAIR_HELPER } from "@/data/constants";
import { abi } from "@/lib/abis/PairHelper";
import { viemClient } from "@/lib/viemClient";
import * as ExchangeHelper from "@/lib/abis/ExchangeHelper";
import { z } from "zod";

const PoolsWithDataSchema = z
  .object({
    startTime: z.coerce.date().optional(),
    chainId: z.number().int().default(ChainId.MONAD_TESTNET),
  })
  .strict();

export const poolsRouter = createTRPCRouter({
  getPools: publicProcedure.input(FilterSchema).query(async ({ input }) => {
    const pools = await executeGetPools(input);
    return pools;
  }),
  getPoolsWith24HrData: publicProcedure
    .input(PoolsWithDataSchema)
    .query(async ({ input }) => {
      const now = Math.floor((input.startTime?.getTime() || Date.now()) / 1000);
      const gap = 86400; // 24 hours
      const yesterday = now - gap;
      // Get TVL
      const [, tvls, pairs0] = await viemClient.readContract({
        ...ExchangeHelper,
        address: EXCHANGE_HELPER[input.chainId],
        functionName: "getTVLInUSDForAllPairs",
      });
      // Get volumes per-time
      const [, volumes, pairs1] = await viemClient.readContract({
        ...ExchangeHelper,
        address: EXCHANGE_HELPER[input.chainId],
        functionName: "getTotalVolumeLockedPerTime",
        args: [BigInt(yesterday), BigInt(now)],
      });
      // Get fees
      const [, fees, pairs2] = await viemClient.readContract({
        ...ExchangeHelper,
        address: EXCHANGE_HELPER[input.chainId],
        functionName: "getFeesInUSDForAllPairs",
      });

      // Get incentives
      const [, incentives, pairs3] = await viemClient.readContract({
        ...ExchangeHelper,
        address: EXCHANGE_HELPER[input.chainId],
        functionName: "getBribesInUSDForAllPairs",
      });

      // Get pairs
      const pairs = await viemClient.readContract({
        abi,
        address: PAIR_HELPER[input.chainId],
        functionName: "getAllPair",
        args: [zeroAddress, 1000n, 0n],
      });
      // Map pools
      const mappedPools = pairs.map((pair) => {
        // TVL
        const tvlIndex = pairs0.findIndex(
          (addr) => addr.toLowerCase() === pair.pair_address.toLowerCase()
        );
        // Volume
        const volumeIndex = pairs1.findIndex(
          (addr) => addr.toLowerCase() === pair.pair_address.toLowerCase()
        );
        // Fees
        const feeIndex = pairs2.findIndex(
          (addr) => addr.toLowerCase() === pair.pair_address.toLowerCase()
        );
        // Bribes
        const incentiveIndex = pairs3.findIndex(
          (addr) => addr.toLowerCase() === pair.pair_address.toLowerCase()
        );

        return {
          ...pair,
          tvl: tvls[tvlIndex] || 0n,
          volume24hr: volumes[volumeIndex] || 0n,
          fees: fees[feeIndex] || 0n,
          incentives: incentives[incentiveIndex] || 0n,
        };
      });
      return mappedPools.filter(
        (pair) => pair.pair_address !== zeroAddress && pair.total_supply > 0n
      );
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
