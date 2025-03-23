import { Contracts } from "@/lib/contracts";
import { useSimulateContract } from "wagmi";
import { useVeNFTsProvider } from "@/contexts/veNFTsProvider";

export default function useApproveVeRct() {
  const { selectedVeNFTsToken } = useVeNFTsProvider();
  const { data, queryKey } = useSimulateContract({
    ...Contracts.VotingEscrow,
    functionName: "approve",
    args: [Contracts.VotingEscrow.address, selectedVeNFTsToken?.id ?? 0n],
  });

  return { data, queryKey };
}
