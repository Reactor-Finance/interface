import { Address, erc20Abi } from "viem";
import { useAccount, useReadContract } from "wagmi";

export default function useGetAllowance({
  tokenAddress,
  spender,
}: {
  tokenAddress: Address;
  spender: Address;
}) {
  const { address } = useAccount();
  const { data } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "allowance",
    args: [address ?? "0x", spender],
    query: { enabled: Boolean(address) },
  });
  return { data };
}
