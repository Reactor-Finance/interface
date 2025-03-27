import { Button } from "@/components/ui/button";
import React, { useCallback, useMemo } from "react";
import { useAccount, useChainId, useWriteContract } from "wagmi";
import { useVeNFTsProvider } from "@/contexts/veNFTsProvider";
import { useVeApprovalForMany } from "@/lib/hooks/useVeApprovalsSimulate";
import { VAS } from "@/data/constants";
import { useVasClaimForManyTokens } from "@/lib/hooks/useVasClaims";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner";

export default function ClaimAllLocks() {
  const chainId = useChainId();
  const vas = useMemo(() => VAS[chainId], [chainId]);
  const { lockTokens } = useVeNFTsProvider();
  const tokenIds = useMemo(
    () => lockTokens.map((token) => token.id),
    [lockTokens]
  );
  const {
    needsApproval,
    simulation: approveManySimulation,
    queryKey: approveManyQueryKey,
  } = useVeApprovalForMany({ spender: vas });
  const { data: simulation } = useVasClaimForManyTokens({
    tokenIds,
    enableQuery: !needsApproval,
  });
  const { writeContract, reset, isPending, data: hash } = useWriteContract();
  const { setToast } = useTransactionToastProvider();
  const queryClient = useQueryClient();

  const onSubmit = useCallback(() => {
    if (needsApproval && approveManySimulation) {
      reset();
      writeContract(approveManySimulation.request, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: approveManyQueryKey });
          setToast({
            hash,
            actionTitle: "Approved",
            actionDescription: "You gave approval to spend your NFTs",
          });
        },
      });
      return;
    }
    if (simulation) {
      reset();
      writeContract(simulation.request, {
        onSuccess: () => {
          setToast({
            hash,
            actionTitle: "Transaction successful",
            actionDescription: "You have successfully claimed rewards",
          });
        },
      });
      return;
    }
  }, [
    needsApproval,
    approveManySimulation,
    simulation,
    queryClient,
    hash,
    setToast,
  ]);

  const isValid = useMemo(
    () =>
      Boolean(simulation) || (needsApproval && Boolean(approveManySimulation)),
    [simulation, approveManySimulation, needsApproval]
  );
  const { isConnected } = useAccount();
  return (
    isConnected && (
      <Button
        onClick={onSubmit}
        disabled={!isValid || isPending}
        variant={"primary"}
        size="md"
      >
        {isPending ? (
          <Spinner />
        ) : (
          <>{needsApproval ? "Approve All" : "Claim Locks Rewards"}</>
        )}
      </Button>
    )
  );
}
