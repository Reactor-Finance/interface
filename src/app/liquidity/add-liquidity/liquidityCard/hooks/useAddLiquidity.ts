import { useAccount, useSimulateContract } from "wagmi";
import { Contracts } from "@/lib/contracts";
import { TAddress } from "@/lib/types";
import { useLiquidityCardFormProvider } from "../liquidityCardFormProvider";
import { parseUnits } from "viem";
interface Props {
  tokenOne: TAddress;
  tokenTwo: TAddress;
  tokenOneDeposit: string;
  tokenTwoDeposit: string;
  stable: boolean;
  isApproving: boolean;
}
export function useAddLiquidity({
  tokenOne,
  tokenTwo,
  tokenOneDeposit,
  tokenTwoDeposit,
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
    parseUnits(tokenOneDeposit, tokenOneDecimals ?? 0) <= tokenOneBalance &&
    parseUnits(tokenTwoDeposit, tokenTwoDecimals ?? 0) <= tokenTwoBalance;
  // TODO
  // ADD Slippage
  const { data, error } = useSimulateContract({
    ...Contracts.Router,
    functionName: "addLiquidity",
    args: [
      tokenOne,
      tokenTwo,
      stable,
      parseUnits(tokenOneDeposit, tokenOneDecimals ?? 0),
      parseUnits(tokenTwoDeposit, tokenTwoDecimals ?? 0),
      parseUnits(tokenOneDeposit, tokenOneDecimals ?? 0), //slipage
      parseUnits(tokenTwoDeposit, tokenTwoDecimals ?? 0), //slippage
      address ?? "0x",
      BigInt(Date.now() + 1000 * 60 * 2),
    ],
    query: {
      enabled: Boolean(address) && !isApproving && enoughToken,
    },
  });
  if (error) {
    console.error(error);
  }
  console.log({ data });
  return { data };
}
