const Task = require("./model");
const Family = require("../Family/model");
const User = require("../User/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");
const AppError = require("../utils/appError");

const notificationController = require("../Notification/controller");

exports.getTasks = catchAsync(async (req, res, next) => {
  const family = await Family.findById(req.params.familyId).populate({
    path: "tasks",
    select: "name date",
  });
  return res.status(200).json({ status: "success", data: family.tasks });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const { name, completionDate, points, description, contractor } = req.body;

  const contractorDocument = await User.findById(contractor);

  if (!contractorDocument || contractorDocument.role !== "child") {
    return next(new AppError("Task contractor can be child only!", 400));
  }

  if (req.user.role !== "parent") {
    return next(new AppError("Task principal can be parent only!", 400));
  }

  const newTask = await Task.create({
    name,
    uniqueName: req.family._id.toString() + name.toString(),
    completionDate,
    points,
    contractor,
    principal: req.user._id,
    description,
  });

  req.notificationData = {
    type: "newTask",
    receiver: contractor,
    task: newTask._id,
  };

  req.family.tasks.push(newTask);
  req.family.save({ validateBeforeSave: false });

  await notificationController.createNotification(req, next);

  return res.status(201).json({ status: "success", data: newTask });
});

exports.getTask = crudHandlers.getOne(Task);
