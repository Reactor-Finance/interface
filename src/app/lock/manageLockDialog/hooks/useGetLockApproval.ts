import { Contracts } from "@/lib/contracts";
import { useReadContract } from "wagmi";
import { useLockProvider } from "../../lockProvider";

export default function useGetLockApproval() {
  const { selectedLockToken } = useLockProvider();
  const { data, queryKey } = useReadContract({
    ...Contracts.VotingEscrow,
    functionName: "getApproved",
    args: [selectedLockToken?.id ?? 0n],
  });
  return { data, queryKey };
}
