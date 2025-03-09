"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { monadTestnet } from "wagmi/chains";
import { hashFn } from "@wagmi/core/query";
import { FC, PropsWithChildren } from "react";
import { http, WagmiProvider } from "wagmi";
import { HeroUIProvider } from "@heroui/react";
import { TRPCReactProvider } from "@/trpc/react";
import { TokenlistContextProvider } from "@/contexts/tokenlistContext";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "@/store";
import { TransactionToastProvider } from "@/contexts/transactionToastProvider";

export const wagmiConfig = getDefaultConfig({
  appName: "Reactor Finance",
  projectId: "75ec6bc09b1280c146d750fbb7aae68a",
  ssr: true,
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http(
      "https://monad-testnet.g.alchemy.com/v2/7wbWB2YsEDHzMwUul1uwHcOapXgLevhY"
    ),
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
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()}>
              <TRPCReactProvider>
                <TokenlistContextProvider>
                  <TransactionToastProvider>
                    <HeroUIProvider className="flex min-h-svh flex-col ">
                      {/* Header goes here */}
                      {children}
                      {/* Footer goes here */}
                    </HeroUIProvider>
                  </TransactionToastProvider>
                </TokenlistContextProvider>
              </TRPCReactProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
