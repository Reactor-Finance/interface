"use client";
import React from "react";
import { useAccount } from "wagmi";
import { Button, ButtonProps } from "../ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function SubmitButton(props: ButtonProps) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  if (!isConnected) {
    return (
      <Button
        onClick={() => openConnectModal?.()}
        variant="primary"
        size="submit"
      >
        Connect Wallet
      </Button>
    );
  }
  return <Button {...props} variant="primary" size="submit" />;
}
