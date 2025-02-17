import { Contracts } from "@/lib/contracts";
import { parseUnits } from "viem";
import { useSimulateContract } from "wagmi";

export default function useSimulateCreateLock({
  form,
}: {
  form: {
    amount: string;
    duration: string;
  };
}) {
  const { data } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "create_lock",
    args: [parseUnits(form.amount, 18), parseUnits(form.duration, 0)],
  });
  return { data };
}
