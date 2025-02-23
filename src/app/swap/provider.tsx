"use client";
import { useToRawAmount } from "@/lib/liquidityHub/hooks";
import { TToken } from "@/lib/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useAccount } from "wagmi";

interface SwapProviderType {
  inputAmount: number;
  // acceptedQuote: Quote | undefined;
  signature?: string;
  liquidityHubDisabled: boolean;
  acceptedOptimalRate: undefined;
  confirmationModalOpen: false;
  proceedWithLiquidityHub: false;
  forceLiquidityHub: false;
  slippage: number;
  inToken: TToken | null;
  outToken: TToken | null;
  outTokenModalOpen: boolean;
  inTokenModalOpen: boolean;
  inTokenSelected: boolean;
  outTokenSelected: boolean;
  inTokenAmount: string;
  outTokenAmount: string;
}

const initialState: SwapProviderType = {
  inTokenAmount: "",
  outTokenAmount: "",
  inTokenSelected: true,
  outTokenSelected: false,
  outTokenModalOpen: false,
  inTokenModalOpen: false,
  inToken: null,
  outToken: null,
  inputAmount: "",
  // acceptedQuote: undefined,
  acceptedOptimalRate: undefined,
  liquidityHubDisabled: false,
  confirmationModalOpen: false,
  proceedWithLiquidityHub: false,
  forceLiquidityHub: false,
  slippage: 0.5,
};
interface ContextType {
  state: SwapProviderType;
  updateState: (payload: Partial<SwapProviderType>) => void;
  resetState: () => void;
  // sdk: LiquidityHubSDK;
  parsedInputAmount?: string;
}
const SwapContext = createContext<ContextType | undefined>(undefined);
interface Props {
  children: React.ReactNode;
}

type Action =
  | { type: "UPDATE"; payload: Partial<SwapProviderType> }
  | { type: "RESET" };
const reducer = (state: SwapProviderType, action: Action): SwapProviderType => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const SwapProvider = ({ children }: Props) => {
  const [_state, dispatch] = useReducer(reducer, initialState);

  const chainId = useAccount().chainId;
  const state = useMemo(() => {
    return {
      ..._state,
      inToken: _state.inToken || null,
      outToken: _state.outToken || null,
    };
  }, [_state]);

  const parsedInputAmount = useToRawAmount(
    state.inputAmount,
    state.inToken?.decimals
  );

  const updateState = useCallback(
    (payload: Partial<SwapProviderType>) => {
      dispatch({ type: "UPDATE", payload });
    },
    [dispatch]
  );

  const resetState = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  useEffect(() => {
    if (chainId) {
      resetState();
    }
  }, [chainId, resetState]);

  // const sdk = useMemo(
  //   () => constructSDK({ partner: "widget", chainId }),
  //   [chainId]
  // );
  return (
    <SwapContext.Provider
      value={{ state: _state, resetState, updateState, parsedInputAmount }}
    >
      {children}
    </SwapContext.Provider>
  );
};

// Custom hook to use the context
export const useSwapProvider = () => {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error("useSwapProvider must be used within a SwapProvider");
  }
  return context;
};
