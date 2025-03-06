import { erc20Abi, zeroAddress } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";

export function useGetBalance({
  tokenAddress,
  enabled,
}: {
  tokenAddress: `0x${string}` | undefined;
  enabled?: boolean;
}) {
  const { address } = useAccount();
  const { data: etherData = { value: BigInt(0) }, queryKey: ethKey } =
    useBalance({
      address,
      query: { enabled: !!enabled },
    });
  const { data: balance = BigInt(0), queryKey } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address ?? zeroAddress],
    query: { enabled: !!enabled },
  });

  return {
    balance,
    balanceQueryKey: queryKey,
    ethQueryKey: ethKey,
    etherBalance: etherData,
  };
}
