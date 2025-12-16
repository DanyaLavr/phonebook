import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "./contactsSlice";
import { selectCallsEntities } from "./callsSlice";

export const selectFilter = (state) => state.filters.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) =>
    contacts.filter((elem) =>
      elem.name.toLowerCase().includes(filter.toLowerCase())
    )
);

export const makeSelectCallsForContact = (callsIds) =>
  createSelector([selectCallsEntities, (_, id) => id], (enteties, id) => {
    return callsIds?.map((id) => enteties[id]);
  });
