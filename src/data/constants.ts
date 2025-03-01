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
export const VE_NFT_HELPER: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0x6485ECf484640395Eb91Fe8DF50e1110D0d4D930",
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
export const VE: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0x2203cEf33764a133138528095bd88dacF669F196",
};
export const RCT: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0xE125F57EAF50C4e93B8c24c5c49D405e51D7122D",
};
export const ETHER = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
