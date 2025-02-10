"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet } from "wagmi/chains";
import { hashFn } from "@wagmi/core/query";
import { FC, PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";
import { NextUIProvider } from "@nextui-org/react";
import { TRPCReactProvider } from "@/trpc/react";
import { env } from "./env";
const chainId = env.NEXT_PUBLIC_CHAIN_ID;
const rpcUrl = env.NEXT_PUBLIC_RPC_URL;
const chain = {
  ...mainnet,
  // NOTE MAYBE REMOVE THIS.
  // All rpc calls are done through trpc
  rpcUrls: { default: { http: [rpcUrl] } },
  id: parseInt(chainId),
};
const web3Config = getDefaultConfig({
  appName: "Reactor Finance",
  projectId: "75ec6bc09b1280c146d750fbb7aae68a",
  ssr: true,
  chains: [chain],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: hashFn,
    },
  },
});

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TRPCReactProvider>
      <WagmiProvider config={web3Config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>
            <NextUIProvider className="flex min-h-svh flex-col ">
              {/* Header goes here */}
              {children}
              {/* Footer goes here */}
            </NextUIProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </TRPCReactProvider>
  );
};
