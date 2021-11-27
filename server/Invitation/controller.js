const Invitation = require("./model");
const Family = require("../Family/model");
const User = require("../User/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");
const AppError = require("../utils/appError");

const notificationController = require("../Notification/controller");

exports.getInvitations = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "invitations",
    select: "sender createdAt",
    populate: { path: "sender", select: "name surname profilePhoto" },
  });
  console.log(user);
  return res.status(200).json({ status: "success", data: user.invitations });
});

exports.createInvitation = catchAsync(async (req, res, next) => {
  const { receiverUsername, family } = req.body;

  if (req.user.role !== "parent") {
    return next(
      new AppError("Only parent is permitted to create invitation!", 403)
    );
  }

  const receiverDocument = await User.findOne({ username: receiverUsername });
  if (!receiverDocument) {
    return next(new AppError("No user found with provided username", 404));
  }

  console.log(receiverDocument);

  const familyDocument = await Family.findById(family);
  if (!familyDocument) {
    return next(new AppError("No family found with provided id", 404));
  }

  const existingInvitation = await Invitation.findOne({
    family,
    receiver: receiverDocument._id,
  });
  if (existingInvitation) {
    return next(
      new AppError("This user is already invited to this family!", 400)
    );
  }

  if (!familyDocument.members.includes(req.user.id)) {
    return next(new AppError("You are not a member of this family!", 403));
  }

  if (familyDocument.members.includes(receiverDocument._id)) {
    return next(
      new AppError("Invited user is already a member of this family", 400)
    );
  }

  const newInvitation = await Invitation.create({
    sender: req.user.id,
    receiver: receiverDocument._id,
    family,
  });

  req.notificationData = {
    type: "invitation",
    receiver: receiverDocument._id,
    invitation: newInvitation._id,
  };

  await notificationController.createNotification(req, next);

  return res.status(201).json({ status: "success", data: newInvitation });
});

exports.responseToInvitation = catchAsync(async (req, res, next) => {
  const { response, id } = req.params;

  const invitation = await Invitation.findById(id).populate({
    path: "family",
    select: "members receiver chat",
    populate: { path: "chat", select: "members" },
  });

  if (!invitation) {
    return next(new AppError("Invitation with that id not found!", 404));
  }

  console.log(invitation);
  switch (response.toString()) {
    case "accept":
      invitation.family.members.push(invitation.receiver);
      invitation.family.chat.members.push(invitation.receiver);
      req.user.families.push(invitation.family._id);
      if (req.user.role === "child")
        req.user.pointsCount.set(invitation.family._id.toString(), 0);
      await invitation.family.save({ validateBeforeSave: false });
      await invitation.family.chat.save({ validateBeforeSave: false });
      await req.user.save({ validateBeforeSave: false });
      await Invitation.deleteOne(invitation);

      // send notification - "Dołączył nowy członek rodziny!"

      break;
    case "reject":
      await Invitation.deleteOne(invitation);
      break;
    default:
      break;
  }

  return res.status(200).json({ status: "success" });
});

exports.getOneInvitation = crudHandlers.getOne(Invitation);
