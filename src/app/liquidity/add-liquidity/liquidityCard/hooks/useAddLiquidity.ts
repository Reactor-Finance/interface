import { useAccount, useSimulateContract } from "wagmi";
import { Contracts } from "@/lib/contracts";
import { TAddress } from "@/lib/types";
import { useLiquidityCardFormProvider } from "../liquidityCardFormProvider";
import { getAddress, parseUnits } from "viem";
import { useMemo } from "react";
interface Props {
  tokenOne: TAddress;
  tokenTwo: TAddress;
  tokenDeposits: {
    tokenOneDeposit: string;
    tokenTwoDeposit: string;
  };
  stable: boolean;
  isApproving: boolean;
}
export function useAddLiquidity({
  tokenOne,
  tokenTwo,
  tokenDeposits,
  isApproving,
  stable,
}: Props) {
  const {
    tokenOneDecimals,
    tokenTwoDecimals,
    tokenOneBalance,
    tokenTwoBalance,
  } = useLiquidityCardFormProvider();
  const { address } = useAccount();
  const enoughToken =
    parseUnits(tokenDeposits.tokenOneDeposit, tokenOneDecimals ?? 0) <=
      tokenOneBalance &&
    parseUnits(tokenDeposits.tokenTwoDeposit, tokenTwoDecimals ?? 0) <=
      tokenTwoBalance;
  // TODO
  // ADD Slippage
  const deadline = useMemo(() => {
    return BigInt(Date.now() + 1000 * 20);
  }, []);
  const { data, error } = useSimulateContract({
    ...Contracts.Router,
    functionName: "addLiquidity",
    args: [
      getAddress(tokenOne),
      getAddress(tokenTwo),
      stable,
      parseUnits(tokenDeposits.tokenOneDeposit, tokenOneDecimals ?? 0),
      parseUnits(tokenDeposits.tokenTwoDeposit, tokenTwoDecimals ?? 0),
      parseUnits(tokenDeposits.tokenOneDeposit, tokenOneDecimals ?? 0) -
        parseUnits("1", tokenOneDecimals ?? 0), //slipage
      parseUnits(tokenDeposits.tokenTwoDeposit, tokenTwoDecimals ?? 0) -
        parseUnits("1", tokenTwoDecimals ?? 0), //slippage
      address ?? "0x",
      deadline,
    ],
    query: {
      enabled: Boolean(address) && !isApproving && enoughToken,
    },
  });
  if (error) {
    console.error(error);
  }
  return { data };
}
