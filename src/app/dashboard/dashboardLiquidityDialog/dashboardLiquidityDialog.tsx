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
import PoolHeader from "@/components/shared/poolHeader";
import { TPoolType } from "@/lib/types";
import SubmitButton, { ButtonState } from "@/components/shared/submitBtn";

export default function DashboardLiquidityDialog() {
  const { state, updateState } = useDashboardLiquidityProvider();
  console.log(state.actionType, "ACTION");
  const header = useMemo(() => {
    switch (state.actionType) {
      case LiquidityActions.Stake:
        return <StakeHeader />;
      case LiquidityActions.Unstake:
        return <UnstakeHeader />;
      case LiquidityActions.Withdraw:
        return <WithdrawHeader />;
    }
  }, [state.actionType]);
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
              token0={{
                address: "0x",
                symbol: "a",
                decimals: 1,
                logoURI: "",
                chainId: 1,
                name: "",
              }}
              token1={{
                address: "0x",
                symbol: "a",
                decimals: 1,
                logoURI: "",
                chainId: 1,
                name: "",
              }}
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
            <SubmitButton isValid={false} state={ButtonState.Default}>
              {getActionTypeString(state.actionType)}
            </SubmitButton>
          </div>
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
    <div className="py-3 px-4 border-b border-neutral-800">
      <DialogTitle className="text-lg">
        {title} <span className="text-primary-400">Position</span>
      </DialogTitle>
      <DialogDescription>{desc}</DialogDescription>
    </div>
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
