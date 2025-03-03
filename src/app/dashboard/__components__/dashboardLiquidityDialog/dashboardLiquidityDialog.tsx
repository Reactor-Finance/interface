import { DialogContent, Dialog } from "@/components/ui/dialog";
import React, { useCallback, useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import EstimatesHeader from "@/app/lock/estimateHeader";
import PoolHeader from "@/components/shared/poolHeader";
import { TPoolType } from "@/lib/types";
import SubmitButton from "@/components/shared/submitBtn";
import { useGetTokenInfo } from "@/utils";
import { useGetHeader } from "./dialogHeaders";
import { useRemoveLiquidity } from "../../__hooks__/useRemoveLiquidity";
import { zeroAddress } from "viem";
import { useStake } from "../../__hooks__/useStake";
import { useUnstake } from "../../__hooks__/useUnstake";
import { useCreateGauge } from "../../__hooks__/useCreateGauge";
import { useGetPairs } from "@/lib/hooks/useGetPairs";
import { LiquidityActions, StateType } from "../../types";
import {
  useChainId,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import { ROUTER } from "@/data/constants";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";

type ElementType<T extends readonly any[]> = T[number];

interface Props {
  state: StateType;
  pairInfo: ElementType<ReturnType<typeof useGetPairs>>;
  onOpenChange: (isOpen: boolean) => void;
}

export default function DashboardLiquidityDialog({
  state,
  pairInfo,
  onOpenChange,
}: Props) {
  const header = useGetHeader({ state });
  const chainId = useChainId();
  const router = useMemo(() => ROUTER[chainId], [chainId]);
  const [amount, setAmount] = useState(0n);
  const [sliderValue, setSliderValue] = useState(0);
  const { simulation: createGaugeSimulation } = useCreateGauge({
    pair: pairInfo.pair_address,
  });
  const { simulation: stakeSimulation } = useStake({
    gaugeAddress: pairInfo.gauge,
    amount,
  });
  const { simulation: unstakeSimulation } = useUnstake({
    gaugeAddress: pairInfo.gauge,
    amount,
  });
  const { removeLiquidityEthSimulation, removeLiquiditySimulation } =
    useRemoveLiquidity({
      token0: pairInfo.token0,
      token1: pairInfo.token0,
      isStable: pairInfo.stable,
      amount,
    });

  const { needsApproval, approveWriteRequest, isFetching } = useApproveWrite({
    tokenAddress: pairInfo.pair_address,
    spender: router,
    amount: String(amount),
    decimals: Number(pairInfo.decimals),
  });
  const { writeContract, reset, data: hash, isPending } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({
    hash,
  });
  const isValid = useMemo(() => {
    switch (state.actionType) {
      case LiquidityActions.Stake:
        return Boolean(stakeSimulation) || Boolean(createGaugeSimulation);
      case LiquidityActions.Unstake:
        return Boolean(unstakeSimulation);
      case LiquidityActions.Withdraw:
        return (
          Boolean(removeLiquidityEthSimulation.data) ||
          Boolean(removeLiquiditySimulation.data)
        );
      default:
        return false;
    }
  }, [
    stakeSimulation,
    createGaugeSimulation,
    unstakeSimulation,
    removeLiquidityEthSimulation,
    removeLiquiditySimulation,
    state.actionType,
  ]);

  const onSubmit = useCallback(() => {
    switch (state.actionType) {
      case LiquidityActions.Stake: {
        if (!stakeSimulation) break;
        reset();
        writeContract(stakeSimulation);
        break;
      }
      case LiquidityActions.Unstake: {
        if (!unstakeSimulation) break;
        reset();
        writeContract(unstakeSimulation);
        break;
      }
      case LiquidityActions.Withdraw: {
        if (needsApproval && approveWriteRequest) {
          reset();
          writeContract(approveWriteRequest);
          return;
        }
        if (removeLiquiditySimulation.data) {
          reset();
          writeContract(removeLiquiditySimulation.data.request);
          return;
        }
        if (removeLiquidityEthSimulation.data) {
          reset();
          writeContract(removeLiquidityEthSimulation.data.request);
          return;
        }
        break;
      }
    }
  }, [
    state.actionType,
    writeContract,
    reset,
    stakeSimulation,
    unstakeSimulation,
    needsApproval,
    approveWriteRequest,
    removeLiquiditySimulation,
    removeLiquidityEthSimulation,
  ]);

  const buttonChild = useMemo(() => {
    switch (state.actionType) {
      case LiquidityActions.Stake: {
        return pairInfo.gauge !== zeroAddress ? "Stake" : "Create Vault";
      }
      case LiquidityActions.Unstake: {
        return "Unstake";
      }
      case LiquidityActions.Withdraw: {
        return "Withdraw";
      }
    }
  }, [state.actionType, pairInfo.gauge]);

  const token0 = useGetTokenInfo(pairInfo.token0);
  const token1 = useGetTokenInfo(pairInfo.token1);

  const { state: buttonState } = useGetButtonStatuses({
    isLoading,
    isPending,
    needsApproval,
    isFetching,
  });
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

                const calc =
                  (BigInt(value) * pairInfo.account_lp_balance) / 100n;
                setAmount(calc);
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
              state={buttonState}
            >
              {buttonChild}
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
