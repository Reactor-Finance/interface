import { ButtonState } from "../submitBtn";

interface Props {
  isLoading: boolean;
  isPending: boolean;
  needsApproval?: boolean | undefined;
  isFetching: boolean | undefined;
}
export default function useGetButtonStatuses({
  isLoading,
  isPending,
  needsApproval,
  isFetching,
}: Props) {
  if (isLoading) {
    return {
      state: ButtonState.Loading,
    };
  }
  if (isFetching) {
    return { state: ButtonState.Fetching };
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
