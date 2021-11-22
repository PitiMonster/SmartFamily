const Chat = require("./model");
const crudHandlers = require("../controllers/handlers");
const catchAsync = require("../utils/catchAsync");

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

exports.getAllChats = crudHandlers.getAll(
  Chat,
  (req) => {
    return { members: req.user.id };
  },
  true
);

exports.readChat = catchAsync(async (req, res, next) => {
  if (!req.chat.readByMembers.includes(req.user.id)) {
    req.chat.readByMembers.push(req.user.id);
    req.chat.save();
  }
  return res.status(200).json({ status: "success" });
});
