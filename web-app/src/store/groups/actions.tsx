import api from "../../api/api";
import { AppDispatch } from "..";
import { groupsActions } from "./slice";
import { chatsActions } from "../chat/slice";
import { utilsActions } from "../utils/slice";
import countUnreadMessages from "../../utils/countUnreadMessages";

export const getGroups = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get("/families/");
      dispatch(
        groupsActions.setFamilies({ families: response.data.data.families })
      );
      countUnreadMessages(response.data.data.chats);
    } catch (err: any) {
      console.error("GET GROUPS ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
};

export const createGroup =
  (name: string, photo: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.post("/families/", { name, photo });
      dispatch(groupsActions.addFamily({ family: response.data.data }));
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("CREATE GROUP ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
