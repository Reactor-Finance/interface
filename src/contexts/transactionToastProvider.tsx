"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import { Address } from "viem";
type Toast = {
  hash: Address | undefined;
  actionTitle: string | undefined;
  actionDescription: string | undefined;
};
interface State {
  toastInfo:
    | {
        hash: Address | undefined;
        actionTitle: string | undefined;
        actionDescription: string | undefined;
      }
    | undefined;
}

const initialState: State = {
  toastInfo: undefined,
};
interface ContextType {
  state: State;
  setToast: (toast: Toast | undefined) => void;
}
const TransactionToastContext = createContext<ContextType | undefined>(
  undefined
);
interface Props {
  children: React.ReactNode;
}

export const TransactionToastProvider = ({ children }: Props) => {
  const [state, setState] = useState(initialState);
  const setToast = useCallback((toast: Toast | undefined) => {
    setState((prev) => ({ ...prev, toastInfo: toast }));
  }, []);
  return (
    <TransactionToastContext.Provider
      value={{
        state,
        setToast,
      }}
    >
      {children}
    </TransactionToastContext.Provider>
  );
};

// Custom hook to use the context
export const useTransactionToastProvider = () => {
  const context = useContext(TransactionToastContext);
  if (!context) {
    throw new Error(
      "useTransactionToastProvider must be used within a TransactionToastProvider"
    );
  }
  return context;
};
