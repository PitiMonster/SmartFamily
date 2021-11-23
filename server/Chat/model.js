const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  readByMembers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: [],
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
  lastMessageDate: {
    type: Date,
    default: Date.now,
  },
  photo: String,
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
