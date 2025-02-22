import { RCT_DECIMALS } from "@/data/constants";
import { useMemo } from "react";
import { parseUnits } from "viem";

interface Props {
  amount: string;
  approveSimulation: boolean;
  approveWriteRequest: boolean;
  increaseAmountSimulation: boolean;
  isLockApproved: boolean;
  needsApproval: boolean;
  rctBalance: bigint | undefined;
}
export function useIncreaseLockValidation({
  needsApproval,
  isLockApproved,
  rctBalance,
  approveWriteRequest,
  approveSimulation,
  increaseAmountSimulation,
  amount,
}: Props) {
  const { isValid, error: validationError } = useMemo(() => {
    if (!amount) {
      return {
        isValid: false,
        error: "Enter Amount",
      };
    }
    if (parseUnits(amount, RCT_DECIMALS) > (rctBalance ?? 0n)) {
      return {
        isValid: false,
        error: "Insufficient RCT",
      };
    }
    if (needsApproval) {
      if (approveWriteRequest) {
        return { isValid: true, error: null };
      }
    }
    if (!isLockApproved && approveSimulation) {
      if (approveSimulation) {
        return { isValid: true, error: null };
      }
    }
    if (increaseAmountSimulation) {
      return { isValid: true, error: null };
    }
    return {
      isValid: false,
      error: null,
    };
  }, [
    amount,
    approveSimulation,
    approveWriteRequest,
    increaseAmountSimulation,
    isLockApproved,
    needsApproval,
    rctBalance,
  ]);
  return { isValid, validationError };
}
