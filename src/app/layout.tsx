import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({});

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
      <body className={` ${jetbrainsMono.className} antialiased`}>
        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
