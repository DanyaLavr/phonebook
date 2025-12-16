import { configureStore } from "@reduxjs/toolkit";

import { contactsReducer } from "./contactsSlice";
import { filtersReducer } from "./filtersSlice";
import { callsReducer } from "./callsSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    calls: callsReducer,
    filters: filtersReducer,
  },
});
