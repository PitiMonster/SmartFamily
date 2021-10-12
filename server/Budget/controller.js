const Budget = require("./model");
const Family = require("../Family/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");
const AppError = require("../utils/appError");

exports.getBudgets = catchAsync(async (req, res, next) => {
  const family = await Family.findById(req.params.familyId).populate({
    path: "budgets",
    select: "name budgetValue",
  });
  return res.status(200).json({ status: "success", data: family.budgets });
});

exports.createBudget = catchAsync(async (req, res, next) => {
  const { name, budgetValue, renewalDate } = req.body;
  const newBudget = await Budget.create({
    name,
    uniqueName: req.family._id.toString() + name.toString(),
    budgetValue,
    renewalDate,
  });

  req.family.budgets.push(newBudget);
  req.family.save({ validateBeforeSave: false });

  return res.status(201).json({ status: "success", data: newBudget });
});

exports.getOneBudget = crudHandlers.getOne(Budget);

exports.addExpenseToBudget = catchAsync(async (req, res, next) => {
  const { name, price, description } = req.body;
  const newExpense = { name, value: price, description };

  const budget = await Budget.findById(req.params.id);
  if (!budget) {
    return next(new AppError("Budget with provided ID not found!", 404));
  }

  budget.expenses.push(newExpense);
  budget.save({ validateBeforeSave: false });

  return res.status(201).json({ status: "success", data: budget });
});
