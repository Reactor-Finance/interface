import React, { useMemo } from "react";
import { Alert } from "@/components/ui/alert";
import { Contracts } from "@/lib/contracts";
import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import LockDropdown from "../lockDropdown";
import { useLockProvider } from "../lockProvider";
import useGetButtonStatuses from "@/components/shared/hooks/useGetButtonStatuses";
import SubmitButton from "@/components/shared/submitBtn";

export default function MergeContent() {
  const [mergeToken, setMergeToken] = React.useState("");
  const { lockTokens, selectedLockToken } = useLockProvider();
  const tokenId1 = useMemo(() => {
    return lockTokens.find((token) => token.id.toString() === mergeToken);
  }, [lockTokens, mergeToken]);
  const { data: mergeSimulation } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "merge",
    args: [selectedLockToken?.id ?? 0n, tokenId1?.id ?? 0n],
  });
  const { writeContract, isPending, data: hash } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({ hash });
  const onSubmit = () => {
    if (mergeSimulation?.request) {
      writeContract(mergeSimulation.request);
    }
  };
  const { state } = useGetButtonStatuses({ isLoading, isPending });

  return (
    <div className="space-y-4 pt-4">
      <h2>Merge with</h2>
      <LockDropdown.Root
        value={mergeToken}
        onValueChange={(value) => setMergeToken(value)}
      >
        <LockDropdown.Trigger></LockDropdown.Trigger>
        <LockDropdown.SelectList>
          {lockTokens
            .filter((token) => token.id !== selectedLockToken?.id)
            .map((lockToken) => (
              <LockDropdown.Item
                value={lockToken.id.toString()}
                key={lockToken.id.toString()}
              >
                Lock #{lockToken.id.toString()}
              </LockDropdown.Item>
            ))}
        </LockDropdown.SelectList>
      </LockDropdown.Root>
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
