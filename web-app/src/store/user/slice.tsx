import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../types";

interface UserState {
  loggedInUser?: User;
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser(state, action: PayloadAction<{ user: User }>) {
      state.loggedInUser = action.payload.user;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
