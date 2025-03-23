import SubmitButton from "@/components/shared/submitBtn";
import { UnstakeProps, useUnstake } from "../../__hooks__/useUnstake";

export default function UnstakeSubmit(props: UnstakeProps) {
  const unstake = useUnstake(props);
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
