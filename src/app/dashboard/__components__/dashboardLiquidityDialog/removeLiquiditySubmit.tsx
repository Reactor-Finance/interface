import SubmitButton, { ButtonState } from "@/components/shared/submitBtn";
import React, { useMemo } from "react";
import { useRemoveLiquidity } from "../../__hooks__/removeLiquidity/useRemoveLiquidity";
import { TToken } from "@/lib/types";
import useApproveWrite from "@/lib/hooks/useApproveWrite";
import { TPair } from "../../types";
import { SimulateContractReturnType } from "viem";
import { ROUTER } from "@/data/constants";
interface Props {
  pairInfo: TPair;
  amount: bigint;
  pairKey: readonly unknown[];
}

type SimulateReturnType = SimulateContractReturnType["request"] | undefined;
export default function RemoveLiquiditySubmit({
  pairInfo,
  amount,
  pairKey,
}: Props) {
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
    decimals: Number(pairInfo.decimals),
  });
  const {} = useRemoveLiquidity({
    token0: pairInfo.token0,
    token1: pairInfo.token1,
    amount,
    isStable: false,
    pairQueryKey: pairKey,
    needsApproval,
    approvalSimulation: routerApprovalWriteRequest as SimulateReturnType,
    fetchingApproval: routerApprovalFetching,
    allowanceKey,
  });

  return (
    <SubmitButton state={ButtonState.Default} isValid={false}>
      Withdraw
    </SubmitButton>
  );
}
