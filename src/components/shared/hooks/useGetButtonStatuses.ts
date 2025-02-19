import { ButtonState } from "../submitBtn";

interface Props {
  isLoading: boolean;
  isPending: boolean;
  needsApproval?: boolean | undefined;
}
export default function useGetButtonStatuses({
  isLoading,
  isPending,
  needsApproval,
}: Props) {
  if (isLoading) {
    return {
      state: ButtonState.Loading,
    };
  }
  if (isPending) {
    return {
      state: ButtonState.Signing,
    };
  }
  if (needsApproval) {
    return {
      state: ButtonState.Approve,
    };
  }
  return {
    state: ButtonState.Default,
  };
}
