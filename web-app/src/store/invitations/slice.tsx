import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Invitation as InvitationType } from "../../types";

interface InvitationsState {
  invitations: InvitationType[];
}

const initialState: InvitationsState = {
  invitations: [],
};

const invitationsSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    setInvitations(
      state,
      action: PayloadAction<{ invitations: InvitationType[] }>
    ) {
      console.log(action.payload.invitations, "xd");
      state.invitations = action.payload.invitations.reverse();
    },
    addInvitation(
      state,
      action: PayloadAction<{ invitation: InvitationType }>
    ) {
      state.invitations = [action.payload.invitation, ...state.invitations];
    },
    removeInvitation(state, action: PayloadAction<{ invId: string }>) {
      const { invId } = action.payload;
      state.invitations = [
        ...state.invitations.filter((item) => item._id !== invId),
      ];
    },
  },
});

export const invitationsActions = invitationsSlice.actions;

export default invitationsSlice;
