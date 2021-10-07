const Exercise = require("./model");
const Family = require("../Family/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");

exports.getExercises = catchAsync(async (req, res, next) => {
  const family = await Family.findById(req.params.familyId).populate({
    path: "exercises",
    select: "name date",
  });
  return res.status(200).json({ status: "success", data: family.exercises });
});

exports.createExercise = catchAsync(async (req, res, next) => {
  const { name, completionDate, points, description } = req.body;
  const newExercise = await Exercise.create({
    name,
    uniqueName: req.family._id.toString() + name.toString(),
    completionDate,
    points,
    description,
  });

  req.family.exercises.push(newExercise);
  req.family.save({ validateBeforeSave: false });

  return res.status(201).json({ status: "success", data: newExercise });
});

exports.getExercise = crudHandlers.getOne(Exercise);
