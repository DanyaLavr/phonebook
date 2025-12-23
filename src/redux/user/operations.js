import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../lib/firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { clearContacts } from "../contacts/contactsSlice";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      dispatch(clearContacts());
      return {
        name: user.user.displayName,
      };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, { displayName: name });
      dispatch(clearContacts());
      return {
        name: user.user.displayName,
      };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await signOut(auth);
      dispatch(clearContacts());
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
