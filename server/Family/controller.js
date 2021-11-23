const Family = require("./model");
const User = require("../User/model");
const Chat = require("../Chat/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");

exports.getFamilies = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "families",
    select: "name photo",
    populate: {
      path: "chat",
      select: "readByMembers",
    },
  });

  const userChats = [];

  for (const family of user.families) {
    userChats.push(family.chat);
    family.chat = undefined;
  }

  return res.status(200).json({
    status: "success",
    data: { families: user.families, chats: userChats },
  });
});

exports.createFamily = catchAsync(async (req, res, next) => {
  const user = req.user;

  const newChat = await Chat.create({
    name: req.body.name,
    members: [req.user.id],
    photo: req.body.photo,
    lastMessageDate: new Date(Date.now()),
  });

  console.log(newChat);

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

exports.getOneFamily = crudHandlers.getOne(Family, {
  path: "chat",
  select: "name",
});
