import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./operations";
const initialState = {
  user: null,
  isLoading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, () => initialState)
      .addMatcher(isPending(loginUser, registerUser), (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isFulfilled(loginUser, registerUser), (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isRejected(loginUser, registerUser), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const userReducer = userSlice.reducer;
