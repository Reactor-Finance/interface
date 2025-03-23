import { ChainId, WETH } from "@/data/constants";
import { useGetBalance } from "./useGetBalance";
import { useCallback, useMemo } from "react";
import { parseEther } from "viem";
import { useSimulateContract } from "wagmi";
import { abi } from "@/lib/abis/WETH";
import { useQueryClient } from "@tanstack/react-query";
interface Props {
  amountIn: string;
  isWmon: boolean;
  disabled?: boolean;
}
export default function useWrapWrite({ amountIn, isWmon, disabled }: Props) {
  const { balance, etherBalance, ethQueryKey, balanceQueryKey } = useGetBalance(
    {
      tokenAddress: WETH[ChainId.MONAD_TESTNET],
    }
  );
  const amount = parseEther(amountIn);
  let needsWrap = useMemo(() => {
    if (!isWmon) return false;
    if (balance < parseEther(amountIn)) {
      return true;
    }
    return false;
  }, [amountIn, balance, isWmon]);
  const wrapAmount = useMemo(() => {
    if (!needsWrap) return 0n;
    const wrap = amount - balance;
    return wrap;
  }, [amount, balance, needsWrap]);
  if (etherBalance.value < wrapAmount) {
    needsWrap = false;
  }
  const depositSimulation = useSimulateContract({
    abi,
    address: WETH[ChainId.MONAD_TESTNET],
    functionName: "deposit",
    value: wrapAmount,
    query: {
      enabled: needsWrap && !disabled,
    },
  });
  const queryClient = useQueryClient();
  const resetWrap = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ethQueryKey });
    queryClient.invalidateQueries({ queryKey: balanceQueryKey });
  }, [balanceQueryKey, ethQueryKey, queryClient]);
  return { needsWrap, depositSimulation, resetWrap };
}
