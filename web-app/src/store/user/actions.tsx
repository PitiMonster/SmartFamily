import api from "../../api/api";
import { AppDispatch } from "..";
import { userActions } from "./slice";
import { notificationsActions } from "../notifications/slice";
import { invitationsActions } from "../invitations/slice";
import { utilsActions } from "../utils/slice";

export const getCurrentUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.get("/users/me");
      const user = response.data.data;
      dispatch(userActions.setLoggedInUser({ user }));
      //   console.log("user", user);
      //   dispatch(
      //     notificationsActions.setNotifications({
      //       notifications: user.notifications,
      //     })
      //   );
      //   dispatch(
      //     invitationsActions.setInvitations({ invitations: user.invitations })
      //   );
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
