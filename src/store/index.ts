import { atomWithStorage } from "jotai/utils";
import { createStore } from "jotai";

// Define your atoms
export const transactionDeadlineAtom = atomWithStorage(
  "transactionDeadline",
  10
);
export const slippageAtom = atomWithStorage("slippage", 10);
export const multiHopsAtom = atomWithStorage("multiHops", false);
export const settingDialogOpenAtom = atomWithStorage("dialogOpen", false);
export const store = createStore();
