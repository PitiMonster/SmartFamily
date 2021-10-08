const mongoose = require("mongoose");

const familySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Family name is required"],
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        default: [],
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
        default: [],
      },
    ],
    budgets: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Budget",
        default: [],
      },
    ],
    shoppingList: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "ShoppingItem",
        default: [],
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Task",
        default: [],
      },
    ],
    rewards: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Reward",
        default: [],
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
