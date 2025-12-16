import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { normalize } from "normalizr";
import { contactsEntity } from "./schemas";
import { nanoid } from "nanoid";
axios.defaults.baseURL = "https://6707785ca0e04071d22a73ed.mockapi.io";
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAllContacts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/contacts");
      const normalise = normalize(res.data, [contactsEntity]);
      const contactsMap = normalise.entities.contacts ?? [];
      const callsMap = normalise.entities.calls ?? [];
      const contactsArr = normalise.result.map((id) => contactsMap[id]);
      const callsArr = Object.values(callsMap);
      return {
        contacts: contactsArr,
        calls: callsArr,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const res = await axios.post("/contacts", contact);
      console.log(res);
      console.log(contact);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/contacts/${id}`);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addCall = createAsyncThunk(
  "calls/addCall",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/contacts/${id}`);
      const contact = res.data;
      const callId = nanoid();
      const newCall = {
        id: callId,
        time: Date.now(),
      };
      const updatedContact = await axios.put(`/contacts/${id}`, {
        calls: [...contact.calls, newCall],
      });
      const normalized = normalize(updatedContact.data, contactsEntity);
      console.log("normalized", normalized);
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
  async ({ contactId, callId }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/contacts/${contactId}`);
      const contact = res.data;

      const updatedContact = await axios.put(`/contacts/${contactId}`, {
        calls: contact?.calls?.filter((elem) => elem.id !== callId),
      });
      const normalized = normalize(updatedContact.data, contactsEntity);
      console.log({
        contact: normalized.entities.contacts
          ? normalized.entities.contacts[contactId]
          : null,
        calls: normalized.entities.calls ?? [],
      });
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
