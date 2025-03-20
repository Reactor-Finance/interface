import { DialogContent, Dialog } from "@/components/ui/dialog";
import React, { useCallback, useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import EstimatesHeader from "@/app/lock/estimateHeader";
import PoolHeader from "@/components/shared/poolHeader";
import { TPoolType } from "@/lib/types";
import { useGetTokenInfo } from "@/utils";
import { useGetHeader } from "./dialogHeaders";
import { zeroAddress } from "viem";
import { LiquidityActions, StateType, TPair } from "../../types";
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
import StakeStats from "./stakeStat";
import useLpToTokens from "../../__hooks__/useLpToTokens";

interface Props {
  state: StateType;
  pairInfo: TPair;
  onOpenChange: (isOpen: boolean) => void;
}
type SimulateReturnType = SimulateContractReturnType["request"] | undefined;
export default function DashboardLiquidityDialog({
  state,
  pairInfo,
  onOpenChange,
}: Props) {
  const closeModal = useCallback(() => {
    onOpenChange(false);
    setSliderValue(0);
  }, [onOpenChange]);
  const header = useGetHeader({ state });
  const [sliderValue, setSliderValue] = useState(0);
  const { balance, balanceQueryKey } = useGetBalance({
    tokenAddress: pairInfo.pair_address,
  });
  const { balance: gaugeBalance, balanceQueryKey: gaugeBalanceKey } =
    useGetBalance({
      tokenAddress: pairInfo.gauge,
    });
  const rawAmount = useMemo(() => {
    if (state.actionType === LiquidityActions.Withdraw) {
      return (BigInt(sliderValue) * balance) / 100n;
    }
    if (state.actionType === LiquidityActions.Stake) {
      return (BigInt(sliderValue) * balance) / 100n;
    }
    if (state.actionType === LiquidityActions.Unstake) {
      return (BigInt(sliderValue) * gaugeBalance) / 100n;
    }
    return 0n;
  }, [balance, gaugeBalance, sliderValue, state.actionType]);
  console.log({ rawAmount, gaugeBalance, balance });
  const { debouncedValue: amount } = useDebounce(rawAmount, 400);

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
  const stakingProps = {
    pairInfo,
    closeModal,
    amount,
    resetKeys: [balanceQueryKey, gaugeBalanceKey],
  };
  const stakeProps = { ...stakingProps, ...approvalInfo };
  let FormSubmit = useSwitchActionType(
    <StakeSubmit {...stakeProps} />,
    <UnstakeSubmit {...stakingProps} />,
    <RemoveLiquiditySubmit
      balanceQueryKey={balanceQueryKey}
      amount={amount}
      pairInfo={pairInfo}
      closeModal={closeModal}
    />,
    state.actionType
  );
  if (isCreateGauge) {
    FormSubmit = <CreateGaugeSubmit pairInfo={pairInfo} />;
  }
  const token0 = useGetTokenInfo(pairInfo.token0);
  const token1 = useGetTokenInfo(pairInfo.token1);
  const data = useLpToTokens({
    lpBalance:
      state.actionType === LiquidityActions.Stake ? balance : gaugeBalance,
    reverse0: pairInfo.reserve0,
    reverse1: pairInfo.reserve1,
    totalLpSupply: pairInfo.total_supply,
  });
  console.log({ data });
  return (
    <Dialog open={state.dialogOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-[520px]">
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
            {(state.actionType === LiquidityActions.Stake ||
              state.actionType === LiquidityActions.Unstake) && (
              <StakeStats
                action={
                  state.actionType === LiquidityActions.Stake
                    ? "stake"
                    : "unstake"
                }
                userTokens0={data.userToken0Amt}
                userTokens1={data.userToken1Amt}
                token0={token0}
                token1={token1}
                percent={sliderValue.toString()}
              />
            )}
            {/* <div>Balance:{pairInfo.account_lp_balance}</div> */}
          </div>
          <div className="p-4">{state.dialogOpen && FormSubmit}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
