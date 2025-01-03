import { RainbowKitProvider, darkTheme, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { abstractTestnet } from "wagmi/chains";
import { hashFn } from "@wagmi/core/query";
import { FC, PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";
import { NextUIProvider } from "@nextui-org/react";

const web3Config = getDefaultConfig({
  appName: "Reactor Finance",
  projectId: "WALLET_CONNECT_PROJECT_ID_HERE",
  ssr: true,
  chains: [abstractTestnet]
});

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          queryKeyHashFn: hashFn,
      },
  },
});

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (<WagmiProvider config={web3Config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={darkTheme()}>
        <NextUIProvider className="flex min-h-svh flex-col w-screen">
          {/* Header goes here */}
          {children}
          {/* Footer goes here */}
        </NextUIProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>)
}