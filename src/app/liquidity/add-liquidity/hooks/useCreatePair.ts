import { useSimulateContract } from "wagmi";
import { Contracts } from "@/lib/contracts";
import { TAddress } from "@/lib/types";
interface Props {
  tokenOne: TAddress;
  tokenTwo: TAddress;
  stable: boolean;
}
export function useCreatePair({ tokenOne, tokenTwo, stable }: Props) {
  const { data } = useSimulateContract({
    ...Contracts.PairFactory,
    functionName: "createPair",
    args: [tokenOne, tokenTwo, stable],
  });
  return { data };
}
