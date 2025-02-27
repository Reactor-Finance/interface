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

export const VOTER: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0xEeeC1d828520fC26541624c4e2E34376220CB93a",
};
export const TRADE_HELPER: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0xEeeC1d828520fC26541624c4e2E34376220CB93a",
};
export const ROUTER: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0x2D67FC1622099Ed068a2049c83773D9016c4aaEf",
};
export const WETH: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701",
};
export const ETHER = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
