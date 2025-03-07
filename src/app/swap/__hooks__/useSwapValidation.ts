import { ErrorMessage, TToken } from "@/lib/types";
import { useMemo } from "react";
import { parseUnits } from "viem";

interface Props {
  token0Balance: bigint;
  amountIn: string;
  token0: TToken | null;
  token1: TToken | null;
}

export default function useSwapValidation({
  token0Balance,
  amountIn,
  token0,
  token1,
}: Props) {
  const { isValid, message } = useMemo(() => {
    if (token0 === null || token1 === null) {
      return { isValid: false, message: null };
    }
    if (token0Balance < parseUnits(String(amountIn), token0?.decimals ?? 18)) {
      return { isValid: false, message: ErrorMessage.INSUFFICIENT_BALANCE };
    }
    return { isValid: true, message: null };
  }, [amountIn, token0, token0Balance, token1]);
  return { isValid, message };
}
