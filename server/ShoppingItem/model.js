const mongoose = require("mongoose");

const shoppingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Shopping Item name is required"],
  },
  uniqueName: {
    type: String,
    unique: true,
    required: [true, "Shopping Item unique name is required"],
    select: false,
  },
  authorName: {
    type: String,
    required: [true, "Author name is required"],
  },
  count: {
    type: Number,
    default: 1,
    validate: {
      validator: function (val) {
        return val > 0 && Number.isInteger(val);
      },
      message: "Count value must be positive and integer",
    },
  },
  description: String,
});

const ShoppingItem = mongoose.model("ShoppingItem", shoppingItemSchema);

module.exports = ShoppingItem;
