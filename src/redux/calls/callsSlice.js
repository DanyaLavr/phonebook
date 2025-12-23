import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { addCall, deleteCall } from "./operations";
import { fetchContacts } from "../contacts/operations";

const callsAdapter = createEntityAdapter();
const initialState = callsAdapter.getInitialState({
  isLoading: true,
  error: null,
});
const callsSlice = createSlice({
  name: "calls",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      callsAdapter.setAll(state, action.payload?.calls ?? []);
    });
    builder
      .addCase(addCall.fulfilled, (state, action) => {
        callsAdapter.upsertMany(state, action.payload?.calls ?? []);
      })
      .addCase(deleteCall.fulfilled, (state, action) => {
        callsAdapter.upsertMany(state, action.payload?.calls ?? []);
      });
  },
});
export const { selectEntities: selectCallsEntities } =
  callsAdapter.getSelectors((state) => state.calls);
export const callsReducer = callsSlice.reducer;
