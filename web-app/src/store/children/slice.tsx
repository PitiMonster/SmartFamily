import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../types";

interface ChildrenState {
  childrenList: User[];
  selectedChild: User | null;
}

const initialState: ChildrenState = {
  childrenList: [],
  selectedChild: null,
};

const childrenSlice = createSlice({
  name: "children",
  initialState,
  reducers: {
    setChildrenList(state, action: PayloadAction<{ childrenList: User[] }>) {
      state.childrenList = action.payload.childrenList;
    },
    setOneChildData(state, action: PayloadAction<{ child: User }>) {
      state.selectedChild = action.payload.child;
    },
  },
});

export const childrenActions = childrenSlice.actions;

export default childrenSlice;
