import { graphqlClient } from "@/lib/graphClient";
import { gql } from "graphql-request";
import { z } from "zod";
import { PoolSchema, PoolsSchema } from ".";
import { joinWheres } from "../utils";

export const FilterSchema = z.object({
  isStable: z.boolean().optional(),
  totalSupply_lt: z.number().optional(),
  totalSupply_gt: z.number().optional(),
});

type Filter = z.infer<typeof FilterSchema>;

const getPools = (filter: Filter) => {
  const whereClause = joinWheres(filter);
  const defs = [];
  let tokenDef = ``;
  if (filter.isStable !== undefined) {
    defs.push("$isStable:Boolean");
  }
  if (filter.totalSupply_gt !== undefined) {
    defs.push("$totalSupply_gt:BigInt");
  }
  if (filter.totalSupply_lt !== undefined) {
    defs.push("$totalSupply_lt:BigInt");
  }
  tokenDef = defs.join(", ");
  const grp = gql`
    query(${tokenDef}){
      pairs(${whereClause}) {
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
  console.log(grp, "GetPools");
  return grp;
};

export type TPool = z.infer<typeof PoolSchema>;
export const executeGetPools = async (filter: Filter) => {
  const result = await graphqlClient.request(getPools(filter), filter);
  const safe = PoolsSchema.safeParse(result);
  return safe.data;
};
