import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  executeFindPool,
  findPoolSchema,
} from "@/server/queries/pools/getFindPools";
import { executeGetPools } from "@/server/queries/pools/getPools";
import { z } from "zod";

export const poolsRouter = createTRPCRouter({
  getPools: publicProcedure
    .input(
      z.object({
        isStable: z.boolean().optional(),
        totalSupply_lt: z.number().optional(),
        totalSupply_gt: z.number().optional(),
        skip: z.number().optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      console.log(input, "INPUT");
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
