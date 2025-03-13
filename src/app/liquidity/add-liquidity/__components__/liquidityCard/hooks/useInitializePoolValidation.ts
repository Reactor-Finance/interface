import { TToken } from "@/lib/types";

import { parseUnits } from "viem";

interface Props {
  amount0: string;
  amount1: string;
  balance0: bigint;
  balance1: bigint;
  token0: TToken | undefined;
  token1: TToken | undefined;
}
export default function useInitializePoolValidation({
  amount0,
  amount1,
  balance0,
  balance1,
  token0,
  token1,
}: Props) {
  if (parseUnits(amount0, token0?.decimals ?? 18) > balance0) {
    return {
      isValid: false,
      errorMessage: `Insufficient ${token0?.symbol} Balance.`,
    };
  }
  if (parseUnits(amount1, token1?.decimals ?? 18) > balance1) {
    return {
      isValid: false,
      errorMessage: `Insufficient ${token1?.symbol} Balance.`,
    };
  }
  return { isValid: true, errorMessage: null };
}
