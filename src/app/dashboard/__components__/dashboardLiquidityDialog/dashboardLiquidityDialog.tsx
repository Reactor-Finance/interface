import { DialogContent, Dialog } from "@/components/ui/dialog";
import React, { useCallback, useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import EstimatesHeader from "@/app/lock/estimateHeader";
import PoolHeader from "@/components/shared/poolHeader";
import { TPoolType } from "@/lib/types";
import { useGetTokenInfo } from "@/utils";
import { useGetHeader } from "./dialogHeaders";
import { zeroAddress } from "viem";
import { useGetPairs } from "@/lib/hooks/useGetPairs";
import { LiquidityActions, StateType } from "../../types";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import { SimulateContractReturnType } from "@wagmi/core";
import useSwitchActionType from "../../__hooks__/useSwitchActionType";
import WithdrawStats from "./withdrawStats";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import RemoveLiquiditySubmit from "./removeLiquiditySubmit";
import StakeSubmit from "./stakeSubmit";
import UnstakeSubmit from "./unstakeSubmit";
import CreateGaugeSubmit from "./createGauageSubmit";

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
  const [sliderValue, setSliderValue] = useState(0);
  const { balance, balanceQueryKey } = useGetBalance({
    tokenAddress: pairInfo.pair_address,
  });
  const { balance: gaugeBalance, balanceQueryKey: gaugeBalanceKey } =
    useGetBalance({
      tokenAddress: pairInfo.pair_address,
    });
  const rawAmount = useMemo(() => {
    if (state.actionType === LiquidityActions.Withdraw) {
      return (BigInt(sliderValue) * balance) / 100n;
    }
    if (state.actionType === LiquidityActions.Stake) {
      return (BigInt(sliderValue) * (balance - gaugeBalance)) / 100n;
    }
    if (state.actionType === LiquidityActions.Unstake) {
      return (BigInt(sliderValue) * gaugeBalance) / 100n;
    }
    return 0n;
  }, [balance, gaugeBalance, sliderValue, state.actionType]);
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
    allowanceKey: gaugeAllowanceKey,
  } = useApproveWrite({
    tokenAddress: pairInfo.pair_address,
    spender: pairInfo.gauge,
    amount: String(amount),
    decimals: Number(pairInfo.decimals),
  });
  const approvalInfo = {
    needsApproval: gaugeNeedsApproval,
    approvalSimulation: gaugeApprovalWriteRequest as SimulateReturnType,
    fetchingApproval: gaugeApprovalFetching,
    allowanceKey: gaugeAllowanceKey,
  };
  const info = { pairInfo, balanceKey: gaugeBalanceKey, amount };
  let FormSubmit = useSwitchActionType(
    <StakeSubmit
      balanceKey={gaugeBalanceKey}
      pairInfo={pairInfo}
      {...approvalInfo}
      amount={amount}
    />,
    <UnstakeSubmit {...info} />,
    <RemoveLiquiditySubmit
      balanceQueryKey={balanceQueryKey}
      amount={amount}
      pairInfo={pairInfo}
      resetSlider={resetSlider}
    />,
    state.actionType
  );
  if (isCreateGauge) {
    FormSubmit = <CreateGaugeSubmit pairInfo={pairInfo} />;
  }
  const token0 = useGetTokenInfo(pairInfo.token0);
  const token1 = useGetTokenInfo(pairInfo.token1);

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
          <div className="p-4">{FormSubmit}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
