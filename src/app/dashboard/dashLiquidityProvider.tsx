"use client";
import React, { createContext, useContext } from "react";

export enum LiquidityActions {
  Stake,
  Unstake,
  Withdraw,
}

interface StateType {
  actionType: LiquidityActions | undefined;
  dialogOpen: boolean;
}
interface ContextType {
  updateState: (payload: Partial<StateType>) => void;
  state: StateType;
  openModal: (actionType: LiquidityActions) => void;
}
const LiquidityContext = createContext<ContextType | undefined>(undefined);
interface Props {
  children: React.ReactNode;
}

export const DashboardLiquidityProvider = ({ children }: Props) => {
  const [state, setState] = React.useState<StateType>({
    actionType: undefined,
    dialogOpen: false,
  });
  const updateState = (payload: Partial<StateType>) => {
    setState((prevState) => ({ ...prevState, ...payload }));
  };
  const openModal = (actionType: LiquidityActions) => {
    setState({ actionType, dialogOpen: true });
  };
  return (
    <LiquidityContext.Provider value={{ state, openModal, updateState }}>
      {" "}
      {children}
    </LiquidityContext.Provider>
  );
};

// Custom hook to use the context
export const useDashboardLiquidityProvider = () => {
  const context = useContext(LiquidityContext);
  if (!context) {
    throw new Error(
      "useDashboardLiquidityProvider must be used within a MyProvider"
    );
  }
  return context;
};
