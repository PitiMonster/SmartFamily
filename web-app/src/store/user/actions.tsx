import api from "../../api/api";
import { AppDispatch } from "..";
import { userActions } from "./slice";
import { utilsActions } from "../utils/slice";

export const getCurrentUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get("/users/me");
      dispatch(userActions.setLoggedInUser({ user: response.data.data }));
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
