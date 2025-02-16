import { graphqlClient } from "@/lib/graphClient";
import { gql } from "graphql-request";
import { z } from "zod";

const tokenNameAndSymbl = `{or: [{name_contains_nocase: $searchQuery}, {symbol_contains_nocase: $searchQuery}]}`;
const getPoolTokens1 = ({ searchQuery }: { searchQuery?: string }) => {
  let tokenDef = "";
  let tokenWhere = "";
  const tokenWhereAddress = `{token1_contains_nocase:$searchQuery}`;
  const tokenWhereNameSymbl1 = `{token1_: ${tokenNameAndSymbl}}`;

  if (searchQuery) {
    tokenDef = "($searchQuery: String)";
    tokenWhere = `(where: { or: [${tokenWhereAddress}, ${tokenWhereNameSymbl1}]})`;
  }
  return gql`
    query${tokenDef} {
      pairs${tokenWhere} {

        id
        token1 {
          id
          symbol
          name
        }
      }
  }
  `;
};

const getPoolTokens0 = ({ searchQuery }: { searchQuery?: string }) => {
  let tokenDef = "";
  let tokenWhere = "";
  const tokenWhereAddress = `{token0_contains_nocase: $searchQuery} `;
  const tokenWhereNameSymbl0 = `{token0_: ${tokenNameAndSymbl}}`;
  if (searchQuery) {
    tokenDef = "($searchQuery: String)";
    tokenWhere = `(where: { or: [${tokenWhereAddress}, ${tokenWhereNameSymbl0}]})`;
  }
  const a = gql`
    query${tokenDef} {
      pairs${tokenWhere} {
        id
        token0 {
          id
          symbol
          name
        }
      }
  }
  `;
  console.log(a);
  return a;
};

const PoolTokenSchema0 = z.object({
  id: z.string(),
  token0: z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
  }),
});

const PoolTokenSchema1 = z.object({
  id: z.string(),
  token1: z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
  }),
});
const PoolTokensSchema0 = z.object({
  pairs: z.array(PoolTokenSchema0),
});
const PoolTokensSchema1 = z.object({
  pairs: z.array(PoolTokenSchema1),
});
export const executeGetPoolTokens = async ({
  searchQuery,
}: {
  searchQuery?: string;
}) => {
  const result0 = await graphqlClient.request(getPoolTokens0({ searchQuery }), {
    searchQuery,
  });
  const result1 = await graphqlClient.request(getPoolTokens1({ searchQuery }), {
    searchQuery,
  });
  const a = PoolTokensSchema1.safeParse(result1);
  const b = PoolTokensSchema0.safeParse(result0);
  if (a.error || b.error) {
    console.log(a.error);
    throw new Error("Failed to parse get pool tokens data.");
  }
  return { tokens0: b.data, tokens1: a.data };
};
