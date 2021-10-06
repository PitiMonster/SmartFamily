const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Message must belong to the author!"],
    },
    text: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
