import { tokens } from "@/data/mock/tokens";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { executeGetPoolTokens } from "@/server/queries/pools/getPoolTokens";
import { getAddress } from "viem";
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
    .input(
      z.object({
        searchQuery: z.string().optional(),
        matchToken: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const tokens: {
        symbol: string;
        id: string;
        name: string;
      }[] = [];
      const nameAndSymbolPairs = await executeGetPoolTokens({
        searchQuery: input.searchQuery,
        matchToken: input.matchToken?.toLowerCase(),
      });
      nameAndSymbolPairs.tokens0.pairs
        .map((token) => ({
          ...token,
          token0: { ...token.token0, id: getAddress(token.token0.id) },
        }))
        .forEach((pair) => {
          tokens.push(pair.token0);
        });
      nameAndSymbolPairs.tokens1.pairs
        .map((token) => ({
          ...token,
          token1: { ...token.token1, id: getAddress(token.token1.id) }, // convert checksum
        }))
        .forEach((pair) => {
          tokens.push(pair.token1);
        });
      return { tokens: getUniqueValues(tokens) };
    }),
});
function getUniqueValues(
  arr: {
    symbol: string;
    id: string;
    name: string;
  }[]
) {
  const seen: Record<string, boolean> = {};
  return arr.filter((item) => {
    const value = item["id"];
    if (seen[value]) {
      return false;
    }
    seen[value] = true;
    return true;
  });
}
