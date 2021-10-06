const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  name: {
    type: String,
  },
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
      default: [],
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
