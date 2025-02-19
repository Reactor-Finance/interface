import { graphqlClient } from "@/lib/graphClient";
import { gql } from "graphql-request";
import { z } from "zod";
import { PoolSchema, PoolsSchema } from ".";

const getPools = gql`
  {
    pairs {
      id
      totalSupply
      volumeUSD
      isStable
      token0 {
        id
        symbol
        decimals
      }
      token1 {
        id
        symbol
        decimals
      }
    }
  }
`;

export type TPool = z.infer<typeof PoolSchema>;
export const executeGetPools = async () => {
  const result = await graphqlClient.request(getPools);
  const safe = PoolsSchema.safeParse(result);
  return safe.data;
};
