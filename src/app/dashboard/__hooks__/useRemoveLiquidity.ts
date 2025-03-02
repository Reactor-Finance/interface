import { UserLiquidityPosition } from "@/server/queries/user";
import { Address, parseUnits } from "viem";
import { useDashboardLiquidityProvider } from "../__context__/dashboardLiquidityProvider";
import useRemoveLiquidityValidation from "./useRemoveLiquidityValidation";
import {
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import useRemoveLiquiditySimulation from "./useRemoveLiquiditySimulation";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { FormAction } from "../types";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import { ROUTER } from "@/data/constants";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  position: UserLiquidityPosition | undefined;
  enabled: boolean;
}
export default function useRemoveLiquidity({
  position,
  enabled,
}: Props): FormAction {
  const { state } = useDashboardLiquidityProvider();
  const { debouncedValue: percentAmount } = useDebounce(
    parseUnits(state.sliderValue.toString(), 0),
    400
  );
  const token0 = position?.pair.token0.id;
  const token1 = position?.pair.token1.id;
  const isEth = false;
  const { writeContract, reset, data: hash, isPending } = useWriteContract();
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({ hash });
  const bal = useGetBalance({
    tokenAddress: position?.pair.id as Address,
    enabled,
  });
  const chainId = useChainId();
  const amount = (bal * percentAmount) / 100n;
  const { needsApproval, approveWriteRequest, allowanceKey, isFetching } =
    useApproveWrite({
      tokenAddress: position?.pair.id as Address,
      spender: ROUTER[chainId] ?? "0x",
      amount: amount.toString(),
      decimals: 18,
    });
  const { isValid, message } = useRemoveLiquidityValidation({
    amount,
    position,
    isEth: false,
    removeLiquidityRequest: true,
    removeLiquidityEthRequest: false,
  });
  const { removeLiquidityEthSimulation, removeLiquiditySimulation } =
    useRemoveLiquiditySimulation({
      amount,
      token0,
      token1,
      isStable: position?.pair.isStable,
      enabled: enabled && !needsApproval,
    });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (isSuccess && needsApproval) {
      reset();
      queryClient.invalidateQueries({ queryKey: allowanceKey });
    }
  }, [
    allowanceKey,
    isEth,
    isSuccess,
    needsApproval,
    queryClient,
    removeLiquidityEthSimulation.queryKey,
    removeLiquiditySimulation.queryKey,
    reset,
  ]);
  const onSubmit = () => {
    if (!enabled) return;
    if (needsApproval && approveWriteRequest) {
      writeContract(approveWriteRequest);
      return;
    }
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
  const buttonState = useGetButtonStatuses({
    isLoading,
    isPending,
    isFetching,
  });
  return {
    onSubmit,
    isValid,
    errorMessage: message,
    buttonProps: {
      state: buttonState.state,
    },
  };
}
