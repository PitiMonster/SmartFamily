const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "calendarEvent",
      "invitation",
      "newTask",
      "taskCompleted",
      "taskOneHourLeft",
      "taskTimeIsUp",
      "rewardPurchased",
      "budgetExceeded",
      "taskApproved",
      "taskRejected",
    ],
    required: [true, "Notification must have a type!"],
  },
  text: String,
  photo: String,
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: [true, "Notification must have receiver!"],
  },
  calendarEvent: {
    type: mongoose.Schema.ObjectId,
    ref: "CalendarEvent",
  },
  task: {
    type: mongoose.Schema.ObjectId,
    ref: "Task",
  },
  invitation: {
    type: mongoose.Schema.ObjectId,
    ref: "Invitation",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
