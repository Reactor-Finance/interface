"use client";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function TransactionToast() {
  const { state, updateState } = useTransactionToastProvider();
  const [content, setContent] = useState<
    | {
        title: string | undefined;
        desc: string | undefined;
      }
    | undefined
  >();
  useEffect(() => {
    if (!content) {
      setContent({
        title: state.actionTitle,
        desc: state.actionDescription,
      });
    }
  }, [content, state.actionDescription, state.actionTitle]);
  useEffect(() => {
    if (!state.open) {
      setTimeout(() => {
        setContent(undefined);
      }, 500);
    }
  }, [state.open]);
  useEffect(() => {
    if (state.open) {
      setTimeout(() => {
        updateState({ open: false });
      }, 5000);
    }
  }, [state.open, updateState]);
  return (
    <div
      data-state={state.open ? "open" : "closed"}
      className="absolute transition-all  z-50 top-[74px] data-[state=closed]:translate-x-[120%] data-[state=open]:right-[34px] right-0"
    >
      <div className="bg-neutral-950 relative py-6 pl-4 pr-8 border-b-success-400 border-b-2 rounded-lg">
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
          <span>{content?.title ?? "Transaction Successful"}</span>
        </div>
        <div></div>
      </div>
    </div>
  );
}
