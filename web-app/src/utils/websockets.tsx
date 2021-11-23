import { io, Socket } from "socket.io-client";
import { AppDispatch } from "../store";

import { runNotificationSocketListeners } from "../store/notifications/actions";

let dispatch: AppDispatch;
export let socket: Socket;
export const runSocket = () => {
  if (!socket)
    socket = io("http://localhost:8080", {
      reconnectionDelay: 1000,
      reconnection: true,
      transports: ["websocket"],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });
  //   socket.emit('connect to chat', { chatId: '1234' });
  //   socket.emit('send message', {
  //     chatId: '1234',
  //     message: 'siemaaaa',
  //     authorId: localStorage.getItem('userId'),
  //   });
};

export const setDispatch = (disptachObj: AppDispatch) => {
  dispatch = disptachObj;
};

export const runAppListeners = () => {
  runNotificationSocketListeners(socket, dispatch);
};

export const runAppEmitters = (userId: string) => {
  runEmitter("connect notifications", { userId });
};

export const runListener = (listener: Function) => {
  listener(socket, dispatch);
};

export const offListener = (listener: Function) => {
  listener(socket);
};

export const runEmitter = (eventName: string, data: Object) => {
  socket.emit(eventName, data);
};

// export { socket };
