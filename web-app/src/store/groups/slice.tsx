import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Family } from "../../types";

interface AuthState {
  groups: Family[];
}

const initialState: AuthState = {
  groups: [],
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setFamilies(state, action: PayloadAction<{ families: Family[] }>) {
      state.groups = action.payload.families;
    },
    addFamily(state, action: PayloadAction<{ family: Family }>) {
      state.groups = [...state.groups, action.payload.family];
    },
  },
});

export const groupsActions = groupsSlice.actions;

export default groupsSlice;
