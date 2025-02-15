import { tokens } from "@/data/mock/tokens";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { executeGetPoolTokens } from "@/server/queries/pools/getPoolTokens";
import { z } from "zod";

export const tokensRouter = createTRPCRouter({
  searchTokensByNameAndAddress: publicProcedure
    .input(
      z.object({
        search: z.string(),
      })
    )
    .query(async ({ input }) => {
      // ** For now Mocking a query to a database **
      const tokensFoundByName = tokens.filter((token) =>
        token.symbol.toLowerCase().includes(input.search.toLowerCase())
      );
      const tokensFoundByAddress = tokens.filter((token) =>
        token.address.toLowerCase().includes(input.search.toLowerCase())
      );
      return { tokensFoundByName, tokensFoundByAddress };
    }),
  searchPoolTokens: publicProcedure
    .input(z.object({ token: z.string().optional() }))
    .query(async ({ input }) => {
      return await executeGetPoolTokens({ token: input.token });
    }),
});
