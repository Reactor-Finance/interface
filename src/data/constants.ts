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
  [ChainId.MONAD_TESTNET]: "0xD59B88727680a026C572fEeD94fB81579c1c1394",
};
export const PAIR_HELPER: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0xcD6de9d7f6d2e105cDc4807D83839Bd1442498EB",
};
export const ROUTER: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0x0067e92EAa46701c75D77dEb970c568307B086c5",
};
export const WETH: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701",
};
export const ORACLE: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0x27b14220DD749343979da9ea1434d086f99f2ABB",
};
export const ETHER = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
