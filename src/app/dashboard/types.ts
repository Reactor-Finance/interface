import { ButtonState } from "@/components/shared/submitBtn";
import { useGetPairs } from "@/lib/hooks/useGetPairs";
import { SimulateContractReturnType } from "@wagmi/core";

export type FormAction = {
  onSubmit: () => void;
  errorMessage: string | null;
  isValid: boolean;
  buttonProps: {
    state: ButtonState;
    approveTokenSymbol?: string;
  };
};

export enum LiquidityActions {
  Stake,
  Unstake,
  Withdraw,
}

export type SimulateReturnType =
  | SimulateContractReturnType["request"]
  | undefined;
type ElementType<T extends readonly object[]> = T[number];
export type TPair = ElementType<ReturnType<typeof useGetPairs>>;
export interface StateType {
  actionType: LiquidityActions;
  dialogOpen: boolean;
}
