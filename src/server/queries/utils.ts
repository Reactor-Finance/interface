import { graphqlClient } from "@/lib/graphClient";
import { gql } from "graphql-request";
import { z } from "zod";

const blockNumber = gql`
  query GetBlockNumber {
    _meta {
      block {
        number
      }
    }
  }
`;

export const blockNumberSchema = z.object({
  _meta: z.object({
    block: z.object({
      number: z.number(),
    }),
  }),
});
export const executeGetBlockNumber = async () => {
  const result = await graphqlClient.request(blockNumber);
  const safe = blockNumberSchema.safeParse(result);
  if (safe.success) {
    return safe.data;
  } else {
    return;
  }
};
