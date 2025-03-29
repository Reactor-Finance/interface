import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import EstimatesHeader from "@/app/lock/estimateHeader";
import PoolHeader from "@/components/shared/poolHeader";
import { TPoolType } from "@/lib/types";
import SubmitButton from "@/components/shared/submitBtn";
import { convertETHToWETHIfApplicable, useGetTokenInfo } from "@/utils";
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
import { ETHER, ROUTER, WETH } from "@/data/constants";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import StakeStats from "./stakeStat";
import WithdrawStats from "./withdrawStats";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ElementType<T extends Record<string, any>> = T["data"][number];

interface Props {
  state: StateType;
  pairInfo: ElementType<ReturnType<typeof useGetPairs>>;
  onOpenChange: (isOpen: boolean) => void;
  onTransactionCompleted?: () => any;
}

export default function DashboardLiquidityDialog({
  state,
  pairInfo,
  onOpenChange,
  onTransactionCompleted,
}: Props) {
  const header = useGetHeader({ state });
  const chainId = useChainId();
  const router = useMemo(() => ROUTER[chainId], [chainId]);
  const [amount, setAmount] = useState(0n);
  const [sliderValue, setSliderValue] = useState(0);
  const weth = useMemo(() => WETH[chainId], [chainId]);
  const isWETHPair = useMemo(
    () =>
      pairInfo.token0.toLowerCase() === weth.toLowerCase() ||
      pairInfo.token1.toLowerCase() === weth.toLowerCase() ||
      pairInfo.token0.toLowerCase() === ETHER.toLowerCase() ||
      pairInfo.token1.toLowerCase() === ETHER.toLowerCase(),
    [pairInfo, weth]
  );
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
      token0: convertETHToWETHIfApplicable(pairInfo.token0, chainId),
      token1: convertETHToWETHIfApplicable(pairInfo.token1, chainId),
      isStable: pairInfo.stable,
      amount,
    });

  const {
    needsApproval: routerNeedsApproval,
    approveWriteRequest: routerApprovalWriteRequest,
    isFetching: routerApprovalFetching,
    resetApproval: resetRouterApproval,
  } = useApproveWrite({
    tokenAddress: pairInfo.pair_address,
    spender: router,
    amount: String(amount),
    decimals: Number(pairInfo.decimals),
  });
  const {
    needsApproval: gaugeNeedsApproval,
    approveWriteRequest: gaugeApprovalWriteRequest,
    isFetching: gaugeApprovalFetching,
    resetApproval: resetGaugeApproval,
  } = useApproveWrite({
    tokenAddress: pairInfo.pair_address,
    spender: pairInfo.gauge,
    amount: String(amount),
    decimals: Number(pairInfo.decimals),
  });
  const {
    writeContract,
    reset,
    data: hash,
    isPending,
    isSuccess: writeSuccess,
  } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({
    hash,
  });

  const lpAmount0 = useMemo(() => {
    switch (state.actionType) {
      case LiquidityActions.Stake: {
        return pairInfo.total_supply > 0n
          ? (pairInfo.account_lp_balance * pairInfo.reserve0) /
              pairInfo.total_supply
          : 0n;
      }
      case LiquidityActions.Unstake: {
        return pairInfo.account_gauge_balance > 0n &&
          pairInfo.gauge_total_supply > 0n &&
          pairInfo.total_supply > 0n
          ? (pairInfo.account_gauge_balance *
              ((pairInfo.gauge_total_supply * pairInfo.reserve0) /
                pairInfo.total_supply)) /
              pairInfo.gauge_total_supply
          : 0n;
      }
      default:
        return BigInt(0);
    }
  }, [state.actionType, pairInfo]);

  const lpAmount1 = useMemo(() => {
    switch (state.actionType) {
      case LiquidityActions.Stake: {
        return pairInfo.total_supply > 0n
          ? (pairInfo.account_lp_balance * pairInfo.reserve1) /
              pairInfo.total_supply
          : 0n;
      }
      case LiquidityActions.Unstake: {
        return pairInfo.account_gauge_balance > 0n &&
          pairInfo.gauge_total_supply > 0n &&
          pairInfo.total_supply > 0n
          ? (pairInfo.account_gauge_balance *
              ((pairInfo.gauge_total_supply * pairInfo.reserve1) /
                pairInfo.total_supply)) /
              pairInfo.gauge_total_supply
          : 0n;
      }
      default:
        return BigInt(0);
    }
  }, [state.actionType, pairInfo]);

  const isValid = useMemo(() => {
    switch (state.actionType) {
      case LiquidityActions.Stake:
        return (
          Boolean(stakeSimulation) ||
          Boolean(createGaugeSimulation) ||
          gaugeNeedsApproval ||
          Boolean(gaugeApprovalWriteRequest)
        );
      case LiquidityActions.Unstake:
        return Boolean(unstakeSimulation);
      case LiquidityActions.Withdraw:
        return (
          Boolean(removeLiquidityEthSimulation.data) ||
          Boolean(removeLiquiditySimulation.data) ||
          routerNeedsApproval ||
          Boolean(routerApprovalWriteRequest)
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
    gaugeNeedsApproval,
    gaugeApprovalWriteRequest,
    routerNeedsApproval,
    routerApprovalWriteRequest,
  ]);

  const onSubmit = useCallback(() => {
    switch (state.actionType) {
      case LiquidityActions.Stake: {
        if (pairInfo.gauge === zeroAddress && createGaugeSimulation) {
          reset();
          writeContract(createGaugeSimulation);
          break;
        }
        if (gaugeApprovalWriteRequest && gaugeNeedsApproval) {
          reset();
          writeContract(gaugeApprovalWriteRequest);
          break;
        }
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
        if (routerNeedsApproval && routerApprovalWriteRequest) {
          reset();
          writeContract(routerApprovalWriteRequest);
          return;
        }
        if (removeLiquiditySimulation.data && !isWETHPair) {
          reset();
          writeContract(removeLiquiditySimulation.data.request);
          return;
        }
        if (removeLiquidityEthSimulation.data && isWETHPair) {
          reset();
          writeContract(removeLiquidityEthSimulation.data.request);
          return;
        }
        break;
      }
    }

    if (onTransactionCompleted) onTransactionCompleted();
  }, [
    state.actionType,
    writeContract,
    reset,
    stakeSimulation,
    unstakeSimulation,
    routerNeedsApproval,
    routerApprovalWriteRequest,
    removeLiquiditySimulation,
    removeLiquidityEthSimulation,
    gaugeNeedsApproval,
    gaugeApprovalWriteRequest,
    createGaugeSimulation,
    pairInfo.gauge,
    isWETHPair,
    onTransactionCompleted,
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
    needsApproval:
      state.actionType === LiquidityActions.Stake
        ? pairInfo.gauge !== zeroAddress && gaugeNeedsApproval
        : state.actionType === LiquidityActions.Withdraw
          ? routerNeedsApproval
          : false,
    isFetching:
      state.actionType === LiquidityActions.Stake
        ? gaugeApprovalFetching
        : state.actionType === LiquidityActions.Withdraw
          ? routerApprovalFetching
          : false,
  });

  useEffect(() => {
    if (removeLiquidityEthSimulation.error || removeLiquiditySimulation.error) {
      console.error(
        removeLiquidityEthSimulation.error,
        removeLiquiditySimulation.error
      );
    }
  }, [removeLiquidityEthSimulation, removeLiquiditySimulation]);

  useEffect(() => {
    if (writeSuccess) {
      resetRouterApproval();
      resetGaugeApproval();
    }
  }, [writeSuccess, resetRouterApproval, resetGaugeApproval]);
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
                  state.actionType === LiquidityActions.Stake ||
                  state.actionType === LiquidityActions.Withdraw
                    ? (BigInt(value) * pairInfo.account_lp_balance) / 100n
                    : (BigInt(value) * pairInfo.account_gauge_balance) / 100n;
                setAmount(calc);
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
                token0={token0}
                token1={token1}
                pairInfo={pairInfo}
                percent={String(sliderValue)}
                amount={amount}
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
                token0={token0}
                token1={token1}
                percent={String(sliderValue)}
                balance0={lpAmount0}
                balance1={lpAmount1}
              />
            )}
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
