const Message = require("../Message/model");
const Chat = require("../Chat/model");
const AppError = require("../utils/appError");

exports.runSockets = (io, socket) => {
  socket.on("send message", async (data) => {
    const { chatId, message, authorId } = data;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return socket.emit("error occured", {
        error: { message: "No chat exists with that ID", statusCode: 404 },
      });
    }

    if (!message) {
      return socket.emit("error occured", {
        error: { message: "No message to send provied", statusCode: 404 },
      });
    }

    const newMessage = await Message.create({
      author: authorId,
      text: message,
    });

    chat.messages.push(newMessage);
    chat.save();
    for (userId of chat.members) {
      io.to(userId.toString()).emit("new notification", {
        type: "message",
        notification: {
          message: newMessage,
          chatId,
        },
      });
    }
  });
};
