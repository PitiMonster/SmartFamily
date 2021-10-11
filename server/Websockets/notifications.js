let ioObject;

exports.runSockets = (io, socket) => {
  ioObject = io;

  socket?.on("connect notifications", (data) => {
    console.log("connecting notifications: ", data.userId);
    socket.join(data.userId);
    socket.emit("notifications connected", { status: "success" });
  });
};

exports.emitNotification = (notificationObject) => {
  ioObject
    ?.to(notificationObject.receiver._id.toString())
    .emit("new notification", {
      type: "notification",
      notification: notificationObject,
    });
};
