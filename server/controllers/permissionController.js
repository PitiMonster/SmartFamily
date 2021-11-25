const catchAsync = require("../utils/catchAsync");
const Family = require("../Family/model");
const Chat = require("../Chat/model");
const AppError = require("../utils/appError");

exports.isFamilyMember = catchAsync(async (req, res, next) => {
  const id = req.params.familyId ?? req.params.id;
  console.log(id);
  const family = await Family.findById(id);

  if (!family) {
    return next(new AppError("Family with that ID does not exist", 404));
  }

  if (!family.members.includes(req.user.id)) {
    return next(
      new AppError("You do not have permission to access this data", 403)
    );
  }

  req.family = family;

  return next();
});
exports.isChatMember = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const chat = await Chat.findById(id);

  if (!chat) {
    return next(new AppError("Chat with that ID does not exist", 404));
  }

  if (!chat.members.includes(req.user.id)) {
    return next(
      new AppError("You do not have permission to access this data", 403)
    );
  }

  req.chat = chat;

  return next();
});
