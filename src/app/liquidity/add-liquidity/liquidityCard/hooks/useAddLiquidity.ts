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
  const { tokenOneDecimals, tokenTwoDecimals } = useLiquidityCardFormProvider();

  const { address } = useAccount();
  // TODO
  // ADD Slippage
  const { data } = useSimulateContract({
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
      0n,
    ],
    query: {
      enabled: Boolean(address) && !isApproving,
    },
  });
  console.log({ data });
  return { data };
}
