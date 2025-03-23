import { graphqlClient } from "@/lib/graphClient";
import { gql } from "graphql-request";

import { z } from "zod";

const TokenSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  decimals: z.string(),
  name: z.string(),
});

const PairSchema = z.object({
  id: z.string(),
  isStable: z.boolean(),
  token0: TokenSchema,
  token1: TokenSchema,
});

const LiquidityPositionSchema = z.object({
  id: z.string(),
  liquidityTokenBalance: z.string(),
  pair: PairSchema,
});

const UserSchemaDetails = z.object({
  id: z.string(),
  liquidityPositions: z.array(LiquidityPositionSchema),
});

const UserSchema = z.object({
  user: UserSchemaDetails.nullable(),
});
export type UserLiquidityPositions = z.infer<typeof UserSchema>;
export type UserLiquidityPosition = z.infer<typeof LiquidityPositionSchema>;
export const userQuery = gql`
  query UserLiquidityPositions($id: ID!) {
    user(id: $id) {
      id
      liquidityPositions {
        id
        liquidityTokenBalance
        pair {
          id
          isStable
          token0 {
            id
            symbol
            name
            decimals
          }
          token1 {
            id
            symbol
            name
            decimals
          }
        }
      }
    }
  }
`;

export const executeGetUserLiquidityPositions = async ({
  id,
}: {
  id: string;
}) => {
  console.log(id, "ID");
  const result = await graphqlClient.request(userQuery, {
    id: id.toLowerCase(),
  });
  console.log(result, "USER RESULT");
  const safe = UserSchema.safeParse(result);
  if (safe.error) throw Error("Zod parse error.");
  if (safe.success) {
    return safe.data;
  }
};
