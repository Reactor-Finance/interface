import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { ErrorMessage, TToken } from "@/lib/types";
import { useMemo } from "react";
import { parseUnits } from "viem";

interface Props {
  amountIn: number;
  token0: TToken | null;
  token1: TToken | null;
  simulation: boolean;
}

export default function useSwapValidation({
  amountIn,
  token0,
  token1,
  simulation,
}: Props) {
  const token0Balance = useGetBalance({ tokenAddress: token0?.address });
  const { isValid, message } = useMemo(() => {
    if (amountIn === 0 || isNaN(amountIn)) {
      return { isValid: false, message: null };
    }
    if (token0 === null || token1 === null) {
      return { isValid: false, message: null };
    }
    if (token0Balance < parseUnits(String(amountIn), token0?.decimals ?? 18)) {
      return { isValid: false, message: ErrorMessage.INSUFFICIENT_BALANCE };
    }
    if (!simulation) {
      return { isValid: false, message: "Error Occured" };
    }
    return { isValid: true, message: null };
  }, [amountIn, simulation, token0, token0Balance, token1]);
  return { isValid, message };
}
