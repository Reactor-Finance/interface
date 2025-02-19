"use client";
import React, { useMemo } from "react";
import { useAccount } from "wagmi";
import { Button, ButtonProps } from "../ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
export enum ButtonState {
  Signing = "SIGNING",
  Loading = "LOADING",
  Approve = "APPROVE",
  Default = "DEFAULT",
}
interface Props extends ButtonProps {
  state: ButtonState;
  isValid: boolean;
  approveTokenSymbol?: string;
}
export default function SubmitButton({
  state,
  isValid,
  approveTokenSymbol,
  ...props
}: Props) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const buttonText = useMemo(() => {
    switch (state) {
      case ButtonState.Signing:
        return "Waiting for Signature";
      case ButtonState.Loading:
        return "Loading";
      case ButtonState.Approve:
        return "Approve " + (approveTokenSymbol ?? "");
      default:
        return props.children;
    }
  }, [approveTokenSymbol, props.children, state]);
  const isLoading =
    state === ButtonState.Loading || state === ButtonState.Signing;
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
  return (
    <Button
      {...props}
      data-pending={isLoading ? "true" : "false"}
      disabled={isLoading || !isValid}
      variant="primary"
      size="submit"
    >
      {buttonText}
    </Button>
  );
}
