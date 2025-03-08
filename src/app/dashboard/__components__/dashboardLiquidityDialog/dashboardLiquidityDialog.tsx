import { DialogContent, Dialog } from "@/components/ui/dialog";
import React, { useCallback, useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import EstimatesHeader from "@/app/lock/estimateHeader";
import PoolHeader from "@/components/shared/poolHeader";
import { TPoolType } from "@/lib/types";
import SubmitButton, { ButtonState } from "@/components/shared/submitBtn";
import { useGetTokenInfo } from "@/utils";
import { useGetHeader } from "./dialogHeaders";
import { zeroAddress } from "viem";
import { useCreateGauge } from "../../__hooks__/useCreateGauge";
import { useGetPairs } from "@/lib/hooks/useGetPairs";
import { LiquidityActions, StateType } from "../../types";
import { useChainId } from "wagmi";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import { ROUTER } from "@/data/constants";
import { useRemoveLiquidity } from "../../__hooks__/removeLiquidity/useRemoveLiquidity";
import { useStake } from "../../__hooks__/stake/useStake";
import { SimulateContractReturnType } from "@wagmi/core";
import { useUnstake } from "../../__hooks__/unstake/useUnstake";
import useSwitchActionType from "../../__hooks__/useSwitchActionType";
import WithdrawStats from "./withdrawStats";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useGetBalance } from "@/lib/hooks/useGetBalance";

type ElementType<T extends readonly object[]> = T[number];

interface Props {
  state: StateType;
  pairInfo: ElementType<ReturnType<typeof useGetPairs>>;
  onOpenChange: (isOpen: boolean) => void;
}
type SimulateReturnType = SimulateContractReturnType["request"] | undefined;
export default function DashboardLiquidityDialog({
  state,
  pairInfo,
  onOpenChange,
}: Props) {
  const header = useGetHeader({ state });
  const chainId = useChainId();
  const router = useMemo(() => ROUTER[chainId], [chainId]);
  const [sliderValue, setSliderValue] = useState(0);
  const { balance, balanceQueryKey } = useGetBalance({
    tokenAddress: pairInfo.pair_address,
  });
  const rawAmount = (BigInt(sliderValue) * balance) / 100n;
  const { debouncedValue: amount } = useDebounce(rawAmount, 400);
  const resetSlider = useCallback(() => {
    setSliderValue(0);
  }, []);

  const isCreateGauge =
    pairInfo.gauge === zeroAddress &&
    (state.actionType === LiquidityActions.Stake ||
      state.actionType === LiquidityActions.Unstake);
  const {
    needsApproval: gaugeNeedsApproval,
    approveWriteRequest: gaugeApprovalWriteRequest,
    isFetching: gaugeApprovalFetching,
  } = useApproveWrite({
    tokenAddress: pairInfo.pair_address,
    spender: pairInfo.gauge,
    amount: String(amount),
    decimals: Number(pairInfo.decimals),
  });
  const {
    needsApproval: routerNeedsApproval,
    approveWriteRequest: routerApprovalWriteRequest,
    isFetching: routerApprovalFetching,
    allowanceKey: routerAllowanceKey,
  } = useApproveWrite({
    tokenAddress: pairInfo.pair_address,
    spender: router,
    amount: String(amount),
    decimals: Number(pairInfo.decimals),
  });
  const createGauge = useCreateGauge({
    pair: pairInfo.pair_address,
    enabled: isCreateGauge,
  });
  const stake = useStake({
    needsApproval: gaugeNeedsApproval,
    approvalSimulation: gaugeApprovalWriteRequest as SimulateReturnType,
    fetchingApproval: gaugeApprovalFetching,
    gaugeAddress: pairInfo.gauge,
    amount,
    pairQueryKey: pairInfo.queryKey,
  });
  const unstake = useUnstake({
    gaugeAddress: pairInfo.gauge,
    amount,
    pairQueryKey: pairInfo.queryKey,
  });

  const removeLiquidity = useRemoveLiquidity({
    token0: pairInfo.token0,
    token1: pairInfo.token1,
    isStable: pairInfo.stable,
    amount,
    resetSlider,
    needsApproval: routerNeedsApproval,
    approvalSimulation: routerApprovalWriteRequest as SimulateReturnType,
    fetchingApproval: routerApprovalFetching,
    pairQueryKey: balanceQueryKey,
    allowanceKey: routerAllowanceKey,
  });
  let actionData = useSwitchActionType(
    stake,
    unstake,
    removeLiquidity,
    state.actionType
  );
  if (isCreateGauge) actionData = createGauge;
  const onSubmit = useCallback(() => {
    actionData?.onSubmit?.();
  }, [actionData]);

  const token0 = useGetTokenInfo(pairInfo.token0);
  const token1 = useGetTokenInfo(pairInfo.token1);
  const { buttonChild } = useButtonChild({
    actionType: state.actionType,
    gaugeExist: pairInfo.gauge !== zeroAddress,
  });
  console.log({ token1, token0 });
  return (
    <Dialog open={state.dialogOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        <div>
          {header}

          <div className="space-y-6 p-4 border-b border-neutral-800">
            <PoolHeader
              token0={token0}
              token1={token1}
              poolType={pairInfo.stable ? TPoolType.STABLE : TPoolType.VOLATILE}
            />
            <Slider
              value={[sliderValue]}
              onValueChange={([value]) => {
                setSliderValue(value);
                // TODO: Need to use staked and unstaked lp balance for Stake/Unstake
              }}
              min={0}
              max={100}
              step={1}
            />
            <div className="flex justify-between">
              <span>Min</span>
              <span>.</span>
              <span>.</span>
              <span>.</span>
              <span>Max</span>
            </div>
            <EstimatesHeader />
            {state.actionType === LiquidityActions.Withdraw && (
              <WithdrawStats
                amount={amount}
                percent={sliderValue.toString()}
                pairInfo={pairInfo}
                token0={token0}
                token1={token1}
              />
            )}
            {/* <div>Balance:{pairInfo.account_lp_balance}</div> */}
          </div>
          <div className="p-4">
            <SubmitButton
              onClick={onSubmit}
              isValid={actionData.isValid}
              state={actionData.buttonProps?.state ?? ButtonState.Default}
            >
              {buttonChild}
            </SubmitButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
function useButtonChild({
  actionType,
  gaugeExist,
}: {
  actionType: LiquidityActions;
  gaugeExist: boolean;
}) {
  const buttonChild = useMemo(() => {
    switch (actionType) {
      case LiquidityActions.Stake: {
        return gaugeExist ? "Stake" : "Create Vault";
      }
      case LiquidityActions.Unstake: {
        return "Unstake";
      }
      case LiquidityActions.Withdraw: {
        return "Withdraw";
      }
    }
  }, [actionType, gaugeExist]);
  return { buttonChild };
}
