import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../selectors";
import { selectContacts } from "./contactsSlice";
export const selectContactsIsLoading = (state) => state.contacts.isLoading;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) =>
    contacts.filter((elem) =>
      elem.name.toLowerCase().includes(filter.toLowerCase())
    )
);
