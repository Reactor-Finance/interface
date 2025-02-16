import { graphqlClient } from "@/lib/graphClient";
import { gql } from "graphql-request";
import { z } from "zod";

const getPoolTokens = ({
  searchQuery,
  token,
  searchToken,
}: {
  searchQuery?: string;
  token?: string;
  searchToken: "0" | "1";
}) => {
  let tokenDef = "";
  let tokenWhere = "";
  const matchToken = searchToken === "0" ? "1" : "0";
  if (searchQuery) {
    tokenDef = "($searchQuery: String!, $token: ID!)";

    const containsNameOrSymbl = `{or: [{name_contains_nocase: $searchQuery}, {symbol_contains_nocase: $searchQuery}]}`;
    const tokenContainsAddress = `{token${searchToken}_contains_nocase: $searchQuery}`;
    const tokenContainsNameSymbl = `{token${searchToken}_: ${containsNameOrSymbl}}`;

    const tokenOr = `{ or: [${tokenContainsAddress}, ${tokenContainsNameSymbl}] }`;
    tokenWhere = `(where: ${tokenOr})`;

    if (token) {
      const tokenEqualsAddress = `{token${matchToken}_: $token}`;
      const tokenAnd = `{ and: [${tokenOr}, ${tokenEqualsAddress}] }`;
      tokenWhere = `(where: ${tokenAnd})`;
    }
  }
  return gql`
    query${tokenDef} {
      pairs${tokenWhere} {
        id
        token${searchToken} {
          id
          symbol
          name
        }
      }
  }
  `;
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
  const result0 = await graphqlClient.request(
    getPoolTokens({ searchQuery, searchToken: "0" }),
    {
      searchQuery,
    }
  );
  const result1 = await graphqlClient.request(
    getPoolTokens({ searchQuery, searchToken: "1" }),
    {
      searchQuery,
    }
  );
  console.log(result1, result0);
  const a = PoolTokensSchema1.safeParse(result1);
  const b = PoolTokensSchema0.safeParse(result0);
  if (a.error || b.error) {
    console.log(a.error);
    throw new Error("Failed to parse get pool tokens data.");
  }
  return { tokens0: b.data, tokens1: a.data };
};
