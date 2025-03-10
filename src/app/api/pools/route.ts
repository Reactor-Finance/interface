import { ChainId, ORACLE } from "@/data/constants";
import { abi } from "@/lib/abis/Oracle";
import { NextResponse } from "next/server";
import { createPublicClient, http, zeroAddress } from "viem";
async function handler() {
  const publicClient = createPublicClient({
    // TODO: Use a private rpc url
    transport: http(
      "https://monad-testnet.g.alchemy.com/v2/7wbWB2YsEDHzMwUul1uwHcOapXgLevhY"
    ),
  });
  const data = await publicClient.readContract({
    abi,
    functionName: "getAllPriceSources",
    address: ORACLE[ChainId.MONAD_TESTNET],
  });
  const price = publicClient.readContract({
    abi,
    address: ORACLE[ChainId.MONAD_TESTNET],
    functionName: "getValueInETH",
    args: [data[0] ?? zeroAddress, "0x", 100n],
  });
  return NextResponse.json({ price });
}

export { handler as GET };
