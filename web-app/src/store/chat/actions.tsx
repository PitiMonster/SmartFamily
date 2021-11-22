import api from "../../api/api";
import { AppDispatch } from "..";
import { chatsActions } from "./slice";
import { utilsActions } from "../utils/slice";

export const getChats = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(
        "/chats?fields=name,readByMembers,photo,lastMessageDate&sort=-lastMessageDate"
      );
      console.log(response.data.data);
      dispatch(chatsActions.setChats({ chats: response.data.data }));
    } catch (err: any) {
      console.error("GET CHATS ERROR: ", err);
      dispatch(utilsActions.setAppError({ msg: err.response.data.message }));
    }
  };
};
