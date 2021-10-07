const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Expense name is required"],
  },
  uniqueName: {
    type: String,
    required: [true, "Unique expense name is required"],
    unique: true,
    select: false,
  },
  value: {
    type: Number,
    required: [true, "Expense value is required"],
    validate: {
      validator: function (val) {
        return val > 0;
      },
      message: "Expense value cannot be non-positive",
    },
  },
  description: {
    type: String,
  },
});

const budgetSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Budget name is required"],
  },
  budgetValue: {
    type: Number,
    required: [true, "Budget value is required"],
  },
  expenses: [
    {
      type: expenseSchema,
      default: [],
    },
  ],
  renewalData: {
    type: Date,
  },
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
