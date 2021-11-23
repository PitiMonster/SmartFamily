import { Socket } from "socket.io-client";
import { AppDispatch } from "..";

import { chatsActions } from "../chat/slice";

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
      // case 'acquaintance request':
      //   console.log('new request: ', notification);
      //   const { request } = notification;
      //   dispatch(notificationActions.addNewRequest({ request }));
      //   break;
      default:
        break;
    }
  });
};

export const offNotificationSocketListeners = (socket: Socket) => {
  console.log("wyłączam listener notyfikacje");
  socket.off("new notification");
};
