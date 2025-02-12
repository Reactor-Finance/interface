import { useLiquidityCardFormProvider } from "../liquidityCardFormProvider";

import { parseUnits } from "viem";

interface Props {
  tokenOneDeposit: string;
  tokenTwoDeposit: string;
  isApproving: boolean;
  isApproveSimulationValid: boolean;
  isAddLiquiditySimulationValid: boolean;
  isSuccess: boolean;
}
export default function useInitializePoolValidation({
  tokenOneDeposit,
  tokenTwoDeposit,
  isApproving,
  isSuccess,
  isAddLiquiditySimulationValid,
  isApproveSimulationValid,
}: Props) {
  const {
    tokenOneBalance,
    tokenTwoBalance,
    tokenTwoDecimals,
    tokenOneDecimals,
  } = useLiquidityCardFormProvider();

  const enoughToken =
    parseUnits(tokenOneDeposit, tokenOneDecimals ?? 0) <= tokenOneBalance &&
    parseUnits(tokenTwoDeposit, tokenTwoDecimals ?? 0) <= tokenTwoBalance;
  if (isSuccess) {
    return { isValid: true, error: null };
  }
  if (isApproving) {
    if (isApproveSimulationValid) {
      return { isValid: true, error: null };
    }
  }
  if (!enoughToken) {
    return { isValid: false, error: "Insufficient balance." };
  }
  if (!isAddLiquiditySimulationValid) {
    return { isValid: false, error: null };
  }
  return { isValid: true, error: null };
}
