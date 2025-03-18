"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { monadTestnet } from "wagmi/chains";
import { hashFn } from "@wagmi/core/query";
import { FC, PropsWithChildren } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { HeroUIProvider } from "@heroui/react";
import { TRPCReactProvider } from "@/trpc/react";
import { TokenlistContextProvider } from "@/contexts/tokenlistContext";
import { TransactionToastProvider } from "@/contexts/transactionToastProvider";
import { PoolslistContextProvider } from "@/contexts/poolsTvl";
import {
  metaMaskWallet,
  phantomWallet,
  walletConnectWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        phantomWallet,
        metaMaskWallet,
        walletConnectWallet,
        injectedWallet,
      ],
    },
  ],
  {
    appName: "ReactorFi",
    projectId: "75ec6bc09b1280c146d750fbb7aae68a",
  }
);

export const wagmiConfig = createConfig({
  connectors,
  ssr: true,
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http("https://testnet-rpc.monad.xyz"),
  },
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: hashFn,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={darkTheme()}>
          <TRPCReactProvider>
            <TokenlistContextProvider>
              <TransactionToastProvider>
                <HeroUIProvider className="flex min-h-svh flex-col ">
                  {/* Header goes here */}
                  <PoolslistContextProvider>
                    {children}
                  </PoolslistContextProvider>
                  {/* Footer goes here */}
                </HeroUIProvider>
              </TransactionToastProvider>
            </TokenlistContextProvider>
          </TRPCReactProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
