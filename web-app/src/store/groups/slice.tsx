import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Family } from "../../types";

interface AuthState {
  groups: Family[];
}

const initialState: AuthState = {
  groups: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFamilies(state, action: PayloadAction<{ families: Family[] }>) {
      state.groups = action.payload.families;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
