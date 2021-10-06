const catchAsync = require("../utils/catchAsync");
const Family = require("../Family/model");

exports.isFamilyMember = catchAsync(async (req, res, next) => {
  const family = await Family.findById(req.params.id);

  if (!family) {
    return next(new AppError("Family with that ID does not exist", 404));
  }

  if (!family.members.contains(req.user.id)) {
    return next(
      new AppError("You do not have permission to access this data", 403)
    );
  }

  next();
});
