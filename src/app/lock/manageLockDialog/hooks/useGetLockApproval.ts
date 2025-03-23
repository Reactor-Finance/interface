import { Contracts } from "@/lib/contracts";
import { useReadContract } from "wagmi";
import { useVeNFTsProvider } from "@/contexts/veNFTsProvider";

export default function useGetLockApproval() {
  const { selectedVeNFTsToken } = useVeNFTsProvider();
  const { data, queryKey } = useReadContract({
    ...Contracts.VotingEscrow,
    functionName: "getApproved",
    args: [selectedVeNFTsToken?.id ?? 0n],
  });
  return { data, queryKey };
}
