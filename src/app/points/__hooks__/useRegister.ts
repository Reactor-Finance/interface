import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export default function useRegister({ inviteCode }: { inviteCode: string }) {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async () => {
      const payload = {
        invitationCode: inviteCode,
        address,
      };
      const resp = await fetch("/api/points/user/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) => r.json());
      console.log(resp);
      if (resp.error) {
        throw Error(resp.error);
      }
      if (!resp) throw Error("");
      queryClient.invalidateQueries({ queryKey: ["userPoints", address] });
      return;
    },
  });
  return mutate;
}
