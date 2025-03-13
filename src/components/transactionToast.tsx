"use client";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import useOutBounce from "@/lib/hooks/useOutBounce";
import { Check, ExternalLink, X } from "lucide-react";
import Link from "next/link";
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
      className="fixed transition-all w-[350px]  z-[100] top-[74px] data-[state=closed]:translate-x-[120%] data-[state=open]:right-[34px] right-0"
    >
      <div className="bg-neutral-950   space-y-1 overflow-hidden shadow-lg relative py-3 pl-4 pr-8 border-b-success-400 border-b-2 rounded-lg">
        <div className="absolute h-full left-0 top-0 w-24 bg-opacity-50 bg-gradient-to-r from-success-400/15 to-success-400/0"></div>
        <div className="absolute right-1 top-1 z-10">
          <button className="text-neutral-400">
            <X
              size={20}
              onClick={() => {
                setToast(undefined);
              }}
            />
          </button>
        </div>
        <div className="flex items-center gap-x-2 z-10">
          <div className="h-8 w-8 bg-neutral-1000 rounded-full flex justify-center items-center">
            <div className="h-5 w-5 flex justify-center items-center rounded-full bg-success-400 ">
              <Check size={18} className="text-neutral-1000" />
            </div>
          </div>
          <span className="font-medium">{toastInfo?.actionTitle}</span>
        </div>
        <Link
          href={`https://testnet.monadexplorer.com/tx/${state.toastInfo?.hash}`}
          className="flex gap-x-1 text-[11px] text-success-400 z-10"
        >
          <div className="flex gap-x-2 items-center text-sm">
            <span>View in block explorer</span>
            <ExternalLink size={18} />
          </div>
        </Link>
      </div>
    </div>
  );
}
