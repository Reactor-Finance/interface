import * as React from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import RctInput from "../rctInput";
import useGetRctBalance from "@/components/shared/hooks/useGetRctBalance";
import { useSimulateContract, useWriteContract } from "wagmi";
import { Contracts } from "@/lib/contracts";
import { formatUnits, parseUnits } from "viem";
import { RCT_DECIMALS } from "@/data/constants";
import useGetLockApproval from "./hooks/useGetLockApproval";
import useGetAllowance from "@/components/shared/hooks/useGetAllowance";
import useSimulateApprove from "@/components/shared/hooks/useSimulateApprove";
import { inputPatternMatch } from "@/lib/utils";
import { useLockProvider } from "../lockProvider";
export function IncreaseContent() {
  const [amount, setAmount] = React.useState("");
  const { selectedLockToken } = useLockProvider();
  const tokenId = selectedLockToken?.id.toString() ?? "";
  const { rctBalance } = useGetRctBalance();
  const { data: increaseAmountSimulation } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "increase_amount",
    args: [parseUnits(tokenId, 0), parseUnits(amount, RCT_DECIMALS)],
  });
  const { data: approveSimulation } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "approve",
    args: [Contracts.VotingEscrow.address, parseUnits(tokenId, 0)],
  });
  const approvalParams = {
    tokenAddress: Contracts.Reactor.address,
    spender: Contracts.VotingEscrow.address,
  };
  const { data: approveRctSimulation } = useSimulateApprove(approvalParams);
  const isLockApproved = useGetLockApproval();
  const { data: rctAllowance } = useGetAllowance(approvalParams);
  const { writeContract } = useWriteContract();
  const onSubmit = () => {
    if (
      (rctAllowance ?? 0n) < parseUnits(amount, RCT_DECIMALS) &&
      approveRctSimulation
    ) {
      writeContract(approveRctSimulation.request);
      return;
    }
    if (!isLockApproved && approveSimulation) {
      writeContract(approveSimulation.request);
      return;
    }
    if (increaseAmountSimulation) {
      writeContract(increaseAmountSimulation.request);
      return;
    }
  };
  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between">
        <h4>Add to lock</h4>
        <h5 className="text-neutral-200 text-[13px]">
          Available:{" "}
          <span className="text-neutral-100">
            {formatUnits(rctBalance ?? 0n, RCT_DECIMALS)} RCT
          </span>
        </h5>
      </div>

      <RctInput
        value={amount}
        onChange={(e) => {
          inputPatternMatch(e.target.value, RCT_DECIMALS);
          setAmount(e.target.value);
        }}
      />
      <h3 className="text-lg">Estimates</h3>
      <div className="space-y-1">
        <div className="flex justify-between">
          <h5 className="text-sm text-neutral-200">Deposit</h5>
          <h5 className="text-neutral-100">0.00 RCT</h5>
        </div>
        <div className="flex justify-between">
          <h5 className="text-sm text-neutral-200">Deposit</h5>
          <h5 className="text-neutral-100">0.00 RCT</h5>
        </div>
      </div>
      <Alert colors={"muted"}>
        Depositing into the lock will increase your voting power and rewards.
        You can also extend the lock duration.
      </Alert>
      <Button
        disabled={false}
        onClick={onSubmit}
        size="submit"
        variant={"primary"}
      >
        Approve
      </Button>
    </div>
  );
}
