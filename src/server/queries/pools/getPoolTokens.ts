import { graphqlClient } from "@/lib/graphClient";
import { gql } from "graphql-request";
import { z } from "zod";

const getPoolTokens = ({ token }: { token?: string }) => {
  let tokenDef = "";
  let tokenWhere = "";
  if (token) {
    tokenDef = "$token: ID";
    tokenWhere = "where: { OR: [{ tokenO: $token }, { token1: $token }] }";
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
export const executeGetPoolTokens = async ({ token }: { token?: string }) => {
  const result = await graphqlClient.request(getPoolTokens({ token }));
  const a = PoolTokensSchema.safeParse(result);
  return a.data;
};
