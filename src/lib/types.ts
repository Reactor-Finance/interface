// GLOBAL TYPES

export type TAddress = `0x${string}`;
export enum TPoolType {
  "CONCENTRATED",
  "STABLE",
  "VOLATILE",
}

export type TToken = { address: TAddress; symbol: string; decimals: number };

export enum SwapSteps {
  Wrap,
  Approve,
  Swap,
}
