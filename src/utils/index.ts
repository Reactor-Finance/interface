import { useTokenlistContext } from "@/contexts/tokenlistContext";
import { ChainId, ETHER, WETH } from "@/data/constants";
import { useMemo } from "react";
import { Address } from "viem";

export function useGetTokenInfo(address: string | undefined) {
  const { tokenlist } = useTokenlistContext();
  return useMemo(
    () =>
      tokenlist.find(
        (token) => token.address.toLowerCase() === address?.toLowerCase()
      ),
    [address, tokenlist]
  );
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

export function convertWETHToPlainETHIfApplicable(
  address: Address,
  chainId: number = ChainId.MONAD_TESTNET
) {
  return address.toLowerCase() === WETH[chainId].toLowerCase()
    ? ETHER
    : address;
}

export function convertETHToWETHIfApplicable(
  address: Address,
  chainId: number = ChainId.MONAD_TESTNET
) {
  return address.toLowerCase() === ETHER.toLowerCase()
    ? WETH[chainId]
    : address;
}
