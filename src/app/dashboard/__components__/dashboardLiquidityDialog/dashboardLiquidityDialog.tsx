import { DialogContent, Dialog } from "@/components/ui/dialog";
import React, { useEffect, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import EstimatesHeader from "@/app/lock/estimateHeader";
import PoolHeader from "@/components/shared/poolHeader";
import { TPoolType } from "@/lib/types";
import SubmitButton from "@/components/shared/submitBtn";
import {
  LiquidityActions,
  useDashboardLiquidityProvider,
} from "../../__context__/dashboardLiquidityProvider";
import { useGetTokenInfo } from "@/utils";
import { useGetHeader } from "./dialogHeaders";
import useRemoveLiquidity from "../../__hooks__/useRemoveLiquidity";
import { useGetGaugeAddress } from "../../__hooks__/useGetGaugeAddress";
import { Address } from "viem";
import useStake from "../../__hooks__/useStake";
import useUnstake from "../../__hooks__/useUnstake";
import useCreateGauge from "../../__hooks__/useCreateGauge";
import WithdrawStats from "./withdrawStats";

export default function DashboardLiquidityDialog() {
  const {
    state,
    updateState,
    selectedUserLiquidityPosition: position,
  } = useDashboardLiquidityProvider();
  const gaugeAddress = useGetGaugeAddress({ poolId: position?.id as Address });
  const header = useGetHeader();
  useEffect(() => {
    if (!position && state.dialogOpen) {
      updateState({ dialogOpen: false });
    }
  }, [position, state.dialogOpen, updateState]);
  const removeLiquidity = useRemoveLiquidity({
    position,
    enabled: state.actionType === LiquidityActions.Withdraw,
  });
  const stake = useStake({ gaugeAddress });
  const unstake = useUnstake({ gaugeAddress });
  const createGauage = useCreateGauge();
  const { isValid, onSubmit, errorMessage, buttonProps } = useMemo(() => {
    if (
      gaugeAddress === undefined &&
      state.actionType !== LiquidityActions.Withdraw
    ) {
      return createGauage;
    }
    switch (state.actionType) {
      case LiquidityActions.Stake:
        return stake;
      case LiquidityActions.Unstake:
        return unstake;
      case LiquidityActions.Withdraw:
        return removeLiquidity;
      default:
        return removeLiquidity;
    }
  }, [
    createGauage,
    gaugeAddress,
    removeLiquidity,
    stake,
    state.actionType,
    unstake,
  ]);
  const token0 = useGetTokenInfo(position?.pair.token0.id);
  const token1 = useGetTokenInfo(position?.pair.token1.id);
  useEffect(() => {
    if (!state.actionType && state.sliderValue !== 0) {
      updateState({ sliderValue: 0 });
    }
  }, [state.actionType, state.sliderValue, updateState]);
  return (
    <Dialog
      open={state.dialogOpen}
      onOpenChange={(open) => updateState({ dialogOpen: open })}
    >
      <DialogContent className="p-0">
        <div>
          {header}

          <div className="space-y-6 p-4 border-b border-neutral-800">
            <PoolHeader
              token0={token0}
              token1={token1}
              poolType={TPoolType.STABLE}
            ></PoolHeader>
            <Slider
              value={[state.sliderValue]}
              onValueChange={(value) => {
                updateState({ sliderValue: value[0] });
              }}
              min={0}
              max={100}
            />
            <div className="flex justify-between">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
            <EstimatesHeader />
            {state.actionType === LiquidityActions.Withdraw && (
              <WithdrawStats />
            )}
          </div>
          <div className="p-4">
            <SubmitButton
              onClick={onSubmit}
              isValid={isValid}
              validationError={errorMessage}
              {...buttonProps}
            >
              {getActionTypeString(state.actionType)}
            </SubmitButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getActionTypeString(actionType: LiquidityActions | undefined): string {
  switch (actionType) {
    case LiquidityActions.Stake:
      return "Stake";
    case LiquidityActions.Unstake:
      return "Unstake";
    case LiquidityActions.Withdraw:
      return "Withdraw";
    default:
      return "";
  }
}
