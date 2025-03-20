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
import { VeNFTsProvider } from "@/contexts/veNFTsProvider";
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
              <VeNFTsProvider>
                <TransactionToastProvider>
                  {/* Header goes here */}
                  <PoolslistContextProvider>
                    {children}
                  </PoolslistContextProvider>
                  {/* Footer goes here */}
                </TransactionToastProvider>
              </VeNFTsProvider>
            </TokenlistContextProvider>
          </TRPCReactProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
