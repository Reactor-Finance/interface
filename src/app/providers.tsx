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
import { TRPCReactProvider } from "@/trpc/react";
import { env } from "./env";
import { TransactionToastProvider } from "@/providers/TransactionToastProvider";
const chainId = env.NEXT_PUBLIC_CHAIN_ID;
const chain = {
  ...mainnet,
  // NOTE MAYBE REMOVE THIS.
  // All rpc calls are done throtcugh trpc
  rpcUrls: { default: { http: ["/api/rpc"] } },
  id: parseInt(chainId),
};
export const wagmiConfig = getDefaultConfig({
  appName: "Reactor Finance",
  projectId: "75ec6bc09b1280c146d750fbb7aae68a",
  ssr: true,
  chains: [chain],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: hashFn,
      refetchOnWindowFocus: false,
    },
  },
});

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TRPCReactProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>
            <TransactionToastProvider>{children}</TransactionToastProvider>
            {/* <HeroUIProvider className="flex min-h-svh flex-col "> */}
            {/* Header goes here */}
            {/* Footer goes here */}
            {/* </HeroUIProvider> */}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </TRPCReactProvider>
  );
};
