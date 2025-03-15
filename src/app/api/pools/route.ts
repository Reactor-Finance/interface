import { ChainId, ORACLE, PAIR_HELPER } from "@/data/constants";
import { abi as PairAbi } from "@/lib/abis/PairHelper";
import { abi as OracleAbi } from "@/lib/abis/Oracle";
import { NextResponse } from "next/server";
import {
  Address,
  createPublicClient,
  http,
  parseUnits,
  zeroAddress,
} from "viem";

function withTimeout<T>(promise: Promise<T>, timeout: number): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Operation timed out")), timeout)
  );
  return Promise.race([promise, timeoutPromise]);
}
async function handler() {
  const tokenMap: Map<string, bigint> = new Map();
  const tokenPrices: Record<string, string> = {};
  const publicClient = createPublicClient({
    // TODO: Use a private rpc url
    transport: http("https://testnet-rpc.monad.xyz"),
  });
  const data = await publicClient.readContract({
    abi: PairAbi,
    address: PAIR_HELPER[ChainId.MONAD_TESTNET],
    functionName: "getAllPair",
    args: [zeroAddress, 200n, 0n],
  });
  data.forEach((pair) => {
    if (tokenMap.has(pair.token0) === false) {
      tokenMap.set(pair.token0, pair.token0_decimals);
    }
    if (pair.token1 !== zeroAddress && tokenMap.has(pair.token1) === false) {
      tokenMap.set(pair.token1, pair.token1_decimals);
    }
  });

  for (const [ind, ele] of tokenMap) {
    console.log(ind, ele);
    try {
      const resultPromise = publicClient.readContract({
        abi: OracleAbi,
        address: ORACLE[ChainId.MONAD_TESTNET],
        functionName: "getAverageValueInUSD",
        args: [ind as Address, parseUnits("1", Number(ele))],
      });
      const result = await withTimeout(resultPromise, 1000);
      tokenPrices[ind] = result[0].toString();
    } catch (e) {
      console.log(e);
    }
  }
  console.log(tokenPrices);
  return NextResponse.json({ tokenPrices });
}

export { handler as GET };
