"use client";
import {
  UserLiquidityPosition,
  UserLiquidityPositions,
} from "@/server/queries/user";
import { api } from "@/trpc/react";
import React, { createContext, useContext, useMemo } from "react";
import { useAccount } from "wagmi";

export enum LiquidityActions {
  Unselected,
  Stake,
  Unstake,
  Withdraw,
}

interface StateType {
  actionType: LiquidityActions | undefined;
  dialogOpen: boolean;
  sliderValue: number;
  positionId: string | undefined;
}
interface ContextType {
  updateState: (payload: Partial<StateType>) => void;
  state: StateType;
  openModal: (actionType: LiquidityActions, positionId: string) => void;
  userLiquidityPositions: UserLiquidityPositions | undefined;
  selectedUserLiquidityPosition: UserLiquidityPosition | undefined;
}
const LiquidityContext = createContext<ContextType | undefined>(undefined);
interface Props {
  children: React.ReactNode;
}

export const DashboardLiquidityProvider = ({ children }: Props) => {
  const [state, setState] = React.useState<StateType>({
    actionType: undefined,
    dialogOpen: false,
    positionId: undefined,
    sliderValue: 0,
  });

  const { address } = useAccount();
  const { data } = api.user.getLiquidityPositions.useQuery(
    { userAddress: address ?? "0x" },
    { enabled: !!address }
  );
  const updateState = (payload: Partial<StateType>) => {
    setState((prevState) => ({ ...prevState, ...payload }));
  };
  const openModal = (actionType: LiquidityActions, positionId: string) => {
    setState({ ...state, actionType, dialogOpen: true, positionId });
  };

  const position = useMemo(() => {
    return data?.user?.liquidityPositions.find(
      (pos) => pos.id === state.positionId
    );
  }, [data?.user?.liquidityPositions, state.positionId]);
  return (
    <LiquidityContext.Provider
      value={{
        state,
        selectedUserLiquidityPosition: position,
        userLiquidityPositions: data,
        openModal,
        updateState,
      }}
    >
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
