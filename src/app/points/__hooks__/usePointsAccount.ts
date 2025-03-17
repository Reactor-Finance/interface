import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { z } from "zod";

const userInfoSchema = z.object({
  result: z.object({
    countOfReferred: z.number(),
    rank: z.number(),
    totalPoints: z.number(),
    invitationCode: z.string().optional(),
  }),
});
export default function usePointsAccount() {
  const { address } = useAccount();
  return useQuery({
    queryKey: ["userPoints", address],
    queryFn: async () => {
      const resp = await fetch("/api/points/user/info/" + address);
      return userInfoSchema.parse(await resp.json());
    },
    enabled: !!address,
  });
}
