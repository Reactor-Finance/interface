import SubmitButton from "@/components/shared/submitBtn";
import { useUnstake } from "../../__hooks__/unstake/useUnstake";
import { TPair } from "../../types";

interface Props {
  pairInfo: TPair;
  amount: bigint;
}

export default function UnstakeSubmit({ amount, pairInfo }: Props) {
  const unstake = useUnstake({
    gaugeAddress: pairInfo.gauge,
    amount,
    pairQueryKey: pairInfo.queryKey,
  });
  return (
    <SubmitButton
      onClick={unstake.onSubmit}
      validationError={unstake.errorMessage}
      state={unstake.buttonProps.state}
      isValid={unstake.isValid}
    >
      Unstake
    </SubmitButton>
  );
}
