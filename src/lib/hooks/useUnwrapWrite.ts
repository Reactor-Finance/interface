import { ChainId, WETH } from "@/data/constants";
import { useGetBalance } from "./useGetBalance";
import { useCallback, useMemo } from "react";
import { parseEther } from "viem";
import { useSimulateContract } from "wagmi";
import { abi } from "@/lib/abis/WETH";
import { useQueryClient } from "@tanstack/react-query";
interface Props {
  amountIn: string;
  isMon: boolean;
}
export default function useUnwrapWrite({ amountIn, isMon }: Props) {
  const { balance, etherBalance, ethQueryKey, balanceQueryKey } = useGetBalance(
    {
      tokenAddress: WETH[ChainId.MONAD_TESTNET],
    }
  );
  const amount = parseEther(amountIn);
  let needsUnwrap = useMemo(() => {
    if (!isMon) return false;
    if (etherBalance.value < parseEther(amountIn)) {
      return true;
    }
    return false;
  }, [amountIn, etherBalance, isMon]);
  const unwrapAmount = useMemo(() => {
    if (!needsUnwrap) return 0n;
    const unwrap = amount - balance;
    return unwrap;
  }, [amount, balance, needsUnwrap]);
  if (balance < unwrapAmount) {
    needsUnwrap = false;
  }
  const withdrawSimulation = useSimulateContract({
    abi,
    address: WETH[ChainId.MONAD_TESTNET],
    functionName: "withdraw",
    args: [unwrapAmount],
    query: {
      enabled: needsUnwrap,
    },
  });
  const queryClient = useQueryClient();
  const resetUnwrap = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ethQueryKey });
    queryClient.invalidateQueries({ queryKey: balanceQueryKey });
  }, [balanceQueryKey, ethQueryKey, queryClient]);
  return { needsUnwrap, withdrawSimulation, resetUnwrap };
}
