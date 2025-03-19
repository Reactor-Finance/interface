import React, { useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import {
  useAccount,
  useChainId,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Address, isAddress, zeroAddress } from "viem";
import SubmitButton from "@/components/shared/submitBtn";
import useGetButtonStatuses from "@/components/shared/__hooks__/useGetButtonStatuses";
import * as Ve from "@/lib/abis/Ve";
import { VE } from "@/data/constants";
import { TLockToken } from "../types";

export default function TransferContent({
  selectedLockToken,
}: {
  selectedLockToken: TLockToken;
}) {
  const [toAddress, setToAddress] = React.useState<string>("");
  const { address = zeroAddress } = useAccount();
  const chainId = useChainId();
  const ve = useMemo(() => VE[chainId], [chainId]);
  const { data: transferSimulation } = useSimulateContract({
    ...Ve,
    address: ve,
    functionName: "safeTransferFrom",
    args: [address, toAddress as Address, selectedLockToken.id],
    query: {
      enabled:
        address !== zeroAddress &&
        Boolean(selectedLockToken) &&
        isAddress(toAddress),
    },
  });
  const { writeContract, data: hash, reset, isPending } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({ hash });
  const onSubmit = useCallback(() => {
    if (transferSimulation) {
      reset();
      writeContract(transferSimulation.request);
    }
  }, [transferSimulation, reset, writeContract]);

  const { state } = useGetButtonStatuses({ isLoading, isPending });
  return (
    <div className="space-y-4 pt-4">
      <div className="pt-2">
        <label htmlFor="destination">Destination Address</label>
        <div className="pt-1"></div>
        <Input
          placeholder="0x..."
          onChange={(e) => setToAddress(e.target.value)}
          value={toAddress}
          className="bg-neutral-1000"
        />
      </div>
      <Alert colors={"muted"}>
        Transferring a lock will also transfer any rewards and rebases! Before
        continuing, please make sure you have claimed all available rewards.
      </Alert>
      <SubmitButton
        onClick={onSubmit}
        state={state}
        isValid={Boolean(transferSimulation)}
      >
        Transfer
      </SubmitButton>
    </div>
  );
}
