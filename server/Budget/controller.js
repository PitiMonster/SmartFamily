const Budget = require("./model");
const Family = require("../Family/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");
const AppError = require("./../utils/appError");

exports.getBudgets = catchAsync(async (req, res, next) => {
  const family = await Family.findById(req.params.id).populate({
    path: "budgets",
    select: "name photos",
  });

  if (!family) {
    return next(new AppError("Family with that id does not exist", 404));
  }

  res.status(200).json({ status: "success", data: family.budgets });
});

exports.createBudget = catchAsync(async (req, res, next) => {
  const { name, budgetValue, renewalData } = req.body;
  const newBudget = await Budget.create({ name, budgetValue, renewalData });

  res.status(201).json({ status: "success", data: newBudget });
});

exports.getOneBudget = crudHandlers.getOne(Budget);
