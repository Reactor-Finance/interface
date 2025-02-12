import { useSimulateContract } from "wagmi";
import { useLiquidityCardFormProvider } from "../liquidityCardFormProvider";

export default function useApproveTokens({
  approveTokenOne,
  approveTokenTwo,
}: {
  approveTokenOne: boolean;
  approveTokenTwo: boolean;
}) {
  const { tokenOne, tokenTwo } = useLiquidityCardFormProvider();
  const { data: approveTokenOneRequest } = useSimulateContract({
    address: tokenOne,
    functionName: "approve",
    args: [tokenTwo, 0n],
    query: { enabled: approveTokenOne },
  });
  const { data: approveTokenTwoRequest } = useSimulateContract({
    address: tokenOne,
    functionName: "approve",
    args: [tokenTwo, 0n],
    query: { enabled: approveTokenTwo },
  });

  if (approveTokenOne) {
    return { data: approveTokenOneRequest };
  }
  if (approveTokenTwo) {
    return { data: approveTokenTwoRequest };
  }
  return { data: undefined };
}
