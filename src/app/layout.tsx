import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/header";
import TransactionToast from "@/components/transactionToast";

const jetbrainsMono = JetBrains_Mono({
  weight: ["100", "200", "300", "500", "400", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
  variable: "--jetbrains-font",
});

export const metadata: Metadata = {
  title: "Reactor Finance",
  description: "Native DEX on Monad chain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`text-white bg-background  overflow-x-hidden ${jetbrainsMono.className} antialiased`}
      >
        <Providers>
          <TransactionToast />
          <Header />
          <main className="">{children}</main>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
