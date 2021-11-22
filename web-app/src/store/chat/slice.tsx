import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Chat } from "../../types";

interface AuthState {
  chats: Chat[];
}

const initialState: AuthState = {
  chats: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<{ chats: Chat[] }>) {
      state.chats = action.payload.chats;
    },
  },
});

export const chatsActions = chatsSlice.actions;

export default chatsSlice;
