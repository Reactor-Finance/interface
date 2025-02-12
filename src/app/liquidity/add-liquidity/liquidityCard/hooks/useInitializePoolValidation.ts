// import { useLiquidityCardFormProvider } from "../liquidityCardFormProvider";

interface Props {
  tokenOneDeposit: string;
  tokenTwoDeposit: string;
  isApproving: boolean;
  isApproveSimulationValid: boolean;
  isAddLiquiditySimulationValid: boolean;
  isSuccess: boolean;
}
export default function useInitializePoolValidation({
  isApproving,
  isSuccess,
  isAddLiquiditySimulationValid,
  isApproveSimulationValid,
}: Props) {
  // const {
  //   tokenOneBalance,
  //   tokenTwoBalance,
  //   tokenTwoDecimals,
  //   tokenOneDecimals,
  //
  // } = useLiquidityCardFormProvider();

  if (isSuccess) {
    return { isValid: true, error: null };
  }
  if (isApproving) {
    if (isApproveSimulationValid) {
      return { isValid: true, error: null };
    }
  }

  if (!isAddLiquiditySimulationValid) {
    console.log("here");
    return { isValid: false, error: null };
  }
  console.log("here");
  return { isValid: true, error: null };
}
