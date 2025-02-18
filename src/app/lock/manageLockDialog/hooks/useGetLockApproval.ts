import { Contracts } from "@/lib/contracts";
import { parseUnits } from "viem";
import { useReadContract } from "wagmi";

export default function useGetLockApproval({ tokenId }: { tokenId: string }) {
  const { data } = useReadContract({
    ...Contracts.VotingEscrow,
    functionName: "getApproved",
    args: [parseUnits(tokenId, 0)],
  });
  return data;
}
