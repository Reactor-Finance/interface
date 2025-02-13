import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { executeFindPool, executeGetPools } from "@/server/queries/pools";
import { z } from "zod";

export const poolsRouter = createTRPCRouter({
  getPools: publicProcedure.query(async () => {
    const pools = executeGetPools();
    return pools;
  }),
  findPool: publicProcedure
    .input(
      z.object({
        tokenOneAddress: z.string().length(42),
        tokenTwoAddress: z.string().length(42),
      })
    )
    .query(async ({ input }) => {
      const pools = await executeFindPool({
        tokenOneAddress: input.tokenOneAddress.toLowerCase(),
        tokenTwoAddress: input.tokenTwoAddress.toLowerCase(),
      });
      return pools;
    }),
});
