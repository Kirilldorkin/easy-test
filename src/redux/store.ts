import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";

const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
