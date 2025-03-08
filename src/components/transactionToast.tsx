"use client";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import useOutBounce from "@/lib/hooks/useOutBounce";
import { X } from "lucide-react";
import React, { useEffect } from "react";

export default function TransactionToast() {
  const { state, setToast } = useTransactionToastProvider();
  useEffect(() => {
    if (state.toastInfo) {
      const clear = setTimeout(() => {
        setToast(undefined);
      }, 5000);
      return () => clearTimeout(clear);
    }
  }, [setToast, state.toastInfo]);
  const toastInfo = useOutBounce({ value: state.toastInfo, duration: 400 });
  return (
    <div
      data-state={state.toastInfo ? "open" : "closed"}
      className="fixed transition-all  z-[100] top-[74px] data-[state=closed]:translate-x-[120%] data-[state=open]:right-[34px] right-0"
    >
      <div className="bg-neutral-950 relative py-6 pl-4 pr-8 border-b-success-400 border-b-2 rounded-lg">
        <div className="absolute right-1 top-1">
          <button className="text-neutral-400">
            <X
              size={20}
              onClick={() => {
                setToast(undefined);
              }}
            />
          </button>
        </div>
        <div>
          <span>{toastInfo?.actionTitle}</span>
        </div>
        <div></div>
      </div>
    </div>
  );
}
