import api from "../../api/api";
import { Socket } from "socket.io-client";
import { AppDispatch } from "..";
import { notificationsActions } from "./slice";
import { utilsActions } from "../utils/slice";
import { chatsActions } from "../chat/slice";
import { invitationsActions } from "../invitations/slice";

export const getNotifications = async (dispatch: AppDispatch) => {
  try {
    const response = await api.get("/notifications/");
    console.log(response, "notifications");
    dispatch(
      notificationsActions.setNotifications({
        notifications: response.data.data,
      })
    );
  } catch (err: any) {
    console.error("GET NOTIFICATIONS ERROR: ", err);
    dispatch(
      utilsActions.setAppError({
        msg: err?.response?.data?.message ?? "Server error",
      })
    );
  }
};

export const runNotificationSocketListeners = (
  socket: Socket,
  dispatch: AppDispatch
) => {
  socket.on("new notification", (data) => {
    console.log(data);
    const { type, notification } = data;
    switch (type) {
      case "message":
        const { chatId, message } = notification;
        message.author = { _id: message.author };
        dispatch(
          chatsActions.addNewMessage({
            message,
            chatId,
          })
        );
        break;
      case "notification":
        console.log("new request: ", notification);
        dispatch(notificationsActions.addNotification({ notification }));
        switch (notification.type) {
          case "invitation":
            dispatch(
              invitationsActions.addInvitation({
                invitation: notification.invitation,
              })
            );
            break;

          default:
            break;
        }
        // const { request } = notification;
        // dispatch(notificationActions.addNewRequest({ request }));
        break;
      default:
        break;
    }
  });
};

export const offNotificationSocketListeners = (socket: Socket) => {
  console.log("wyłączam listener notyfikacje");
  socket.off("new notification");
};
