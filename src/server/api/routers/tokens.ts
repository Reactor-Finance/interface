import { tokens } from "@/data/mock/tokens";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const tokensRouter = createTRPCRouter({
  test: publicProcedure
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
});
