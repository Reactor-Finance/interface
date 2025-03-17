import { ChainId, ETHER, ROUTER, WETH } from "@/data/constants";
import { useChainId, useReadContract } from "wagmi";
import { abi } from "@/lib/abis/Router";
import { Address, getAddress } from "viem";
const monToWmon = (addr: Address | undefined) => {
  if (addr?.toLowerCase() === ETHER.toLowerCase()) {
    return WETH[ChainId.MONAD_TESTNET];
  }
  return addr;
};
export default function useQuoteRemoveLiquidity({
  token0,
  token1,
  isStable,
  amount,
  disabled,
}: {
  token0: string | undefined;
  token1: string | undefined;
  isStable: boolean | undefined;
  amount: bigint;
  disabled: boolean;
}) {
  const chainId = useChainId();
  const t0 = monToWmon(token0 ? getAddress(token0) : undefined);
  const t1 = monToWmon(token1 ? getAddress(token1) : undefined);
  return useReadContract({
    address: ROUTER[chainId],
    abi,
    functionName: "quoteRemoveLiquidity",
    args: [t0 ?? "0x", t1 ?? "0x", isStable ?? false, amount],
    query: {
      enabled: !disabled,
    },
  });
}
