import { useAccount, useSimulateContract } from "wagmi";
import { Contracts } from "@/lib/contracts";
import { TAddress } from "@/lib/types";
import { useLiquidityCardFormProvider } from "../liquidityCardFormProvider";
import { parseUnits } from "viem";
interface Props {
  tokenOne: TAddress;
  tokenTwo: TAddress;
  tokenOneAmount: string;
  tokenTwoAmount: string;
  stable: boolean;
}
export function useAddLiquidity({
  tokenOne,
  tokenTwo,
  tokenOneAmount,
  tokenTwoAmount,
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
      parseUnits(tokenOneAmount, tokenOneDecimals ?? 0),
      parseUnits(tokenTwoAmount, tokenTwoDecimals ?? 0),
      parseUnits(tokenOneAmount, tokenOneDecimals ?? 0), //slipage
      parseUnits(tokenTwoAmount, tokenTwoDecimals ?? 0), //slippage
      address ?? "0x",
      0n,
    ],
    query: {
      enabled: Boolean(address),
    },
  });
  return { data };
}
