import { Contracts } from "@/lib/contracts";
import { useLockProvider } from "../../lockProvider";
import { useSimulateContract } from "wagmi";

export default function useApproveVeRct() {
  const { selectedLockToken } = useLockProvider();
  const { data, queryKey } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "approve",
    args: [Contracts.VotingEscrow.address, selectedLockToken?.id ?? 0n],
  });

  return { data, queryKey };
}
