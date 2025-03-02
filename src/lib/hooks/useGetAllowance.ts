import { Address, erc20Abi } from "viem";
import { useAccount, useReadContract } from "wagmi";

export default function useGetAllowance({
  tokenAddress,
  spender,
}: {
  tokenAddress: Address | undefined;
  spender: Address;
}) {
  const { address } = useAccount();
  return useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "allowance",
    args: [address ?? "0x", spender],
    query: { enabled: Boolean(address), staleTime: 1000 * 60 * 5 },
  });
}
