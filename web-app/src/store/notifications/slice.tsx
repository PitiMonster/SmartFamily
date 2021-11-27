import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Notification as NotificationType } from "../../types";

interface NotificationsState {
  notifications: NotificationType[];
}

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(
      state,
      action: PayloadAction<{ notifications: NotificationType[] }>
    ) {
      state.notifications = action.payload.notifications;
    },
    addNotification(
      state,
      action: PayloadAction<{ notification: NotificationType }>
    ) {
      state.notifications = [
        action.payload.notification,
        ...state.notifications,
      ];
    },
  },
});

export const notificationsActions = notificationsSlice.actions;

export default notificationsSlice;
