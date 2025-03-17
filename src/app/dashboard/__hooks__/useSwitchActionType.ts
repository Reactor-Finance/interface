import { LiquidityActions } from "../types";

/**
 * @param stake - The stake data
 * @param unstake - The unstake data
 * @param withdraw - The withdraw data
 * This hook is used a switch statement wrapper for action type
 * pass in data you want to return based on the action type
 */
export default function useSwitchActionType<T>(
  stake: T,
  unstake: T,
  withdraw: T,
  actionType: LiquidityActions
) {
  switch (actionType) {
    case LiquidityActions.Stake: {
      return stake;
    }
    case LiquidityActions.Unstake: {
      return unstake;
    }
    case LiquidityActions.Withdraw: {
      return withdraw;
    }
  }
}
