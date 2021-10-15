const Reward = require("./model");
const Family = require("../Family/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");
const AppError = require("../utils/appError");

exports.getRewards = catchAsync(async (req, res, next) => {
  const family = await Family.findById(req.params.familyId).populate({
    path: "rewards",
    select: "name photo points",
  });
  return res.status(200).json({ status: "success", data: family.rewards });
});

exports.createReward = catchAsync(async (req, res, next) => {
  const { name, photo, points, description } = req.body;

  if (req.user.role !== "parent") {
    return next(
      new AppError("Only parent member is permitted to create reward!", 403)
    );
  }

  const newReward = await Reward.create({
    name,
    uniqueName: req.family._id.toString() + name.toString(),
    photo,
    points,
    description,
  });

  req.family.rewards.push(newReward);
  req.family.save({ validateBeforeSave: false });

  return res.status(201).json({ status: "success", data: newReward });
});

exports.purchaseReward = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (req.user.role !== "child") {
    return next(new AppError("Only child is permitted to buy reward!", 403));
  }

  const reward = await Reward.findById(id);
  if (!reward) {
    return next(new AppError("No reward document found with provided id", 404));
  }

  if (req.user.pointsCount < reward.points) {
    return next(
      new AppError(
        "You do not have enough points to purchase this reward!",
        400
      )
    );
  }

  req.user.pointsCount -= reward.points;
  req.user.save({ validateBeforeSave: false });

  await Reward.deleteOne({ _id: id });

  return res.status(204);
});

exports.getReward = crudHandlers.getOne(Reward);
