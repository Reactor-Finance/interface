import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  executeFindPool,
  findPoolSchema,
} from "@/server/queries/pools/getFindPools";
import { executeGetPools, FilterSchema } from "@/server/queries/pools/getPools";

export const poolsRouter = createTRPCRouter({
  getPools: publicProcedure.input(FilterSchema).query(async ({ input }) => {
    const pools = await executeGetPools(input);
    return pools;
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
