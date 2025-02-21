import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogDescription,
} from "@/components/ui/dialog";
import React, { useMemo } from "react";
import {
  LiquidityActions,
  useDashboardLiquidityProvider,
} from "../dashLiquidityProvider";
import { Slider } from "@/components/ui/slider";
import EstimatesHeader from "@/app/lock/estimateHeader";

export default function DashboardLiquidityDialog() {
  const { state, updateState } = useDashboardLiquidityProvider();
  const header = useMemo(() => {
    switch (state.actionType) {
      case LiquidityActions.Stake:
        return <StakeHeader />;
      case LiquidityActions.Unstake:
        <UnstakeHeader />;
      case LiquidityActions.Withdraw:
        return <WithdrawHeader />;
    }
  }, [state.actionType]);
  return (
    <Dialog
      open={state.dialogOpen}
      onOpenChange={(open) => updateState({ dialogOpen: open })}
    >
      <DialogContent position="static">
        {header}

        <div>
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
      </DialogContent>
    </Dialog>
  );
}
const WithdrawHeader = () => (
  <DialogHeader title="Withdraw your" desc="Withdraw your staked position" />
);
const StakeHeader = () => (
  <DialogHeader title="Stake your" desc="Stake your position to earn" />
);
const UnstakeHeader = () => (
  <DialogHeader
    title="Unstake your"
    desc="Unstake your position to stop earning"
  />
);
function DialogHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <>
      <DialogTitle className="text-lg">
        {title} <span className="text-primary-400">Position</span>
      </DialogTitle>
      <DialogDescription>{desc}</DialogDescription>
    </>
  );
}
