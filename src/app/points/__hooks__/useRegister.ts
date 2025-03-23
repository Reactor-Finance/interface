import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount, useSignMessage } from "wagmi";

export default function useRegister({ inviteCode }: { inviteCode: string }) {
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async () => {
      if (!address) throw Error("No address");
      // add wagmi signature
      const signature = await signMessageAsync({
        account: address,
        message: `I am verifying my participation in the Reactor Points campaign using the referral code: ${inviteCode}.`,
      });
      const payload = {
        invitationCode: inviteCode,
        signature,
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
