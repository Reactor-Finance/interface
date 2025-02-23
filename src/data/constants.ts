export const ASSET_REPO =
  "https://raw.githubusercontent.com/SIR-trading/assets/master";
export const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
export const TWO_YEARS = 62208000;
export const DAYS_14 = 60 * 60 * 24 * 14;
export const QUOTE_REFETCH_INTERVAL = 1000 * 30;
export const RCT_DECIMALS = 18;

export enum ChainId {
  MONAD_TESTNET = 10143,
}

export const TRADE_HELPER: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0xEeeC1d828520fC26541624c4e2E34376220CB93a",
};
