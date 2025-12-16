import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { addCall, deleteCall, fetchContacts } from "./operations";

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
      console.log(action.payload);
      callsAdapter.setAll(state, action.payload?.calls ?? []);
    });
    builder
      .addCase(addCall.fulfilled, (state, action) => {
        console.log("calls", action.payload);
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
