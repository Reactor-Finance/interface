import { useTokenlistContext } from "@/contexts/tokenlistContext";

export function useGetTokenInfo(address: string | undefined) {
  const { tokenlist } = useTokenlistContext();
  return tokenlist.find(
    (token) => token.address.toLowerCase() === address?.toLowerCase()
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
