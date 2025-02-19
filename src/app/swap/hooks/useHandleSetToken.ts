import { useSwapProvider } from "../swapProvider";
import { useCallback } from "react";
import { TToken } from "@/lib/types";

export default function useHandleSetToken() {
  const { updateState, state } = useSwapProvider();

  const bothSelected = state.inToken && state.outToken;
  return useCallback(
    (token: TToken) => {
      if (state.inTokenModalOpen) {
        // inputOneModalOpen
        if (bothSelected) {
          updateState({ inToken: token, outToken: undefined });
        } else {
          updateState({ inToken: token });
        }
      }
      //inputTwoModalOpen
      if (state.outTokenModalOpen) {
        if (bothSelected) {
          updateState({ inToken: undefined, outToken: token });
        } else {
          updateState({ outToken: token });
        }
      }
    },
    [bothSelected, state, updateState]
  );
}
