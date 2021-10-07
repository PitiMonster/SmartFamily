const mongoose = require("mongoose");

const rewardSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Reward name is required"],
  },
  uniqueName: {
    type: String,
    required: [true, "Unique name is required"],
    unique: true,
    select: false,
  },
  photo: {
    type: String,
  },
  points: {
    type: Number,
    required: [true, "Reward points value is required"],
    validate: {
      validator: function (val) {
        return val > 0;
      },
      message: "Reward points value must be positive",
    },
  },
  description: String,
});

const Reward = mongoose.model("Reward", rewardSchema);

module.exports = Reward;
