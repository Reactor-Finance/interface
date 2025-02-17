import * as React from "react";
import { SelectItem } from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import LockDropdown from "../lockDropdown";
import RctInput from "../rctInput";
import useGetRctBalance from "@/components/shared/hooks/useGetRctBalance";
import { useSimulateContract, useWriteContract } from "wagmi";
import { Contracts } from "@/lib/contracts";
import { parseUnits } from "viem";
import { RCT_DECIMALS } from "@/data/constants";
export function IncreaseContent() {
  const [amount, setAmount] = React.useState("");
  const tokenId = "1234";
  const rctBalance = useGetRctBalance();
  console.log(rctBalance);
  const { data: increaseAmountSimulation } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "increase_amount",
    args: [parseUnits(tokenId, 0), parseUnits(amount, RCT_DECIMALS)],
  });
  const { writeContract } = useWriteContract();
  const onSubmit = () => {
    if (increaseAmountSimulation) {
      writeContract(increaseAmountSimulation.request);
    }
  };
  return (
    <div className="space-y-4 pt-4">
      <LockDropdown placeholder="Select a fruit">
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </LockDropdown>
      <div className="flex justify-between">
        <h4>Add to lock</h4>
        <h5 className="text-neutral-200 text-[13px]">Available: 200.00 RCT</h5>
      </div>

      <RctInput
        value={amount}
        onChange={(e) => {
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
      <Button disabled onClick={onSubmit} size="submit" variant={"primary"}>
        Approve
      </Button>
    </div>
  );
}
