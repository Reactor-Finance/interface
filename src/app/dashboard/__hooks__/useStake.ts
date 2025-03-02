import { Address, parseUnits } from "viem";
import { useDashboardLiquidityProvider } from "../__context__/dashboardLiquidityProvider";
import useStakeSimulation from "./useStakeSimulation";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { useEffect, useMemo } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { FormAction } from "../types";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";

export default function useStake({
  gaugeAddress,
}: {
  gaugeAddress: Address | undefined;
}): FormAction {
  const { state, selectedUserLiquidityPosition } =
    useDashboardLiquidityProvider();
  const { debouncedValue: percentAmount } = useDebounce(
    parseUnits(state.sliderValue.toString(), 0),
    400
  );
  const stakeBalance = useGetBalance({ tokenAddress: gaugeAddress });
  const lpBalance = useGetBalance({
    tokenAddress: selectedUserLiquidityPosition?.pair.id as Address,
  });
  const availableToStakeBalance = lpBalance - stakeBalance;
  const amount = (availableToStakeBalance * percentAmount) / 100n;

  const { data: stakeSimulation, error } = useStakeSimulation({
    amount,
    address: gaugeAddress,
    disabled: !gaugeAddress,
  });
  console.log({ error });
  const bal = useGetBalance({ tokenAddress: gaugeAddress });
  const { isValid, message } = useMemo(() => {
    if (bal < amount) {
      return {
        isValid: false,
        message: "Insufficient Balance",
      };
    }
    if (stakeSimulation?.request) {
      return {
        isValid: true,
        message: null,
      };
    }
    return { isValid: false, message: null };
  }, [amount, bal, stakeSimulation?.request]);
  const { writeContract, reset, isPending, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);
  const onSubmit = () => {
    if (stakeSimulation?.request) {
      writeContract(stakeSimulation.request);
    }
  };
  const buttonState = useGetButtonStatuses({
    isPending,
    isLoading,
    isFetching: false,
  });
  return {
    buttonProps: { state: buttonState.state },
    onSubmit,
    errorMessage: message,
    isValid,
  };
}
