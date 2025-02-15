import { graphqlClient } from "@/lib/graphClient";
import { gql } from "graphql-request";
import { z } from "zod";

const getPoolTokens = ({ searchQuery }: { searchQuery?: string }) => {
  let tokenDef = "";
  let tokenWhere = "";
  if (searchQuery) {
    tokenDef = "$searchQuery: ID";
    tokenWhere =
      "filter: { OR: [{ tokenO_contains: $searchQuery }, { token1_contains: $searchQuery }] }";
  }
  return gql`
    query (${tokenDef}) {
      pairs(${tokenWhere}) {
        id
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
    }
  `;
};

const PoolTokenSchema = z.object({
  id: z.string(),
  token0: z.object({
    id: z.string(),
    symbol: z.string(),
  }),
  token1: z.object({
    id: z.string(),
    symbol: z.string(),
  }),
});
const PoolTokensSchema = z.object({
  pairs: z.array(PoolTokenSchema),
});
export const executeGetPoolTokens = async ({
  searchQuery,
}: {
  searchQuery?: string;
}) => {
  const result = await graphqlClient.request(getPoolTokens({ searchQuery }));
  const a = PoolTokensSchema.safeParse(result);
  return a.data;
};
