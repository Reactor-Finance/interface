import { StakeProps, useStake } from "../../__hooks__/useStake";
import SubmitButton from "@/components/shared/submitBtn";
export default function StakeSubmit(props: StakeProps) {
  const stake = useStake(props);
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
