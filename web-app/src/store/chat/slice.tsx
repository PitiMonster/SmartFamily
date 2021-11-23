import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Chat, Message } from "../../types";
import { addUnreadMessage } from "../../utils/countUnreadMessages";

interface ChatState {
  chats: Chat[];
  messages: Message[];
  name: string;
  openedChatId: string;
}

const initialState: ChatState = {
  chats: [],
  messages: [],
  name: "",
  openedChatId: "",
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<{ chats: Chat[] }>) {
      state.chats = action.payload.chats;
    },
    setChatMessages(
      state,
      action: PayloadAction<{ messages: Message[]; name: string; id: string }>
    ) {
      const { messages, name, id } = action.payload;
      state.messages = messages.reverse();
      state.name = name;
      state.openedChatId = id;
    },
    readChat(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const newChats = [...state.chats];
      for (const chat of newChats) {
        if (chat._id === id) {
          localStorage.getItem("userId") &&
            !chat.readByMembers.includes(
              localStorage.getItem("userId") as string
            ) &&
            chat.readByMembers.push(localStorage.getItem("userId") as string);
          break;
        }
      }
      state.chats = newChats;
    },
    addNewMessage(
      state,
      action: PayloadAction<{ message: Message; chatId: string }>
    ) {
      const { message, chatId } = action.payload;
      if (chatId === state.openedChatId) {
        state.messages = [message, ...state.messages];
      }
      let newChats = [...state.chats];
      let messagedChat: any = null;
      newChats = newChats.filter((chat) => {
        if (chat._id === chatId) {
          chat.lastMessageDate = new Date(Date.now());
          messagedChat = chat;
          messagedChat.lastMessageDate = Date.now();
          if (chatId !== state.openedChatId) {
            messagedChat.readByMembers = [];
            addUnreadMessage(chatId);
          }
          return false;
        } else return true;
      });

      if (messagedChat) state.chats = [messagedChat as Chat, ...newChats];
    },
    clearState(state, action) {
      state.messages = [];
      state.openedChatId = "";
      state.name = "";
    },
  },
});

export const chatsActions = chatsSlice.actions;

export default chatsSlice;
