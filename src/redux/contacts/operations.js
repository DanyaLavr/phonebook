import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { normalize } from "normalizr";
import { contactsEntity } from "../schemas";
import { nanoid } from "nanoid";
import { useStorage } from "../../hooks/useStorage";
axios.defaults.baseURL = "https://6707785ca0e04071d22a73ed.mockapi.io";

const normalizeContacts = (contacts) => {
  const normalise = normalize(contacts, [contactsEntity]);
  const contactsMap = normalise.entities.contacts ?? [];
  const callsMap = normalise.entities.calls ?? [];
  const contactsArr = normalise.result.map((id) => contactsMap[id]);
  const callsArr = Object.values(callsMap);
  return {
    contacts: contactsArr,
    calls: callsArr,
  };
};
const [getContacts, setContacts] = useStorage();

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAllContacts",
  async (_, { rejectWithValue, getState }) => {
    try {
      const user = getState().user.user;
      if (!user) {
        const contacts = getContacts();

        return normalizeContacts(contacts);
      }
      const res = await axios.get("/contacts");
      return normalizeContacts(res.data);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, { rejectWithValue, getState }) => {
    try {
      const user = getState().user.user;
      if (!user) {
        const id = nanoid();
        contact = { ...contact, calls: [], id };
        const contacts = getContacts();
        contacts.push(contact);
        setContacts(contacts);
        return contact;
      }
      const res = await axios.post("/contacts", contact);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, { rejectWithValue, getState }) => {
    try {
      const user = getState().user.user;
      if (!user) {
        const contacts = getContacts();
        const deletedContact = contacts.splice(
          contacts.findIndex((elem) => elem.id === id),
          1
        );

        setContacts(contacts);
        return deletedContact[0];
      }
      const res = await axios.delete(`/contacts/${id}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
