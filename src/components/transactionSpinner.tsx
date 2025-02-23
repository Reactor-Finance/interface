"use client";
import React from "react";
import Spinner from "./ui/spinner";
import { useTransactionToastProvider } from "@/providers/TransactionToastProvider";

export default function TransactionSpinner() {
  const { txReceipt } = useTransactionToastProvider();
  if (!txReceipt.isLoading) return;
  return (
    <div className="absolute z-50 right-[34px] top-[74px]">
      <Spinner track="neutral500" />
    </div>
  );
}
