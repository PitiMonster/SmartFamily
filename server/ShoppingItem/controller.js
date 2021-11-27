const ShoppingItem = require("./model");
const Family = require("../Family/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");
const AppError = require("../utils/appError");

exports.getShoppingItems = catchAsync(async (req, res, next) => {
  const family = await Family.findById(req.params.familyId).populate({
    path: "shoppingList",
    select: "name count authorName checked",
  });
  return res.status(200).json({ status: "success", data: family.shoppingList });
});

exports.createShoppingItem = catchAsync(async (req, res, next) => {
  const { name, count, description } = req.body;
  const newShoppingItem = await ShoppingItem.create({
    name,
    uniqueName: req.family._id.toString() + name.toString(),
    authorName: req.user.name.toString() + req.user.surname.toString(),
    count,
    description,
  });

  req.family.shoppingList.push(newShoppingItem);
  req.family.save({ validateBeforeSave: false });

  return res.status(201).json({ status: "success", data: newShoppingItem });
});

exports.getOneShoppingItem = crudHandlers.getOne(ShoppingItem);

exports.updateShoppingItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!req.family.shoppingList.includes(id)) {
    return next(new AppError("Item with provided id not found", 404));
  }
  const shoppingItem = await ShoppingItem.findById(id);

  const { checkType } = req.body;

  if (!["check", "uncheck"].includes(checkType)) {
    return next(new AppError("Incorrect updateType provided", 400));
  }

  if (checkType === "check") {
    shoppingItem.checked = true;
  } else if (checkType === "uncheck") shoppingItem.checked = false;

  shoppingItem.save({ validateBeforeSave: false });

  return res.status(200).json({ status: "success", data: shoppingItem });
});

exports.deleteShoppingItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!req.family.shoppingList.includes(id)) {
    return next(new AppError("Item with provided id not found", 404));
  }
  const shoppingItem = await ShoppingItem.findById(id);
  await ShoppingItem.deleteOne(shoppingItem);

  if (!shoppingItem) {
    return next(new AppError("No item found with provided id", 400));
  }

  return res.status(202).json({ status: "success", data: shoppingItem });
});

exports.patchShoppingItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!req.family.shoppingList.includes(id)) {
    return next(new AppError("Item with provided id not found", 404));
  }
  const { name, count, description } = req.body;

  const shoppingItem = await ShoppingItem.findByIdAndUpdate(
    id,
    {
      name,
      count,
      description,
    },
    { new: true }
  );
  shoppingItem.save();

  return res.status(200).json({ status: "success", data: shoppingItem });
});
