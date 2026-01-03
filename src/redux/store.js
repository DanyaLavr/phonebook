import { configureStore } from "@reduxjs/toolkit";

import { contactsReducer } from "./contacts/contactsSlice";
import { filtersReducer } from "./filtersSlice";
import { callsReducer } from "./calls/callsSlice";
import { userReducer } from "./user/userSlice";
import { notifiactionsReducer } from "./notifications/notificationsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer,
    calls: callsReducer,
    filters: filtersReducer,
    notifications: notifiactionsReducer,
  },
});
