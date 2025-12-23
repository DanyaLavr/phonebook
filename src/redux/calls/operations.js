import { createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { useStorage } from "../../hooks/useStorage";
import { normalize } from "normalizr";
import axios from "axios";
import { contactsEntity } from "../schemas";

axios.defaults.baseURL = "https://6707785ca0e04071d22a73ed.mockapi.io";

const [getContacts, setContacts] = useStorage();
const fetchContact = async (id) => {
  const res = await axios.get(`/contacts/${id}`);
  return res.data;
};
export const addCall = createAsyncThunk(
  "calls/addCall",
  async (id, { rejectWithValue, getState }) => {
    try {
      const callId = nanoid();
      const newCall = {
        id: callId,
        time: Date.now(),
      };
      const user = getState().user.user;
      if (!user) {
        const contacts = getContacts();
        const contact = contacts.find((elem) => elem.id === id);
        contact.calls.push(newCall);
        contacts.splice(
          contacts.findIndex((elem) => elem.id === id),
          1,
          contact
        );
        setContacts(contacts);
        const normalized = normalize(contact, contactsEntity);
        return {
          contact: normalized.entities.contacts
            ? normalized.entities.contacts[id]
            : null,
          calls: normalized.entities.calls ?? [],
        };
      }

      const contact = await fetchContact(id);

      const updatedContact = await axios.put(`/contacts/${id}`, {
        calls: [...contact.calls, newCall],
      });
      const normalized = normalize(updatedContact.data, contactsEntity);

      return {
        contact: normalized.entities.contacts
          ? normalized.entities.contacts[id]
          : null,
        calls: normalized.entities.calls ?? [],
      };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteCall = createAsyncThunk(
  "calls/deleteCall",
  async ({ contactId, callId }, { rejectWithValue, getState }) => {
    try {
      const user = getState().user.user;
      if (!user) {
        const contacts = getContacts();
        const contact = contacts.find((elem) => elem.id === contactId);
        contact.calls.splice(
          contact.calls.findIndex((elem) => elem.id === callId),
          1
        );
        contacts.splice(
          contacts.findIndex((elem) => elem.id === contactId),
          1,
          contact
        );
        setContacts(contacts);
        const normalized = normalize(contact, contactsEntity);
        return {
          contact: normalized.entities.contacts
            ? normalized.entities.contacts[contactId]
            : null,
          calls: normalized.entities.calls ?? [],
        };
      }

      const contact = await fetchContact(contactId);

      const updatedContact = await axios.put(`/contacts/${contactId}`, {
        calls: contact?.calls?.filter((elem) => elem.id !== callId),
      });
      const normalized = normalize(updatedContact.data, contactsEntity);
      return {
        contact: normalized.entities.contacts
          ? normalized.entities.contacts[contactId]
          : null,
        calls: normalized.entities.calls ?? [],
      };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
