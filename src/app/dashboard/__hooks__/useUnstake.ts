import { Address, parseUnits } from "viem";
import { useDashboardLiquidityProvider } from "../__context__/dashboardLiquidityProvider";
import { useWriteContract } from "wagmi";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { useMemo } from "react";
import useWithdrawSimulation from "./useUnstakeSimulation";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { FormAction } from "../types";

export default function useUnstake({
  gaugeAddress,
}: {
  gaugeAddress: Address | undefined;
}): FormAction {
  const { state } = useDashboardLiquidityProvider();
  const { debouncedValue: amount } = useDebounce(
    parseUnits(state.sliderValue.toString(), 18),
    400
  );
  const { data: unstakeSimulation } = useWithdrawSimulation({
    amount,
    address: gaugeAddress,
  });
  const bal = useGetBalance({ tokenAddress: gaugeAddress });
  const { isValid, message } = useMemo(() => {
    if (bal < amount) {
      return {
        isValid: false,
        message: "Insufficient Balance",
      };
    }
    if (unstakeSimulation?.request) {
      return {
        isValid: true,
        message: null,
      };
    }
    return { isValid: false, message: null };
  }, [amount, bal, unstakeSimulation?.request]);
  const { writeContract } = useWriteContract({});
  const onSubmit = () => {
    if (unstakeSimulation?.request) {
      writeContract(unstakeSimulation.request);
    }
  };
  return { onSubmit, errorMessage: message, isValid, max: 100 };
}
