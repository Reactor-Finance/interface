import { z } from "zod";

export const PoolSchema = z.object({
  id: z.string(),
  totalSupply: z.string(),
  volumeUSD: z.string(),
  isStable: z.boolean(),
  token0: z.object({
    id: z.string(),
    symbol: z.string(),
    decimals: z.string(),
    totalSupply: z.string().optional(),
  }),
  token1: z.object({
    id: z.string(),
    decimals: z.string(),
    totalSupply: z.string().optional(),
    symbol: z.string(),
  }),
});
export const PoolsSchema = z.object({ pairs: z.array(PoolSchema) });
export type TPools = z.infer<typeof PoolSchema>;
