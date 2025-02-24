import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import settingsReducer from "./slices/settings";

const persistConfig = {
  key: "root",
  storage,
};

const persistedSettingsReducer = persistReducer(persistConfig, settingsReducer);

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    settings: persistedSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
