import api from "../../api/api";
import { AppDispatch } from "..";
import { childrenActions } from "./slice";
import { utilsActions } from "../utils/slice";

export const getFamilyChildren = (familyId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(`/families/${familyId}/children`);
      dispatch(
        childrenActions.setChildrenList({
          childrenList: response.data.data,
        })
      );
    } catch (err: any) {
      console.error("GET CHILDREN ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
};

export const getOneChild = (familyId: string, childId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(
        `/families/${familyId}/children/${childId}`
      );
      dispatch(
        childrenActions.setOneChildData({
          child: response.data.data,
        })
      );
    } catch (err: any) {
      console.error("GET ONE CHILD ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
};
