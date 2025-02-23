import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SettingsType {
  slippage: number;
  transactionDeadlineInMinutes: number;
  liquidityHubEnabled: boolean;
  multihopsEnabled: boolean;
}

const initialState: SettingsType = {
  transactionDeadlineInMinutes: 10,
  slippage: 0.1,
  liquidityHubEnabled: false,
  multihopsEnabled: false,
};

const settingsSlice = createSlice({
  name: "__SETTINGS__",
  initialState,
  reducers: {
    updateSlippage: (state, action: PayloadAction<number>) => {
      state.slippage = action.payload;
    },
    updateTransactionDeadline: (state, action: PayloadAction<number>) => {
      state.transactionDeadlineInMinutes = action.payload;
    },
    switchLiquidityHub: (state) => {
      state.liquidityHubEnabled = !state.liquidityHubEnabled;
    },
    switchMultihopsOptions: (state) => {
      state.multihopsEnabled = !state.multihopsEnabled;
    },
  },
});

export const { updateSlippage, updateTransactionDeadline, switchLiquidityHub } =
  settingsSlice.actions;
export default settingsSlice.reducer;
