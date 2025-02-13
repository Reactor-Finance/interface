import { parseUnits } from "viem";
import { useLiquidityCardFormProvider } from "../liquidityCardFormProvider";

export default function useCheckNeedsApproval({
  tokenOneDeposit,
  tokenOneAllowance,
  tokenTwoAllowance,
  tokenTwoDeposit,
}: {
  tokenOneDeposit: string;
  tokenTwoDeposit: string;
  tokenOneAllowance: bigint | undefined;
  tokenTwoAllowance: bigint | undefined;
}) {
  const { tokenOneDecimals, tokenTwoDecimals } = useLiquidityCardFormProvider();

  if (
    tokenOneAllowance === undefined ||
    tokenTwoAllowance === undefined ||
    tokenOneDecimals === undefined ||
    tokenTwoDecimals === undefined
  )
    return;
  if (parseUnits(tokenOneDeposit, tokenOneDecimals) > tokenOneAllowance) {
    return { tokenOne: true, tokenTwo: false };
  }
  if (parseUnits(tokenTwoDeposit, tokenTwoDecimals) > tokenTwoAllowance) {
    return { tokenOne: false, tokenTwo: true };
  }
}
