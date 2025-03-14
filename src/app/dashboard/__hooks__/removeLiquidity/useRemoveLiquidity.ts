import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { ROUTER, WETH } from "@/data/constants";
import * as Router from "@/lib/abis/Router";
import { useAtomicDate } from "@/lib/hooks/useAtomicDate";
import { useEffect, useMemo } from "react";
import { Address, zeroAddress } from "viem";
import {
  useAccount,
  useChainId,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { FormAction } from "../../types";
import { SimulateContractReturnType } from "@wagmi/core";
import { useQueryClient } from "@tanstack/react-query";
import { useRemoveLiquidityValidation } from "./useRemoveLiquidityValidation";
import { useAtom } from "jotai/react";
import { transactionDeadlineAtom } from "@/store";
import usePadLoading from "@/lib/hooks/usePadLoading";
interface Props {
  amount: bigint;
  token0: Address;
  token1: Address;
  isStable: boolean;
  needsApproval: boolean;
  fetchingApproval: boolean;
  approvalSimulation: SimulateContractReturnType["request"] | undefined;
  pairQueryKey: readonly unknown[];
  balanceQueryKey: readonly unknown[];
  allowanceKey: readonly unknown[];
  closeModal: () => void;
}
export function useRemoveLiquidity({
  token0,
  token1,
  isStable,
  allowanceKey,
  amount,
  needsApproval,
  fetchingApproval,
  approvalSimulation,
  pairQueryKey,
  balanceQueryKey,
  closeModal,
}: Props): FormAction {
  const { address = zeroAddress } = useAccount();
  const chainId = useChainId();
  const now = useAtomicDate();
  const [transactionDeadlineInMinutes] = useAtom(transactionDeadlineAtom);
  const router = useMemo(() => ROUTER[chainId], [chainId]);
  const weth = useMemo(() => WETH[chainId], [chainId]);
  const nonETHToken = useMemo(
    () =>
      weth.toLowerCase() === token0.toLowerCase()
        ? token1
        : weth.toLowerCase() === token1.toLowerCase()
          ? token0
          : zeroAddress,
    [weth, token0, token1]
  );

  const deadline = useMemo(() => {
    const ttl =
      Math.floor(now.getTime() / 1000) +
      Number(transactionDeadlineInMinutes) * 60;
    return BigInt(ttl);
  }, [now, transactionDeadlineInMinutes]);
  console.log({ deadline });
  const isEth =
    token0.toLowerCase() === weth.toLowerCase() ||
    token1.toLowerCase() === weth.toLowerCase();

  const removeLiquiditySimulation = useSimulateContract({
    ...Router,
    address: router,
    functionName: "removeLiquidity",
    args: [
      token0,
      token1,
      isStable,
      amount, // liquidity
      0n, //amountBMin
      0n, //amountBMin
      address,
      deadline, //deadline
    ],
    query: { enabled: !isEth && amount > 0n },
  });

  const removeLiquidityEthSimulation = useSimulateContract({
    ...Router,
    address: router,
    functionName: "removeLiquidityETH",
    args: [
      nonETHToken,
      isStable,
      amount, // liquidity
      0n, //amountAMin
      0n, //amountETHMin
      address,
      deadline, //deadline
      true, //withFeeOnTransferTokens
    ],
    query: { enabled: isEth && amount > 0n },
  });
  const { writeContract, isPending, reset, data: hash } = useWriteContract();
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({ hash });
  const { setToast } = useTransactionToastProvider();
  console.log({
    error: removeLiquiditySimulation.data?.request,
  });
  const onSubmit = () => {
    if (needsApproval) {
      if (approvalSimulation) {
        writeContract(approvalSimulation);
        return;
      }
    }

    if (isEth && removeLiquidityEthSimulation.data?.request) {
      writeContract(removeLiquidityEthSimulation.data.request);
      return;
    } else if (removeLiquiditySimulation.data?.request) {
      writeContract(removeLiquiditySimulation.data.request);
      return;
    }
  };
  const queryClient = useQueryClient();
  useEffect(() => {
    if (isSuccess) {
      reset();
      if (needsApproval) {
        queryClient.invalidateQueries({ queryKey: allowanceKey });
        setToast({
          hash,
          actionDescription: "Approved",
          actionTitle: "Approved",
        });
        return;
      }
      setToast({
        hash,
        actionDescription: "Removed Liquidity",
        actionTitle: "Removed Liquidity",
      });
      queryClient.invalidateQueries({ queryKey: pairQueryKey });
      queryClient.invalidateQueries({ queryKey: balanceQueryKey });
      closeModal();
    }
  }, [
    allowanceKey,
    balanceQueryKey,
    closeModal,
    hash,
    isSuccess,
    needsApproval,
    pairQueryKey,
    queryClient,
    reset,
    setToast,
  ]);
  const loading = usePadLoading({
    value:
      isLoading || isEth
        ? removeLiquidityEthSimulation.isLoading
        : removeLiquiditySimulation.isLoading,
    duration: 300,
  });
  const { state: buttonState } = useGetButtonStatuses({
    isLoading: loading,
    isPending,
    isFetching: fetchingApproval,
    needsApproval,
  });
  const { isValid, errorMessage } = useRemoveLiquidityValidation({
    needsApproval,
    amountInGt0: amount > 0n,
    approvalSimulation: !!approvalSimulation,
    removeLiqsimulation: !!removeLiquiditySimulation.data,
    removeLiqEthSimulation: !!removeLiquidityEthSimulation.data,
    removeLiqSimulationError: removeLiquiditySimulation.error?.message,
    isEth,
  });
  return {
    onSubmit,
    isValid,
    errorMessage,
    buttonProps: { state: buttonState },
  };
}
