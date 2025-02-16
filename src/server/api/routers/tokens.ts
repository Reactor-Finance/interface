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
  getPoolTokens: publicProcedure
    .input(z.object({ searchQuery: z.string().optional() }))
    .query(async ({ input }) => {
      const tokens: {
        symbol: string;
        id: string;
        name: string;
      }[] = [];
      const nameAndSymbolPairs = await executeGetPoolTokens({
        searchQuery: input.searchQuery,
      });
      nameAndSymbolPairs.pairs.forEach((pair) => {
        tokens.push(pair.token0);
        tokens.push(pair.token1);
      });
      return { tokens: [...new Set(tokens)] };
    }),
});
