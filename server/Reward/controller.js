const Reward = require("./model");
const Family = require("../Family/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");

exports.getRewards = catchAsync(async (req, res, next) => {
  const family = await Family.findById(req.params.familyId).populate({
    path: "rewards",
    select: "name photo points",
  });
  res.status(200).json({ status: "success", data: family.rewards });
});

exports.createReward = catchAsync(async (req, res, next) => {
  const { name, photo, points, description } = req.body;
  const newReward = await Reward.create({
    name,
    uniqueName: req.family._id.toString() + name.toString(),
    photo,
    points,
    description,
  });

  req.family.rewards.push(newReward);
  req.family.save({ validateBeforeSave: false });

  res.status(201).json({ status: "success", data: newReward });
});

exports.getReward = crudHandlers.getOne(Reward);