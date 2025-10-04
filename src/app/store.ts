import { configureStore } from "@reduxjs/toolkit";
import profile from "../reducers/profile";
import search from "../reducers/searchSlice";

export const store = configureStore({
  reducer: {
    profile: profile,
    search: search,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
