import { configureStore } from "@reduxjs/toolkit";
import profile from "../reducers/profile";

export const store = configureStore({
  reducer: {
    profile: profile,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
