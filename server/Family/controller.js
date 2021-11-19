const Family = require("./model");
const User = require("../User/model");
const Chat = require("../Chat/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");

exports.getFamilies = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "families",
    select: "name photo",
  });
  return res.status(200).json({
    status: "success",
    data: user.families,
  });
});

exports.createFamily = catchAsync(async (req, res, next) => {
  const user = req.user;

  const newChat = await Chat.create({
    name: req.body.name,
    members: [req.user.id],
  });

  const newFamily = await Family.create({
    name: req.body.name,
    members: [req.user.id],
    chat: newChat._id,
    photo: req.body.photo,
  });

  user.families.push(newFamily._id);
  user.save({ validateBeforeSave: false });

  return res.status(201).json({ status: "success", data: newFamily });
});

exports.getOneFamily = crudHandlers.getOne(Family);
