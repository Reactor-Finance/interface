import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { executeGetUserLiquidityPositions } from "@/server/queries/user";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getLiquidityPositions: publicProcedure
    .input(z.object({ userAddress: z.string().min(42).max(42) }))
    .query(async ({ input }) => {
      const result = await executeGetUserLiquidityPositions({
        id: input.userAddress,
      });
      return result;
    }),
});
