import { useDebounce } from "@/components/shared/hooks/useDebounce";
import { Contracts } from "@/lib/contracts";
import { parseUnits } from "viem";
import { useSimulateContract } from "wagmi";

export default function useSimulateCreateLock({
  form,
}: {
  form: {
    amount: string;
    duration: number[];
  };
  needsApproval: boolean;
}) {
  const { debouncedValue: duration } = useDebounce(form.duration[0], 400);
  const { data, error } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "create_lock",
    args: [parseUnits(form.amount, 18), parseUnits(duration.toString(), 0)],
    query: { enabled: form.amount !== "" },
  });
  console.log({ error });
  return { data };
}
