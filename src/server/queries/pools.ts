import { graphqlClient } from "@/lib/graphClient";
import { gql } from "graphql-request";
import { z } from "zod";

const getPools = gql`
  {
    pairs {
      id
      totalSupply
      volumeUSD
      token0 {
        id
        symbol
        pairBase {
          isStable
        }
      }
      token1 {
        id
        symbol
      }
    }
  }
`;

const PoolSchema = z.object({
  id: z.string(),
  totalSupply: z.string(),
  volumeUSD: z.string(),
  token0: z.object({
    id: z.string(),
    symbol: z.string(),
    pairBase: z.array(
      z.object({
        isStable: z.boolean(),
      })
    ),
  }),
  token1: z.object({
    id: z.string(),
    symbol: z.string(),
  }),
});
const PoolsSceham = z.object({ pairs: z.array(PoolSchema) });
export type TPool = z.infer<typeof PoolSchema>;
export const executeGetPools = async () => {
  const result = await graphqlClient.request(getPools);
  const safe = PoolsSceham.safeParse(result);
  return safe.data;
};

const findPoolQuery = gql`
  query ($token0Id: ID, $token1Id: ID) {
    pairs(where: { token0: $token0Id, token1: $token1Id }) {
      id
      totalSupply
      volumeUSD
      token0 {
        id
        symbol
        pairBase {
          isStable
        }
      }
      token1 {
        id
        symbol
      }
    }
  }
`;
// 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984
// 0x2260fac5e5542a773aa44fbcfedf7c193bc2c599
export const executeFindPool = async ({
  tokenOneAddress,
  tokenTwoAddress,
}: {
  tokenOneAddress: string;
  tokenTwoAddress: string;
}) => {
  const result = await graphqlClient.request(findPoolQuery, {
    token0Id: tokenOneAddress,
    token1Id: tokenTwoAddress,
  });
  const safe = PoolsSceham.safeParse(result);
  return safe.data;
};
