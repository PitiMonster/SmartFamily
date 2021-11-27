const Budget = require("./model");
const Family = require("../Family/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");
const AppError = require("../utils/appError");

const notificationController = require("../Notification/controller");

exports.getBudgets = catchAsync(async (req, res, next) => {
  const family = await Family.findById(req.params.familyId).populate({
    path: "budgets",
    select: "name budgetValue currentExpensesValue",
  });
  return res.status(200).json({ status: "success", data: family.budgets });
});

exports.createBudget = catchAsync(async (req, res, next) => {
  const { name, budgetValue, renewalDate, renewalUnit, renewalUnitCount } =
    req.body;
  const newBudget = await Budget.create({
    name,
    uniqueName: req.family._id.toString() + name.toString(),
    budgetValue,
    renewalDate,
    renewalUnit,
    renewalUnitCount,
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
  budget.currentExpensesValue = budget.countCurrentExpensesValue();
  budget.save({ validateBeforeSave: false });

  if (budget.currentExpensesValue > budget.budgetValue) {
    req.notificationData = {
      type: "budgetExceeded",
      receiver: req.user._id,
      budget: budget._id,
    };

    await notificationController.createNotification(req, next);
  }

  // send notification if left 10% or budget exceeded

  return res.status(201).json({ status: "success", data: budget });
});

exports.updateBudget = catchAsync(async (req, res, next) => {
  const budget = await Budget.findById(req.params.id);

  if (!budget) {
    return next(new AppError("Not budget found with provided id", 404));
  }

  const { name, budgetValue, renewalDate, renewalUnit, renewalUnitCount } =
    req.body;
  if (name) budget.name = name;
  if (budgetValue) budget.budgetValue = budgetValue;
  if (renewalDate) budget.renewalDate = renewalDate;
  if (renewalUnit) budget.renewalUnit = renewalUnit;
  if (renewalUnitCount) budget.renewalUnitCount = renewalUnitCount;
  budget.save();
  return res.status(200).json({ status: "success", data: budget });
});
