import { graphqlClient } from "@/lib/graphClient";
import { gql } from "graphql-request";
import { PoolsSchema } from ".";
import { z } from "zod";

export const findPoolSchema = z.object({
  tokenOneAddress: z.string(),
  tokenTwoAddress: z.string(),
  isStable: z.boolean().optional(),
});

type Pool = z.infer<typeof findPoolSchema>;
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
};

export const executeFindPool = async ({
  tokenOneAddress,
  tokenTwoAddress,
  isStable,
}: Pool) => {
  const result = await graphqlClient.request(findPoolQuery({ isStable }), {
    token0Id: tokenOneAddress,
    token1Id: tokenTwoAddress,
    stable: isStable,
  });
  const safe = PoolsSchema.safeParse(result);
  if (safe.error) throw Error("Zod parse error.");
  return safe.data;
};
