import { createSlice } from "@reduxjs/toolkit";
import { FILTERS } from "./constants";

const filtersSlice = createSlice({
  name: "filters",
  initialState: FILTERS,
  reducers: {
    setFilter: {
      reducer(state, action) {
        state.filter = action.payload;
      },
    },
  },
});
export const { setFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
