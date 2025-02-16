import { graphqlClient } from "@/lib/graphClient";
import { gql } from "graphql-request";
import { z } from "zod";
const pairData = `
        id
        token0 {
          id
          symbol
          name
        }
        token1 {
          id
          symbol
          name
        }`;

const getPoolTokensBySymbolName = ({
  searchQuery,
}: {
  searchQuery?: string;
}) => {
  let tokenDef = "";
  let tokenWhere = "";
  const tokenWhereAddress = `{token0_contains_nocase: $searchQuery}, {token1_contains_nocase:$searchQuery}`;
  const tokenNameAndSymbl = `{or: [{name_contains_nocase: $searchQuery}, {symbol_contains_nocase: $searchQuery}]}`;
  const tokenWhereNameSymbl0 = `{token0_: ${tokenNameAndSymbl}}`;
  const tokenWhereNameSymbl1 = `{token1_: ${tokenNameAndSymbl}}`;
  if (searchQuery) {
    tokenDef = "$searchQuery: ID";
    tokenWhere = `where: { or: [${tokenWhereAddress}, ${tokenWhereNameSymbl0}, ${tokenWhereNameSymbl1}]`;
  }
  return gql`
    query (${tokenDef}) {
      pairs(${tokenWhere}) {
        ${pairData}
      }
    }
  `;
};

const PoolTokenSchema = z.object({
  id: z.string(),
  token0: z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
  }),
  token1: z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
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
  const result = await graphqlClient.request(
    getPoolTokensBySymbolName({ searchQuery })
  );
  const a = PoolTokensSchema.safeParse(result);
  if (a.error) {
    console.log(a.error);
    throw new Error("Failed to parse get pool tokens data.");
  }
  return a.data;
};
