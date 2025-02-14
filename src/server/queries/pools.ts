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
  isStable: z.boolean(),
  token0: z.object({
    id: z.string(),
    symbol: z.string(),
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

const findPoolQuery = ({ isStable }: { isStable?: boolean }) => {
  let stableWhere = "";
  let stableDef = "";
  if (isStable !== undefined) {
    stableWhere = `isStable: $stable`;
    stableDef = `, $stable: Boolean`;
  }
  return gql`
    query ($token0Id: ID, $token1Id: ID, ${stableDef}) {
      pairs(where: { token0: $token0Id, token1: $token1Id, ${stableWhere} }) {
        id
        totalSupply
        volumeUSD
        isStable
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
// 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984
// 0x2260fac5e5542a773aa44fbcfedf7c193bc2c599
export const executeFindPool = async ({
  tokenOneAddress,
  tokenTwoAddress,
  isStable,
}: {
  tokenOneAddress: string;
  tokenTwoAddress: string;
  isStable?: boolean;
}) => {
  const result = await graphqlClient.request(findPoolQuery({ isStable }), {
    token0Id: tokenOneAddress,
    token1Id: tokenTwoAddress,
    stable: isStable,
  });
  const safe = PoolsSceham.safeParse(result);
  if (safe.error) throw Error("Zod parse error.");
  return safe.data;
};
