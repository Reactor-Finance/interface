import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { UserLiquidityPosition } from "@/server/queries/user";
import { useMemo } from "react";
import { Address } from "viem";
interface Props {
  amount: bigint;
  position: UserLiquidityPosition | undefined;
  isEth: boolean;
  removeLiquidityRequest: boolean;
  removeLiquidityEthRequest: boolean;
}
export default function useRemoveLiquidityValidation({
  position,
  amount,
  isEth,
  removeLiquidityEthRequest,
  removeLiquidityRequest,
}: Props) {
  const bal = useGetBalance({ tokenAddress: position?.pair.id as Address });
  return useMemo(() => {
    if (bal < amount) {
      return {
        isValid: false,
        message: "Insufficient Balance",
      };
    }
    if (isEth) {
      if (removeLiquidityEthRequest) {
        return {
          isValid: true,
          message: null,
        };
      }
    } else {
      if (removeLiquidityRequest) {
        return {
          isValid: true,
          message: null,
        };
      }
    }
    return { isValid: false, message: null };
  }, [amount, bal, isEth, removeLiquidityEthRequest, removeLiquidityRequest]);
}
