import { UserLiquidityPosition } from "@/server/queries/user";
import useQuoteRemoveLiquidity from "./useQuoteRemoveLiquidity";
import { Address, parseUnits } from "viem";
import { useDashboardLiquidityProvider } from "../__context__/dashboardLiquidityProvider";
import useRemoveLiquidityValidation from "./useRemoveLiquidityValidation";
import { useWriteContract } from "wagmi";
import useRemoveLiquiditySimulation from "./useRemoveLiquiditySimulation";
import { useGetBalance } from "@/lib/hooks/useGetBalance";

interface Props {
  position: UserLiquidityPosition | undefined;
  enabled: boolean;
}
export default function useRemoveLiquidity({ position, enabled }: Props) {
  const { state } = useDashboardLiquidityProvider();
  const amount = parseUnits(state.sliderValue.toString(), 18);
  const token0 = position?.pair.token0.id;
  const token1 = position?.pair.token1.id;
  const isEth = false;
  const { data: removeLiqQuote } = useQuoteRemoveLiquidity({
    token0,
    token1,
    isStable: position?.pair.isStable,
    amount,
    enabled,
  });
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
  return { onSubmit, removeLiqQuote, isValid, errorMessage: message, max: bal };
}
