const Family = require("./model");
const User = require("../User/model");
const Chat = require("../Chat/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");
const AppError = require("../utils/appError");

exports.getFamilies = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "families",
    select: "name photo",
    populate: {
      path: "chat",
      select: "readByMembers",
    },
  });

  console.log(user);

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

exports.getFamilyChildren = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const family = await Family.findById(id).populate({
    path: "members",
    select: "name profilePhoto points role",
  });

  // points chnge to object {
  //  familyId: pointsValue
  // }
  // eextract from that object points for concrete family

  if (!family) {
    return next(new AppError("No family found with provied id ", 404));
  }
  console.log(family);
  const children = [];
  for (member of family.members) {
    if (member.role === "child") {
      children.push(member);
    }
  }

  return res.status(200).json({ status: "success", data: children });
});

exports.getOneFamilyChild = catchAsync(async (req, res, next) => {
  const { id, childId } = req.params;
  console.log(id);
  const family = await Family.findById(id);
  // points chnge to object {
  //  familyId: pointsValue
  // }
  // eextract from that object points for concrete family

  if (!family) {
    return next(new AppError("No family found with provied id ", 404));
  }

  if (!family.members.includes(childId)) {
    return next(
      new AppError("Child with provided does not belong to family"),
      404
    );
  }

  const child = await User.findById(childId).select(
    "profilePhoto name points role"
  );
  if (!child || child.role === "parent") {
    return next(new AppError("No child found in provided family", 404));
  }
  return res.status(200).json({ status: "success", data: child });
});
