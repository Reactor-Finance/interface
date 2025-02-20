import { graphqlClient } from "@/lib/graphClient";
import { gql } from "graphql-request";
import { z } from "zod";
import { PoolSchema, PoolsSchema } from ".";
import { joinWheres } from "../utils";

export const FilterSchema = z.object({
  isStable: z.boolean().optional(),
  totalSupply_lt: z.number().optional(),
  totalSupply_gt: z.number().optional(),
  skip: z.number().optional(),
  searchQuery: z.string().optional(),
});

type Filter = z.infer<typeof FilterSchema>;

const tokenContainsSymb = (t: string) =>
  `{token${t}_:{symbol_contains_nocase:$searchQuery}}`;
const tokenContainsAddr = (t: string) =>
  `{token${t}_contains_nocase:$searchQuery}`;
const getPools = (filter: Filter) => {
  const [a, b] = ["0", "1"].map((s) => tokenContainsSymb(s));
  const [c, d] = ["0", "1"].map((s) => tokenContainsAddr(s));
  const searchClause = `or: [${a}, ${b}, ${c}, ${d}]`;
  const whereClause = joinWheres(filter, {
    exclude: ["searchQuery", "skip"],
    add: filter.searchQuery ? [searchClause] : undefined,
  });
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
  if (filter.searchQuery !== undefined) {
    defs.push("$searchQuery:String");
  }
  if (filter.skip !== undefined) {
    defs.push("$skip:Int");
  }
  tokenDef = defs.join(", ");
  const grp = gql`
    query(${tokenDef},  ){
      pairs(${whereClause} first:10, ${Boolean(filter.skip) ? "skip:$skip" : ""} ) {
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
