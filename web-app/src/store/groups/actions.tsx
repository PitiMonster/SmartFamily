import api from "../../api/api";
import { AppDispatch } from "..";
import { groupsActions } from "./slice";
import { utilsActions } from "../utils/slice";

export const getGroups = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get("/families/");
      dispatch(groupsActions.setFamilies({ families: response.data.data }));
    } catch (err: any) {
      console.error("GET GROUPS ERROR: ", err);
      dispatch(utilsActions.setAppError({ msg: err.response.data.message }));
    }
  };
};
