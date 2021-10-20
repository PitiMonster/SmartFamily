const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Exercise name is required"],
  },
  uniqueName: {
    type: String,
    unique: true,
    required: [true, "Exercise unique name is requied"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  completionDate: {
    type: Date,
    required: [true, "Exercise completion date is required"],
    validate: {
      validator: function (val) {
        return val > Date.now();
      },
      message: "Completion cannot be in past",
    },
  },
  points: {
    type: Number,
    required: [true, "Exercise points is required"],
    validate: {
      validator: function (val) {
        return val > 0;
      },
      message: "Exercise points value must be positive",
    },
  },
  principal: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Exercise child is required"],
  },
  contractor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Exercise child is required"],
  },
  status: {
    type: String,
    enum: ["todo", "tocheck", "done"],
    default: "todo",
  },
  description: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
