const Invitation = require("./model");
const Family = require("../Family/model");
const User = require("../User/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");
const AppError = require("../utils/appError");

const notificationController = require("../Notification/controller");

exports.getInvitations = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "myInvitations",
    select: "sender createdAt",
  });
  return res.status(200).json({ status: "success", data: user.myInvitations });
});

exports.createInvitation = catchAsync(async (req, res, next) => {
  const { receiver, family } = req.body;

  if (req.user.role !== "parent") {
    return next(
      new AppError("Only parent is permitted to create invitation!", 403)
    );
  }

  const receiverDocument = await User.findById(receiver);
  if (!receiverDocument) {
    return next(new AppError("No receiver found with provided id", 404));
  }

  const familyDocument = await Family.findById(family);
  if (!familyDocument) {
    return next(new AppError("No family found with provided id", 404));
  }

  const existingInvitation = await Invitation.findOne({ family, receiver });
  if (existingInvitation) {
    return next(
      new AppError("This user is already invited to this family!", 400)
    );
  }

  if (!familyDocument.members.includes(req.user.id)) {
    return next(new AppError("You are not a member of this family!", 403));
  }

  if (familyDocument.members.includes(receiver)) {
    return next(
      new AppError("Invited user is already a member of this family", 400)
    );
  }

  const newInvitation = await Invitation.create({
    sender: req.user.id,
    receiver,
    family,
  });

  req.notificationData = {
    type: "invitation",
    receiver,
    invitation: newInvitation._id,
  };

  await notificationController.createNotification(req, next);

  return res.status(201).json({ status: "success", data: newInvitation });
});

exports.getOneInvitation = crudHandlers.getOne(Invitation);
