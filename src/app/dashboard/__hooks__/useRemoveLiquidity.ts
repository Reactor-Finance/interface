import { UserLiquidityPosition } from "@/server/queries/user";
import { Address, formatUnits, parseUnits } from "viem";
import { useDashboardLiquidityProvider } from "../__context__/dashboardLiquidityProvider";
import useRemoveLiquidityValidation from "./useRemoveLiquidityValidation";
import { useWriteContract } from "wagmi";
import useRemoveLiquiditySimulation from "./useRemoveLiquiditySimulation";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { FormAction } from "../types";

interface Props {
  position: UserLiquidityPosition | undefined;
  enabled: boolean;
}
export default function useRemoveLiquidity({
  position,
  enabled,
}: Props): FormAction {
  const { state } = useDashboardLiquidityProvider();
  const { debouncedValue: amount } = useDebounce(
    parseUnits(state.sliderValue.toString(), 18),
    400
  );
  const token0 = position?.pair.token0.id;
  const token1 = position?.pair.token1.id;
  const isEth = false;
  const { removeLiquidityEthSimulation, removeLiquiditySimulation } =
    useRemoveLiquiditySimulation({
      amount,
      token0,
      token1,
      isStable: position?.pair.isStable,
      enabled,
    });
  const { writeContract } = useWriteContract();
  const { isValid, message } = useRemoveLiquidityValidation({
    amount,
    position,
    isEth: false,
    removeLiquidityRequest: true,
    removeLiquidityEthRequest: false,
  });
  const onSubmit = () => {
    if (!enabled) return;
    if (isValid) {
      if (isEth) {
        if (removeLiquidityEthSimulation.data?.request)
          writeContract(removeLiquidityEthSimulation.data.request);
      } else {
        if (removeLiquiditySimulation.data?.request)
          writeContract(removeLiquiditySimulation.data?.request);
      }
    }
  };
  const bal = useGetBalance({
    tokenAddress: position?.pair.id as Address,
    enabled,
  });
  return {
    onSubmit,
    isValid,
    errorMessage: message,
    max: parseFloat(formatUnits(bal, 0)),
  };
}
