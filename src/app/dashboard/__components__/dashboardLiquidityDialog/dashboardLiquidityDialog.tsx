import { DialogContent, Dialog } from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import EstimatesHeader from "@/app/lock/estimateHeader";
import PoolHeader from "@/components/shared/poolHeader";
import { TPoolType } from "@/lib/types";
import SubmitButton, { ButtonState } from "@/components/shared/submitBtn";
import {
  LiquidityActions,
  useDashboardLiquidityProvider,
} from "../../__context__/dashboardLiquidityProvider";
import { useGetTokenInfo } from "@/utils";
import { useGetHeader } from "./dialogHeaders";
import useRemoveLiquidity from "../../__hooks__/useRemoveLiquidity";
import { useGetGaugeAddress } from "../../__hooks__/useGetGaugeAddress";
import { Address } from "viem";

export default function DashboardLiquidityDialog() {
  const {
    state,
    updateState,
    selectedUserLiquidityPosition: position,
  } = useDashboardLiquidityProvider();
  const gaugeAddress = useGetGaugeAddress({ poolId: position?.id as Address });
  console.log(gaugeAddress);
  const header = useGetHeader();
  useEffect(() => {
    if (!position && state.dialogOpen) {
      updateState({ dialogOpen: false });
    }
  }, [position, state.dialogOpen, updateState]);
  const {
    onSubmit: removeLiquiditySubmit,
    isValid: isRemoveLiqValid,
    errorMessage,
  } = useRemoveLiquidity({
    position,
    enabled: state.actionType === LiquidityActions.Withdraw,
  });
  const isValid = isRemoveLiqValid;
  const token0 = useGetTokenInfo(position?.pair.token0.id);
  const token1 = useGetTokenInfo(position?.pair.token1.id);
  const onSubmit = () => {
    if (state.actionType === LiquidityActions.Withdraw) {
      removeLiquiditySubmit();
    }
  };
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
              step={1}
            />
            <div className="flex justify-between">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
            <EstimatesHeader />
          </div>
          <div className="p-4">
            <SubmitButton
              onClick={onSubmit}
              isValid={isValid}
              validationError={errorMessage}
              state={ButtonState.Default}
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
