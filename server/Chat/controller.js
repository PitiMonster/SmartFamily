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
