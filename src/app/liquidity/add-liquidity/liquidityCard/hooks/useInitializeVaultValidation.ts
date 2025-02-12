// import { useLiquidityCardFormProvider } from "../liquidityCardFormProvider";

interface Props {
  tokenOneDeposit: string;
  tokenTwoDeposit: string;
  isApproving: boolean;
  isApproveSimulationValid: boolean;
  isAddLiquiditySimulationValid: boolean;
}
export default function useInitializeVaultValidation({
  isApproving,
  isAddLiquiditySimulationValid,
  isApproveSimulationValid,
}: Props) {
  // const {
  //   tokenOneBalance,
  //   tokenTwoBalance,
  //   tokenTwoDecimals,
  //   tokenOneDecimals,
  // } = useLiquidityCardFormProvider();
  if (isApproving) {
    if (isApproveSimulationValid) {
      return { isValid: false, error: null };
    }
  }

  if (!isAddLiquiditySimulationValid) {
    return { isValid: false, error: null };
  }
  return { isValid: false, error: null };
}
