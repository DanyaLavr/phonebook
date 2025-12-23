import { createSelector } from "@reduxjs/toolkit";
import { selectCallsEntities } from "./callsSlice";

export const makeSelectCallsForContact = (callsIds) =>
  createSelector([selectCallsEntities, (_, id) => id], (enteties, id) => {
    return callsIds?.map((id) => enteties[id]);
  });
