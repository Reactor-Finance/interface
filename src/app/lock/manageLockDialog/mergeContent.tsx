import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "@/components/ui/alert";
import {
  useChainId,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import SubmitButton from "@/components/shared/submitBtn";
import usePadLoading from "@/lib/hooks/usePadLoading";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import { TLockToken } from "../types";
import * as Ve from "@/lib/abis/Ve";
import { VE } from "@/data/constants";
import ManageLockDropdown from "./manageLockDropdown";
import { useVeNFTsProvider } from "@/contexts/veNFTsProvider";

export default function MergeContent({
  selectedLockToken,
}: {
  selectedLockToken: TLockToken;
}) {
  const { lockTokens, reset: resetLocks } = useVeNFTsProvider();
  const [selectedLockToken0, setSelectedLockToken0] = useState<TLockToken>();
  const chainId = useChainId();
  const ve = useMemo(() => VE[chainId], [chainId]);
  const { data: mergeSimulation, isFetching } = useSimulateContract({
    ...Ve,
    address: ve,
    functionName: "merge",
    args: [selectedLockToken?.id ?? 0n, selectedLockToken0?.id ?? 0n],
    query: {
      enabled: Boolean(selectedLockToken) && Boolean(selectedLockToken0),
    },
  });
  const { writeContract, reset, isPending, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  useEffect(() => {
    if (isSuccess) {
      reset();
      resetLocks();
    }
  }, [isSuccess, reset, resetLocks]);

  const onSubmit = useCallback(() => {
    if (mergeSimulation?.request) {
      writeContract(mergeSimulation.request);
    }
  }, [mergeSimulation, writeContract]);

  const paddedIsFetching = usePadLoading({
    value: isFetching,
    duration: 300,
  });
  const { state } = useGetButtonStatuses({
    isLoading,
    isPending,
    isFetching: paddedIsFetching,
  });

  return (
    <div className="space-y-4 pt-4">
      <h2>Merge with</h2>
      <ManageLockDropdown
        lockTokens={lockTokens.filter(
          (token) =>
            token.id !== selectedLockToken0?.id &&
            token.id !== selectedLockToken.id
        )}
        onTokenSelected={(value) => {
          setSelectedLockToken0(
            lockTokens.find((lock) => lock.id === value?.id)
          );
        }}
        selectedLockToken={selectedLockToken0}
      />
      <div className="p-3 bg-neutral-950 border border-neutral-900/80 rounded-sm ">
        <h2>Estimates</h2>
      </div>
      <div className="flex justify-between p-2 ">
        <h5 className="text-sm text-neutral-200">Deposit</h5>
        <h5 className="text-neutral-100">0.00 RCT</h5>
      </div>
      <Alert colors={"muted"}>
        Merging locks will inherit the longest lock time of the two and will
        increase the final Lock voting power by adding up the two underlying
        locked amounts based on the new lock time.
      </Alert>
      <SubmitButton
        onClick={onSubmit}
        state={state}
        isValid={Boolean(mergeSimulation)}
      >
        Merge
      </SubmitButton>
    </div>
  );
}
