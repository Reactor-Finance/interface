import { UserLiquidityPosition } from "@/server/queries/user";
import useQuoteRemoveLiquidity from "./useQuoteRemoveLiquidity";
import { getAddress, parseUnits } from "viem";
import { useDashboardLiquidityProvider } from "../__context__/dashboardLiquidityProvider";

interface Props {
  position: UserLiquidityPosition;
  enabled: boolean;
}
export default function useRemoveLiquidity({ position, enabled }: Props) {
  const { state } = useDashboardLiquidityProvider();
  const amount = parseUnits(state.sliderValue.toString(), 18);
  const { data: removeLiqQuote } = useQuoteRemoveLiquidity({
    token0: getAddress(position.pair.token0.id),
    token1: getAddress(position.pair.token1.id),
    isStable: position.pair.isStable,
    amount,
    enabled,
  });
  const onSubmit = () => {
    if (!enabled) return;
  };
  return { onSubmit, removeLiqQuote };
}
