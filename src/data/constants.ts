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
export const PAIR_FACTORY: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0x22595aA7f5298b49D62450DA6300882Fb3d98eBc",
};
export const VOTER: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0x8B72C1cebD63Aea76B6C5B09217A8c8889A3F6ba",
};
export const TRADE_HELPER: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0x10Bdbe470aF509Ca514A88DEc4911CC958052f1f",
};
export const PAIR_HELPER: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0xf5164104183Fb402d8FDEc6c7BF74C1D5DeD2Ddd",
};
export const VE_NFT_HELPER: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0x37F979B20a59f3E2702CaE86c5a8608Ebb81776A",
};
export const ROUTER: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0xDeA70f42A5d04Bfde45f27DB7c97563814DaB15C",
};
export const WETH: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701",
};
export const ORACLE: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0xAa97c394C26c122F926fEB015237C82a62A98D51",
};
export const VE: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0xbe4e46fA5179672c0e606eE97Bf02AD47e7e1910",
};
export const RCT: { [key: number]: `0x${string}` } = {
  [ChainId.MONAD_TESTNET]: "0x02B8FcBE1D7ff6D6652C3A332B6a7B71392B6251",
};
export const ETHER = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
