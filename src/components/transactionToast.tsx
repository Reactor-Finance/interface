"use client";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { X } from "lucide-react";
import React, { useEffect } from "react";

export default function TransactionToast() {
  const { state, updateState } = useTransactionToastProvider();
  useEffect(() => {
    if (state.open) {
      setTimeout(() => {
        updateState({ open: false });
      }, 4000);
    }
  }, [state.open, updateState]);
  return (
    <div
      data-state={state.open ? "open" : "closed"}
      className="absolute transition-all  z-50 top-[74px] data-[state=closed]:translate-x-[120%] data-[state=open]:right-[34px] right-0"
    >
      <div className="bg-neutral-950 relative py-6 px-4 border-b-success-400 border-b-2 rounded-lg">
        <div className="absolute right-1 top-1">
          <button className="text-neutral-400">
            <X
              size={20}
              onClick={() => {
                updateState({ open: false });
              }}
            />
          </button>
        </div>
        <div>
          <span>TransactionToast</span>
        </div>
      </div>
    </div>
  );
}
