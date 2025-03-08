"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Address } from "viem";
import {
  useWaitForTransactionReceipt,
  UseWaitForTransactionReceiptReturnType,
} from "wagmi";

interface State {
  hash: Address | undefined;
  actionTitle: string | undefined;
  actionDescription: string | undefined;
  open: boolean;
}

const initialState: State = {
  hash: undefined,
  actionTitle: undefined,
  actionDescription: undefined,
  open: false,
};

interface ContextType {
  state: State;
  testToast: () => void;
  updateState: (payload: Partial<State>) => void;
  resetState: () => void;
  txReceipt: UseWaitForTransactionReceiptReturnType;
  parsedInputAmount?: string;
}

const TransactionToastContext = createContext<ContextType | undefined>(
  undefined
);
interface Props {
  children: React.ReactNode;
}

export const TransactionToastProvider = ({ children }: Props) => {
  const [state, setState] = useState(initialState);
  const txReceipt = useWaitForTransactionReceipt({ hash: state.hash });
  const updateState = useCallback(
    (payload: Partial<State>) => {
      setState((prevState) => ({ ...prevState, ...payload }));
    },
    [setState]
  );
  useEffect(() => {
    if (txReceipt.isLoading) {
      updateState({ open: false });
    }
  }, [txReceipt.isLoading, updateState]);
  useEffect(() => {
    if (txReceipt.isSuccess) {
      updateState({ open: true });
    }
  }, [txReceipt.isSuccess, updateState]);
  const resetState = useCallback(() => {
    setState(initialState);
  }, [setState]);

  function testToast() {}
  return (
    <TransactionToastContext.Provider
      value={{
        updateState,
        testToast,
        state,
        resetState,
        txReceipt,
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
