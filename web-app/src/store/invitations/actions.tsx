import api from "../../api/api";
import { AppDispatch } from "..";
import { invitationsActions } from "./slice";
import { utilsActions } from "../utils/slice";

export const getInvitations = async (dispatch: AppDispatch) => {
  try {
    const response = await api.get("/invitations/");
    console.log(response, "invitations");

    dispatch(
      invitationsActions.setInvitations({
        invitations: response.data.data,
      })
    );
  } catch (err: any) {
    console.error("GET INVITATIONS ERROR: ", err);
    dispatch(
      utilsActions.setAppError({
        msg: err?.response?.data?.message ?? "Server error",
      })
    );
  }
};

export const createGroupInvitation =
  (family: string, receiverUsername: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.post("/invitations/", {
        family,
        receiverUsername,
      });
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
    } catch (err: any) {
      console.error("CREATE INVITATION ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };

export const answerGroupInvitation =
  (invId: string, invResponse: "accept" | "reject") =>
  async (dispatch: AppDispatch) => {
    console.log("simea");
    try {
      const response = await api.post(`/invitations/${invId}/${invResponse}`);
      console.log("okej");
      dispatch(utilsActions.setRequestStatus({ status: response.data.status }));
      dispatch(invitationsActions.removeInvitation({ invId }));
    } catch (err: any) {
      console.error("ANSWER INVITATION ERROR: ", err);
      dispatch(
        utilsActions.setAppError({
          msg: err?.response?.data?.message ?? "Server error",
        })
      );
    }
  };
