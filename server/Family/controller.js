const Family = require("./model");
const User = require("../User/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");

exports.getFamilies = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "families",
    select: "name photos",
  });
  res.status(200).json({
    status: "success",
    data: user.families,
  });
});

exports.createFamily = catchAsync(async (req, res, next) => {
  // TODO create all objects for new family object

  res.status(201).json({ status: "success", data: {} });
});

exports.getOneFamily = crudHandlers.getOne(Family);
