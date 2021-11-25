const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Expense name is required"],
  },
  value: {
    type: Number,
    required: [true, "Expense value is required"],
    validate: {
      validator: function (val) {
        return val > 0;
      },
      message: "Expense value must be positive",
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
  uniqueName: {
    type: String,
    required: [true, "Unique budget name is required"],
    unique: true,
    select: false,
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
  currentExpensesValue: {
    type: Number,
    default: 0,
  },
  renewalDate: {
    type: Date,
  },
  renewalUnit: {
    type: String,
    enum: ["days", "months", "years"],
    default: "days",
  },
  renewalUnitCount: {
    type: Number,
    default: 0,
  },
});

budgetSchema.methods.countCurrentExpensesValue = function () {
  let result = 0;
  for (expense of this.expenses) {
    result += expense.value;
  }
  return result;
};

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
