import { useTokenlistContext } from "@/contexts/tokenlistContext";
import { useMemo } from "react";

export function useGetTokenInfo(address: string | undefined) {
  const { tokenlist } = useTokenlistContext();
  console.log(tokenlist, "tokenlist", { address });
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
