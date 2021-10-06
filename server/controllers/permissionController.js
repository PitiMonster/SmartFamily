const catchAsync = require("../utils/catchAsync");
const Family = require("../Family/model");
const AppError = require("../utils/appError");

exports.isFamilyMember = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const family = await Family.findById(req.params.id);

  if (!family) {
    return next(new AppError("Family with that ID does not exist", 404));
  }

  if (!family.members.includes(req.user.id)) {
    return next(
      new AppError("You do not have permission to access this data", 403)
    );
  }

  req.family = family;

  next();
});
