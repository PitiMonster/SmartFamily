import api from "../../api/api";
import { AppDispatch } from "..";
import { chatsActions } from "./slice";
import { utilsActions } from "../utils/slice";
import { runEmitter } from "../../utils/websockets";

export const getChats = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(
        "/chats?fields=name,readByMembers,photo,lastMessageDate&sort=-lastMessageDate"
      );
      dispatch(chatsActions.setChats({ chats: response.data.data }));
    } catch (err: any) {
      console.error("GET CHATS ERROR: ", err);
      dispatch(utilsActions.setAppError({ msg: err.response.data.message }));
    }
  };
};

export const getChatData = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get(`/chats/${id}`);
    const { messages, name, _id } = response.data.data;
    dispatch(
      chatsActions.setChatMessages({
        messages,
        name,
        id: _id,
      })
    );
  } catch (err: any) {
    console.error("GET ONE CHAT ERROR: ", err);
    dispatch(utilsActions.setAppError({ msg: err.response.data.message }));
  }
};

export const readChat = (id: string) => async (dispatch: AppDispatch) => {
  try {
    if (id) {
      await api.patch(`/chats/${id}/readChat`);
      dispatch(chatsActions.readChat({ id }));
    }
  } catch (err: any) {
    console.error("READ CHAT ERROR: ", err);
    dispatch(utilsActions.setAppError({ msg: err.response.data.message }));
  }
};

export const sendMessage = async (
  chatId: string,
  message: string
): Promise<void> => {
  try {
    runEmitter("send message", {
      chatId,
      message,
      authorId: localStorage.getItem("userId"),
    });
  } catch (err) {
    console.error("SEND MESSAGE ERROR: ", err);
  }
};

export const clearState = () => (dispatch: AppDispatch) => {
  dispatch(chatsActions.clearState({}));
};
