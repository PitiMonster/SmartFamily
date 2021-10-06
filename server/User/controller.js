const User = require("./model");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const crudHandlers = require("./../controllers/handlers");

const FIELDS_TO_UPDATE = ["name", "surname", "profilePhoto"];

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.filterFieldsToUpdate = (req, res, next) => {
  const body = {};
  for (field of FIELDS_TO_UPDATE) {
    req.body[field] ? (body[field] = req.body[field]) : null;
  }
  req.body = body;
  next();
};

exports.getUser = crudHandlers.getOne(User);
exports.getAllUsers = crudHandlers.getAll(User);
exports.updateUser = crudHandlers.updateOne(User);
