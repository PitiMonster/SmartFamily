const { Server } = require("socket.io");

const runChatSockets = require("./chat");

const runSockets = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => console.log("user disconnected"));
    runChatSockets(io, socket);
  });
};

module.exports = runSockets;
