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

const getPoolTokensByAddress = ({ searchQuery }: { searchQuery?: string }) => {
  let tokenDef = "";
  let tokenWhere = "";
  if (searchQuery) {
    tokenDef = "$searchQuery: ID";
    tokenWhere =
      "where: { or: [{ tokenO_contains_nocase: $searchQuery }, { token1_contains_nocase: $searchQuery }] }";
  }
  return gql`
    query (${tokenDef}) {
      pairs(${tokenWhere}) {
        ${pairData}
      }
    }
  `;
};

const getPoolTokensBySymbolName = ({
  searchQuery,
}: {
  searchQuery?: string;
}) => {
  let tokenDef = "";
  let tokenWhere = "";
  if (searchQuery) {
    tokenDef = "$searchQuery: ID";
    tokenWhere = `where: { or: 
                    [token0_:{ 
                      or:[{symbol_contains_nocase: $seachQuery }, {name_contains_nocase:$searchQuery}]
                    },
                    { token1_:
                      or:[{ name_contains_nocase:$searchQuery}, {symbol_contains_nocase:$searchQuery}]
                    } ] }`;
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
  searchByAddress,
}: {
  searchQuery?: string;
  searchByAddress: boolean;
}) => {
  const result = await graphqlClient.request(
    searchByAddress
      ? getPoolTokensByAddress({ searchQuery })
      : getPoolTokensBySymbolName({ searchQuery })
  );
  const a = PoolTokensSchema.safeParse(result);
  return a.data;
};
