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
}

const initialState: State = {
  hash: undefined,
  actionTitle: undefined,
  actionDescription: undefined,
};
interface ContextType {
  state: State;
  testToast: () => void;
  updateState: (payload: Partial<State>) => void;
  resetState: () => void;
  txReceipt: UseWaitForTransactionReceiptReturnType;
  parsedInputAmount?: string;
  setToastState: React.Dispatch<
    React.SetStateAction<
      | {
          actionTitle: string | undefined;
          actionDescription: string | undefined;
        }
      | undefined
    >
  >;
  toastState:
    | undefined
    | {
        actionTitle: string | undefined;
        actionDescription: string | undefined;
      };
}
const TransactionToastContext = createContext<ContextType | undefined>(
  undefined
);
interface Props {
  children: React.ReactNode;
}

export const TransactionToastProvider = ({ children }: Props) => {
  const [state, setState] = useState(initialState);
  const [toastState, setToastState] = useState<
    | undefined
    | { actionTitle: string | undefined; actionDescription: string | undefined }
  >();
  const txReceipt = useWaitForTransactionReceipt({ hash: state.hash });
  const updateState = useCallback(
    (payload: Partial<State>) => {
      setState((prevState) => ({ ...prevState, ...payload }));
    },
    [setState]
  );
  useEffect(() => {
    if (txReceipt.isSuccess) {
      setToastState({
        actionTitle: state.actionTitle,
        actionDescription: state.actionDescription,
      });
    }
  }, [state.actionDescription, state.actionTitle, txReceipt.isSuccess]);
  useEffect(() => {
    if (toastState) {
      const timeout = setTimeout(() => {
        setToastState(undefined);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [, toastState, updateState]);
  const resetState = useCallback(() => {
    setState(initialState);
  }, [setState]);

  function testToast() {
    setToastState({ actionTitle: "Test", actionDescription: undefined });
  }
  console.log({ state }, "----====----");
  return (
    <TransactionToastContext.Provider
      value={{
        updateState,
        toastState,
        setToastState,
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
