import { useMemo } from "react";
import { Address, erc20Abi } from "viem";
import { useReadContracts } from "wagmi";
import { TToken } from "../types";
import { ChainId } from "@/data/constants";

export default function useGetToken({
  address,
  disabled,
}: {
  address: Address | undefined;
  disabled?: boolean;
}) {
  const { data, isFetched } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        functionName: "decimals",
        address,
      },
      {
        abi: erc20Abi,
        functionName: "symbol",
        address,
      },
      {
        abi: erc20Abi,
        address,
        functionName: "name",
      },
    ],
    query: {
      enabled: address?.length === 42 && !disabled,
    },
  });
  const foundToken = useMemo(() => {
    if (!address) return;
    if (data) {
      const [decimals, symbol, name] = data;
      if (!decimals.result || !symbol.result || !name.result) return;
      const token: TToken = {
        address,
        decimals: decimals.result,
        symbol: symbol.result,
        name: name.result,
        logoURI: null,
        chainId: ChainId.MONAD_TESTNET,
      };
      return token;
    }
  }, [address, data]);
  if (!address) return { foundToken: undefined, isFetched: true };
  return { foundToken, isFetched };
}
