import { ErrorMessage, TToken } from "@/lib/types";
import { useMemo } from "react";
import { parseUnits } from "viem";

interface Props {
  token0Balance: bigint;
  amountIn: string;
  token0: TToken | null;
  token1: TToken | null;
  simulation: boolean;
  needsApproval: boolean;
  approveSimulation: boolean;
  needsWrap: boolean;
  isLoading: boolean;
}

export default function useSwapValidation({
  token0Balance,
  amountIn,
  token0,
  token1,
  needsApproval,
  needsWrap,
  approveSimulation,
  simulation,
  isLoading,
}: Props) {
  const { isValid, message } = useMemo(() => {
    if (amountIn === "") {
      return { isValid: false, message: null };
    }
    if (token0 === null || token1 === null) {
      return { isValid: false, message: null };
    }
    if (token0Balance < parseUnits(String(amountIn), token0?.decimals ?? 18)) {
      return { isValid: false, message: ErrorMessage.INSUFFICIENT_BALANCE };
    }
    if (needsWrap) {
      return { isValid: true, message: null };
    }
    if (isLoading) {
      return { isValid: false, message: null };
    }
    if (needsApproval) {
      if (approveSimulation) {
        return { isValid: true, message: null };
      } else {
        return { isValid: false, message: null };
      }
    }
    if (!simulation) {
      return { isValid: false, message: "Error Occured" };
    }
    return { isValid: true, message: null };
  }, [
    amountIn,
    approveSimulation,
    isLoading,
    needsApproval,
    simulation,
    token0,
    token0Balance,
    token1,
  ]);
  return { isValid, message };
}
