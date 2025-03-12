import { ETHER } from "@/data/constants";
import { useMemo } from "react";
import { erc20Abi, zeroAddress } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";

export function useGetBalance({
  tokenAddress,
}: {
  tokenAddress: `0x${string}` | undefined;
}) {
  const { address } = useAccount();
  const { data: etherData = { value: BigInt(0) } } = useBalance({
    address,
    query: { enabled: true, refetchInterval: 10_000 },
  });
  const { data: erc20Balance = BigInt(0) } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address ?? zeroAddress],
    query: { enabled: true, refetchInterval: 10_000 },
  });

  return useMemo(
    () =>
      tokenAddress?.toLowerCase() === ETHER.toLowerCase()
        ? etherData.value
        : erc20Balance,
    [tokenAddress, etherData.value, erc20Balance]
  );
}
