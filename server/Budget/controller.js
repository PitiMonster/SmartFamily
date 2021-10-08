const Budget = require("./model");
const Family = require("../Family/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");

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
