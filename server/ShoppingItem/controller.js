const ShoppingItem = require("./model");
const Family = require("../Family/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");

exports.getShoppingItems = catchAsync(async (req, res, next) => {
  const family = await Family.findById(req.params.familyId).populate({
    path: "shoppingList",
    select: "name count authorName",
  });

  res.status(200).json({ status: "success", data: family.shoppingList });
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

  res.status(201).json({ status: "success", data: newShoppingItem });
});

exports.getOneShoppingItem = crudHandlers.getOne(ShoppingItem);
