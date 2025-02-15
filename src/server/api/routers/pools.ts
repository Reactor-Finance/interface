import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { executeFindPool } from "@/server/queries/pools/getFindPools";
import { executeGetPools } from "@/server/queries/pools/getPools";
import { z } from "zod";

export const poolsRouter = createTRPCRouter({
  getPools: publicProcedure.query(async () => {
    const pools = await executeGetPools();
    return pools;
  }),
  findPool: publicProcedure
    .input(
      z.object({
        tokenOneAddress: z.string().length(42),
        tokenTwoAddress: z.string().length(42),
        isStable: z.boolean().optional(),
      })
    )
    .query(async ({ input }) => {
      const pools = await executeFindPool({
        tokenOneAddress: input.tokenOneAddress.toLowerCase(),
        tokenTwoAddress: input.tokenTwoAddress.toLowerCase(),
        isStable: input.isStable,
      });
      return pools;
    }),
});
