import { Address, parseUnits } from "viem";
import { useDashboardLiquidityProvider } from "../__context__/dashboardLiquidityProvider";
import useStakeSimulation from "./useStakeSimulation";
import { useWriteContract } from "wagmi";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { useMemo } from "react";

export default function useStake({
  gaugeAddress,
}: {
  gaugeAddress: Address | undefined;
}) {
  const { state } = useDashboardLiquidityProvider();
  const amount = parseUnits(state.sliderValue.toString(), 18);
  const { data: stakeSimulation } = useStakeSimulation({
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
    if (stakeSimulation?.request) {
      return {
        isValid: true,
        message: null,
      };
    }
    return { isValid: false, message: null };
  }, [amount, bal, stakeSimulation?.request]);
  const { writeContract } = useWriteContract({});
  const onSubmit = () => {
    if (stakeSimulation?.request) {
      writeContract(stakeSimulation.request);
    }
  };
  return { onSubmit, errorMessage: message, isValid };
}
