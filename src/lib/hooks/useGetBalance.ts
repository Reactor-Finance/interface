import { ETHER } from "@/data/constants";
import { useMemo } from "react";
import { erc20Abi, zeroAddress } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";

export function useGetBalance({
  tokenAddress,
  disabled,
}: {
  tokenAddress: `0x${string}` | undefined;
  disabled?: boolean;
}) {
  const { address } = useAccount();
  const { data: etherData = { value: BigInt(0) }, queryKey: ethQueryKey } =
    useBalance({
      address,
      query: { enabled: !disabled },
    });
  const { data: erc20Balance = BigInt(0), queryKey: erc20QueryKey } =
    useReadContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [address ?? zeroAddress],
      query: { enabled: !disabled },
    });

  return useMemo(
    () =>
      tokenAddress?.toLowerCase() === ETHER.toLowerCase()
        ? { balance: etherData.value, queryKey: ethQueryKey }
        : { balance: erc20Balance, queryKey: erc20QueryKey },
    [tokenAddress, etherData.value, erc20Balance, ethQueryKey, erc20QueryKey]
  );
}
