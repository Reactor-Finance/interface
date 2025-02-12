import { parseUnits } from "viem";
import { useLiquidityCardFormProvider } from "../liquidityCardFormProvider";

export default function useCheckNeedsApproval({
  tokenOneAmount,
  tokenOneAllowance,
  tokenTwoAllowance,
  tokenTwoAmount,
}: {
  tokenOneAmount: string;
  tokenTwoAmount: string;
  tokenOneAllowance: bigint | undefined;
  tokenTwoAllowance: bigint | undefined;
}) {
  const { tokenOneDecimals, tokenTwoDecimals } = useLiquidityCardFormProvider();

  console.log({
    tokenOneAllowance,
    tokenTwoAllowance,
    tokenOneAmount,
    tokenTwoAmount,
  });
  if (
    tokenOneAllowance === undefined ||
    tokenTwoAllowance === undefined ||
    tokenOneDecimals === undefined ||
    tokenTwoDecimals === undefined
  )
    return;
  if (parseUnits(tokenOneAmount, tokenOneDecimals) > tokenOneAllowance) {
    return { tokenOne: true, tokenTwo: false };
  }
  if (parseUnits(tokenTwoAmount, tokenTwoDecimals) > tokenTwoAllowance) {
    return { tokenOne: false, tokenTwo: true };
  }
}
