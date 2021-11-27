import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Invitation, User } from "../../types";

interface UserState {
  loggedInUser?: User;
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser(state, action: PayloadAction<{ user: User }>) {
      state.loggedInUser = action.payload.user;
    },
    removeInvitation(state, action: PayloadAction<{ invitationId: string }>) {
      let currentUserInvitations = state.loggedInUser?.invitations;
      console.log(currentUserInvitations);
      console.log("siema zaczynamy");
      if (currentUserInvitations) {
        const { invitationId } = action.payload;
        console.log(invitationId);
        currentUserInvitations.filter((item) => {
          console.log(item);
          if (
            item === invitationId ||
            (item as Invitation)?._id === invitationId
          )
            return false;
          else return true;
        });
        state.loggedInUser!.invitations = currentUserInvitations;
      }
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
