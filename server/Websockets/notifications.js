let ioObject;

const runSockets = (io, socket) => {
  ioObject = io;

  socket?.on("connect notifications", (data) => {
    console.log("connecting notifications: ", data.userId);
    socket.join(data.userId);
  });
};

exports.emitNotification = (notificationObject) => {
  ioObject &&
    ioObject
      .to(notificationObject.receiver._id.toString())
      .emit("new notification", {
        type: "notification",
        notification: notificationObject,
      });
};

module.exports = runSockets;
