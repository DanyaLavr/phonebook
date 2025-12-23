import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { addContact, deleteContact, fetchContacts } from "./operations";
import { addCall, deleteCall } from "../calls/operations";

const contactsAdapter = createEntityAdapter();
const initialState = contactsAdapter.getInitialState({
  isLoading: false,
  error: null,
});
const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    clearContacts: (state) => {
      contactsAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        contactsAdapter.setAll(state, action.payload?.contacts ?? []);
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        contactsAdapter.addOne(state, action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        contactsAdapter.removeOne(state, action.payload.id);
      })
      .addCase(addCall.fulfilled, (state, action) => {
        state.isLoading = false;
        contactsAdapter.upsertOne(state, action.payload.contact);
      })
      .addCase(deleteCall.fulfilled, (state, action) => {
        contactsAdapter.upsertOne(state, action.payload.contact);
      });
  },
});
export const { selectAll: selectContacts } = contactsAdapter.getSelectors(
  (state) => state.contacts
);
export const contactsReducer = contactsSlice.reducer;
export const { clearContacts } = contactsSlice.actions;
