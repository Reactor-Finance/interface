import SubmitButton from "@/components/shared/submitBtn";
import React, { useMemo } from "react";
import { useRemoveLiquidity } from "../../__hooks__/useRemoveLiquidity";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import { TPair } from "../../types";
import { ROUTER } from "@/data/constants";
import { useChainId } from "wagmi";
import { SimulateContractReturnType } from "@wagmi/core";
interface Props {
  pairInfo: TPair;
  amount: bigint;
  closeModal: () => void;
  balanceQueryKey: readonly unknown[];
}

type SimulateReturnType = SimulateContractReturnType["request"] | undefined;
export default function RemoveLiquiditySubmit({
  pairInfo,
  amount,
  closeModal,
  balanceQueryKey,
}: Props) {
  const chainId = useChainId();
  const router = useMemo(() => ROUTER[chainId], [chainId]);
  const {
    needsApproval,
    approveWriteRequest: routerApprovalWriteRequest,
    isFetching: routerApprovalFetching,
    allowanceKey,
  } = useApproveWrite({
    tokenAddress: pairInfo.pair_address,
    spender: router,
    amount: String(amount),
    decimals: Number(pairInfo.token1_decimals),
  });
  console.log({ needsApproval, amount });
  const removeLiquidity = useRemoveLiquidity({
    token0: pairInfo.token0,
    token1: pairInfo.token1,
    closeModal,
    amount,
    isStable: pairInfo.stable,
    pairQueryKey: pairInfo.queryKey,
    balanceQueryKey: balanceQueryKey,
    needsApproval,
    approvalSimulation: routerApprovalWriteRequest as SimulateReturnType,
    fetchingApproval: routerApprovalFetching,
    allowanceKey,
  });
  return (
    <SubmitButton
      validationError={removeLiquidity.errorMessage}
      onClick={removeLiquidity.onSubmit}
      state={removeLiquidity.buttonProps.state}
      isValid={removeLiquidity.isValid}
    >
      Withdraw
    </SubmitButton>
  );
}
