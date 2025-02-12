// import { useLiquidityCardFormProvider } from "../liquidityCardFormProvider";

interface Props {
  tokenOneDeposit: string;
  tokenTwoDeposit: string;
  isApproving: boolean;
  isApproveSimulationValid: boolean;
  isAddLiquiditySimulationValid: boolean;
}
export default function useInitializePoolValidation({
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
    console.log("here3");
    if (isApproveSimulationValid) {
      console.log("here2");
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
