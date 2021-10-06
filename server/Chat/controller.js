const Chat = require("./model");
const crudHandlers = require("../controllers/handlers");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Message = require("./../Message/model");

exports.createChat = crudHandlers.createOne(Chat);
exports.getChat = crudHandlers.getOne(
  Chat,
  {
    path: "members",
    select: "name surname profilePhotos",
  },
  {
    path: "messages",
    populate: {
      path: "author",
      select: "profilePhotos",
    },
  }
);

exports.getAllUsersChats = catchAsync(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user.id }).select(
    "-__v -messages"
  );

  res.status(200).json({ status: "success", data: { data: chats } });
});
