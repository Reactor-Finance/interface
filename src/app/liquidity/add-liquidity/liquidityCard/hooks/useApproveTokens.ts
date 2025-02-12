import { useSimulateContract } from "wagmi";
import { useLiquidityCardFormProvider } from "../liquidityCardFormProvider";
import { Contracts } from "@/lib/contracts";
// altered abi for USDT edge case
const abi = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    outputs: [],
  },
];

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
    abi,
    functionName: "approve",
    args: [Contracts.Router.address, 10000000n],
    // query: { enabled: approveTokenOne },
  });
  const { data: approveTokenTwoRequest } = useSimulateContract({
    address: tokenTwo,
    abi,
    functionName: "approve",
    args: [Contracts.Router.address, 100000000n],
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
