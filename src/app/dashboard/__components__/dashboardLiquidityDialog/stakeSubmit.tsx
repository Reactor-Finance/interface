import { useStake } from "../../__hooks__/stake/useStake";
import { SimulateReturnType, TPair } from "../../types";
import SubmitButton from "@/components/shared/submitBtn";
interface Props {
  amount: bigint;
  fetchingApproval: boolean;
  needsApproval: boolean;
  approvalSimulation: SimulateReturnType;
  pairInfo: TPair;
  isCreateGauge: boolean;
}
export default function StakeSubmit({
  pairInfo,
  amount,
  approvalSimulation,
  needsApproval,
  fetchingApproval,
}: Props) {
  const stake = useStake({
    fetchingApproval,
    approvalSimulation,
    needsApproval,
    amount,
    gaugeAddress: pairInfo.gauge,
    pairQueryKey: pairInfo.queryKey,
  });
  return (
    <SubmitButton
      state={stake.buttonProps.state}
      onClick={stake.onSubmit}
      isValid={stake.isValid}
    >
      Stake
    </SubmitButton>
  );
}
