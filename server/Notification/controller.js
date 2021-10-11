const User = require("../User/model");
const catchAsync = require("../utils/catchAsync");

exports.getNotifications = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "notifications",
  });
  return res.status(200).json({ status: "success", data: user.notifications });
});
