import { Address, parseUnits } from "viem";
import { useDashboardLiquidityProvider } from "../__context__/dashboardLiquidityProvider";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { useMemo } from "react";
import useWithdrawSimulation from "./useUnstakeSimulation";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { FormAction } from "../types";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";

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
  const { balance: bal } = useGetBalance({ tokenAddress: gaugeAddress });
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
  const { writeContract, isPending, data: hash } = useWriteContract({});
  const { isLoading } = useWaitForTransactionReceipt({ hash });
  const onSubmit = () => {
    if (unstakeSimulation?.request) {
      writeContract(unstakeSimulation.request);
    }
  };
  const buttonState = useGetButtonStatuses({ isLoading, isPending });
  return {
    onSubmit,
    errorMessage: message,
    isValid,
    buttonProps: { state: buttonState.state },
  };
}
