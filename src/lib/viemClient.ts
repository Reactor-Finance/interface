import { env } from "@/env";
import "server-only";
import { createPublicClient, http } from "viem";

export const viemClient = createPublicClient({
  // TODO: Use a private rpc url
  transport: http(env.RPC_URL),
});
