const express = require("express");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const expect = require("chai").expect;
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const notificationWS = require("../Websockets/notifications");
const chatWS = require("../Websockets/chat");

const mongoose = require("mongoose");
const Chat = require("../Chat/model");
const User = require("../User/model");

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
      clientSocket.once("notifications connected", (data) => {
        expect(data.status).to.equal("success");
        done();
      });

      clientSocket.emit("connect notifications", { userId: "test id" });
    });

    it("Emit notification", (done) => {
      clientSocket.once("new notification", (data) => {
        expect(data).to.has.property("type");
        expect(data).to.has.property("notification");
        expect(data.notification.status).to.equal("success");
        done();
      });
      const connectNotificationListener = () => {
        notificationWS.emitNotification({
          status: "success",
          receiver: { _id: "test2 id" },
        });
      };
      serverSocket.once("connect notifications", connectNotificationListener);
      clientSocket.emit("connect notifications", { userId: "test2 id" });
    });
  });

  describe("Test chat notifications", () => {
    before((done) => {
      const DB = process.env.TEST_DATABASE.replace(
        "<PASSWORD>",
        process.env.DATABASE_PASSWORD
      );
      mongoose
        .connect(DB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        })
        .then(() => {
          console.log("BD CONNECTED SUCCESSFUL");
          return Chat.create({
            members: ["5c0f66b979af55031b34728d", "5c0f66b979af55031b34728e"],
            _id: "5c0f66b979af55031b34728c",
          });
        })
        .then(() => {
          return User.create({
            email: "test@test.com",
            name: "testSender",
            surname: "tester",
            sex: "male",
            role: "parent",
            password: "tester1234",
            passwordConfirm: "tester1234",
            _id: "5c0f66b979af55031b34728d",
          });
        })
        .then(() => {
          return User.create({
            email: "test@test1.com",
            name: "testReceiver",
            surname: "tester",
            sex: "male",
            role: "child",
            password: "tester1234",
            passwordConfirm: "tester1234",
            _id: "5c0f66b979af55031b34728e",
          });
        })
        .then(() => {
          done();
        })
        .catch((err) => console.log(err));
    });

    describe("Test send message", () => {
      before((done) => {
        clientSocket.once("notifications connected", () => done());
        clientSocket.emit("connect notifications", {
          userId: "5c0f66b979af55031b34728e",
        });
      });

      it("Test incorrect chat id provided error", (done) => {
        chatWS.runSockets(io, serverSocket);

        const data = {
          chatId: "5c0f66b979af55031b34728b",
          message: "",
          authorId: "5c0f66b979af55031b34728d",
        };

        clientSocket.once("error occured", (response) => {
          expect(response.error).to.has.property("message");
          expect(response.error).to.has.property("statusCode");
          expect(response.error.message).to.equal(
            "No chat exists with that ID"
          );
          expect(response.error.statusCode).to.equal(404);
          done();
        });
        clientSocket.emit("send message", data);
      });
      it("Test no message provided error", (done) => {
        const data = {
          chatId: "5c0f66b979af55031b34728c",
          message: "",
          authorId: "5c0f66b979af55031b34728d",
        };

        clientSocket.once("error occured", (response) => {
          expect(response.error).to.has.property("message");
          expect(response.error).to.has.property("statusCode");
          expect(response.error.message).to.equal("No message to send provied");
          expect(response.error.statusCode).to.equal(404);
          done();
        });
        clientSocket.emit("send message", data);
      });
      it("Test message sent to chat properly", (done) => {
        const data = {
          chatId: "5c0f66b979af55031b34728c",
          message: "hello test",
          authorId: "5c0f66b979af55031b34728d",
        };

        clientSocket.once("new notification", (data) => {
          expect(data).to.has.property("type");
          expect(data).to.has.property("notification");
          expect(data.type).to.equal("message");
          expect(data.notification).to.has.property("message");
          expect(data.notification.message.text).to.equal("hello test");

          Chat.findById("5c0f66b979af55031b34728c")
            .populate("messages")
            .then((chat) => {
              expect(chat.messages).to.be.an("array");
              expect(chat.messages.length).to.equal(1);
              expect(chat.messages[0].text).to.equal("hello test");

              done();
            });
        });
        clientSocket.emit("send message", data);
      });
    });

    after((done) => {
      Chat.deleteMany()
        .then(() => User.deleteMany())
        .then(() => mongoose.disconnect())
        .then(() => done());
    });
  });
});
