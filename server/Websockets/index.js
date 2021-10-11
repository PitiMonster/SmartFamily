const { Server } = require("socket.io");

const runChatSockets = require("./chat");
const runNotificationsSockets = require("./notifications");

const runSockets = (server) => {
  io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => console.log("user disconnected"));
    runChatSockets(io, socket);
    runNotificationsSockets(io, socket);
  });
};

module.exports = runSockets;
