import { ASSET_REPO } from "@/data/constants";

export function getLogoAsset(address: `0x${string}` | undefined) {
  if (!address) {
    return "";
  }
  const getChainName = () => {
    const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
    if (chainId === "1") {
      return "ethereum";
    }
    if (chainId === "11155111") {
      return "sepolia";
    }
    if (chainId === "17000") {
      return "holesky";
    }
  };
  const chainName = getChainName();
  return `${ASSET_REPO}/blockchains/${chainName}/assets/${address}/logo.png`;
}

export function inputPatternNumberMatch(s: string, decimals = 18) {
  const pattern = /^[0-9]*[.,]?[0-9]*$/;
  const decimalPattern = RegExp(`^\\d+(\\.\\d{0,${decimals}})?$`);
  if (s === "") {
    return true;
  }
  if (pattern.test(s) && decimalPattern.test(s)) return true;
  return false;
}
