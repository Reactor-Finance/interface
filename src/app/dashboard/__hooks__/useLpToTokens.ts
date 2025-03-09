interface Props {
  totalLpSupply: bigint;
  lpBalance: bigint;
  reverse0: bigint;

  reverse1: bigint;
}
export default function useLpToTokens({
  lpBalance,
  totalLpSupply,
  reverse0,
  reverse1,
}: Props) {
  const zeros = 10000000n;
  const usersPercent = (lpBalance * zeros) / totalLpSupply;
  const userToken0Amt = (reverse0 * usersPercent) / zeros;
  const userToken1Amt = (reverse1 * usersPercent) / zeros;
  return { userToken0Amt, userToken1Amt, usersPercent };
}
