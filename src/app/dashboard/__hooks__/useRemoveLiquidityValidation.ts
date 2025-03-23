interface Props {
  needsApproval: boolean;
  approvalSimulation: boolean;
  removeLiqEthSimulation: boolean;
  removeLiqsimulation: boolean;
  removeLiqSimulationError: string | undefined;
  isEth: boolean;
  amountInGt0: boolean;
}
export function useRemoveLiquidityValidation({
  needsApproval,
  amountInGt0,
  approvalSimulation,
  removeLiqEthSimulation,
  removeLiqsimulation,
  removeLiqSimulationError,
  isEth,
}: Props) {
  if (needsApproval) {
    if (approvalSimulation) {
      return { isValid: true, errorMessage: "" };
    }
    return { isValid: false, errorMessage: "" };
  }
  if (!amountInGt0) {
    return { isValid: false, errorMessage: null };
  }
  if (isEth) {
    if (removeLiqEthSimulation) {
      return { isValid: true, errorMessage: "" };
    }
    return { isValid: false, errorMessage: "Unknown Error Occured" };
  } else {
    if (removeLiqSimulationError) {
      return { isValid: false, errorMessage: "Error Occured" };
    }
    if (removeLiqsimulation) {
      return { isValid: true, errorMessage: null };
    }
  }
  return { isValid: false, errorMessage: "Withdraw" };
}
