const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Invitation must have sender!"],
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Invitation must have receiver!"],
  },
  family: {
    type: mongoose.Schema.ObjectId,
    ref: "Family",
    required: [true, "Invitation must have family!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Invitation = mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;
