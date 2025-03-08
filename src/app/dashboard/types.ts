import { ButtonState } from "@/components/shared/submitBtn";
import { useGetPairs } from "@/lib/hooks/useGetPairs";

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

type ElementType<T extends readonly object[]> = T[number];
export type TPair = ElementType<ReturnType<typeof useGetPairs>>;
export interface StateType {
  actionType: LiquidityActions;
  dialogOpen: boolean;
}
