// GLOBAL TYPES

import { isAddress } from "viem";
import { z } from "zod";
export enum ErrorMessage {
  INSUFFICIENT_BALANCE = "Insufficient Balance.",
  UNKNOWN_ERROR = "Unknown Error.",
}
export const TokenlistSchema = z.array(
  z
    .object({
      name: z.string(),
      symbol: z.string(),
      address: z.string().refine((arg) => isAddress(arg)),
      logoURI: z.union([z.string().url().min(1), z.string().base64().min(1)]),
      decimals: z
        .number()
        .int()
        .max(2 ** 8),
      chainId: z.number().int(),
    })
    .strict()
);

export type TAddress = `0x${string}`;

export enum TPoolType {
  "CONCENTRATED",
  "STABLE",
  "VOLATILE",
}

export type TToken = z.infer<typeof TokenlistSchema.element>;

export enum SwapSteps {
  Wrap,
  Approve,
  Swap,
}
