import { ETHER } from "@/data/constants";
import { useMemo } from "react";
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
  const { data: etherData = { value: BigInt(0) } } = useBalance({ address });
  const { data: erc20Balance = BigInt(0) } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address ?? zeroAddress],
    query: { enabled: !!enabled },
  });
  return useMemo(
    () =>
      tokenAddress?.toLowerCase() === ETHER.toLowerCase() ||
      tokenAddress === zeroAddress
        ? etherData.value
        : erc20Balance,
    [etherData.value, tokenAddress, erc20Balance]
  );
}
