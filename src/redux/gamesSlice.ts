import { createSlice } from "@reduxjs/toolkit";

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: [],
    filters: {
      provider: "",
      currency: "",
    },
    sortBy: "",
    gameData: [],
  },
  reducers: {
    setProviderFilter: (state, action) => {
      state.filters.provider = action.payload;
    },
    setCurrencyFilter: (state, action) => {
      state.filters.currency = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    updateGamesList: (state, action) => {
      state.games = action.payload;
    },
  },
});

export const {
  setProviderFilter,
  setCurrencyFilter,
  setSortBy,
  updateGamesList,
} = gamesSlice.actions;

export default gamesSlice.reducer;
