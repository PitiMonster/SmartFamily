const express = require("express");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const expect = require("chai").expect;
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const notificationWS = require("../Websockets/notifications");

describe("Test websockets", () => {
  let io, serverSocket, clientSocket;

  before((done) => {
    const app = express();
    const port = process.env.TEST_PORT || 8081;
    const server = app.listen(port);
    io = new Server(server);
    clientSocket = new Client(`http://localhost:${port}`);
    io.on("connection", (socket) => {
      serverSocket = socket;
    });
    clientSocket.on("connect", done);
  });

  after(() => {
    io.close();
    clientSocket.close();
  });

  it("should work", (done) => {
    clientSocket.on("hello", (arg) => {
      expect(arg).to.equal("world");
      done();
    });
    serverSocket.emit("hello", "world");
  });

  it("should work (with ack)", (done) => {
    serverSocket.on("hi", (cb) => {
      cb("hola");
    });
    clientSocket.emit("hi", (arg) => {
      expect(arg).to.equal("hola");
      done();
    });
  });

  describe("Test notification websocket", () => {
    before((done) => {
      notificationWS.runSockets(io, serverSocket);
      done();
    });
    it("Connect notifications", (done) => {
      clientSocket.on("notifications connected", (data) => {
        expect(data.status).to.equal("success");
        clientSocket.off("notifications connected");
        done();
      });

      clientSocket.emit("connect notifications", { userId: "test id" });
    });

    it("Emit notification", (done) => {
      clientSocket.on("new notification", (data) => {
        expect(data).to.has.property("type");
        expect(data).to.has.property("notification");
        expect(data.notification.status).to.equal("success");
        done();
      });
      serverSocket.on("connect notifications", () => {
        notificationWS.emitNotification({
          status: "success",
          receiver: { _id: "test2 id" },
        });
      });
      clientSocket.emit("connect notifications", { userId: "test2 id" });
    });
  });
});
