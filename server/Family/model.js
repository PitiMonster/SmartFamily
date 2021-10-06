const mongoose = require("mongoose");

const familySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Family name is required"],
    },
    memebers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    photo: {
      type: String,
    },
    chat: {
      type: mongoose.Schema.ObjectId,
      ref: "Chat",
      required: [true, "Family chat is required"],
    },
    calendarEvents: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "CalendarEvent",
      },
    ],
    budget: {
      type: mongoose.Schema.ObjectId,
      ref: "Budget",
      required: [true, "Family budget is required"],
    },
    shoppingList: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "ShoppingItem",
      },
    ],
    rewards: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Reward",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Family = mongoose.model("Family", familySchema);

module.exports = Family;
