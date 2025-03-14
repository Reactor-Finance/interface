"use client";
import React, { useMemo } from "react";
import { useAccount } from "wagmi";
import { Button, ButtonProps } from "../ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Spinner from "../ui/spinner";

export enum ButtonState {
  Signing = "SIGNING",
  Fetching = "FETCHING",
  Sending = "SENDING",
  Loading = "LOADING",
  Approve = "APPROVE",
  Wrap = "WRAP",
  Default = "DEFAULT",
}
interface Props extends ButtonProps {
  state: ButtonState;
  isValid: boolean;
  approveTokenSymbol?: string;
  validationError?: string | null;
}

export default function SubmitButton({
  state,
  isValid,
  approveTokenSymbol,
  validationError,
  ...props
}: Props) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const buttonText = useMemo(() => {
    switch (state) {
      case ButtonState.Signing:
        return "Waiting for Signature...";
      case ButtonState.Loading:
        return "Loading...";
      case ButtonState.Sending:
        return "Transction Pending";
      case ButtonState.Approve:
        return "Approve " + (approveTokenSymbol ?? "");
      case ButtonState.Fetching:
        return "Loading Data...";
      default:
        return props.children;
    }
  }, [approveTokenSymbol, props.children, state]);

  const isLoading = useMemo(
    () =>
      state === ButtonState.Loading ||
      state === ButtonState.Signing ||
      state === ButtonState.Sending ||
      state === ButtonState.Fetching,
    [state]
  );

  return !isConnected ? (
    <Button onClick={openConnectModal} variant="primary" size="submit">
      Connect Wallet
    </Button>
  ) : (
    <Button
      {...props}
      data-pending={isLoading ? "true" : "false"}
      disabled={isLoading || !isValid}
      variant="primary"
      size="submit"
    >
      <div className="flex gap-x-4 justify-center items-center">
        {(state === ButtonState.Fetching ||
          state === ButtonState.Loading ||
          state === ButtonState.Sending) && <Spinner />}
        <span>
          {!validationError || isLoading ? buttonText : validationError}
        </span>
      </div>
    </Button>
  );
}
