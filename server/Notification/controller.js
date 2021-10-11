const Notification = require("./model");
const User = require("../User/model");
const CalendarEvent = require("../CalendarEvent/model");
const Invitation = require("../Invitation/model");
const Task = require("../Task/model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const emitNotification = require("../Websockets/notifications");

const createCalendarEventNotification = catchAsync(async (req, next) => {
  const { calendarEvent, receiver } = req.body;
  const calendarEventDocument = CalendarEvent.findById(calendarEvent);

  if (!calendarEventDocument) {
    return next(
      new AppError("CalendarEvent document with provided id not found!", 404)
    );
  }

  const text = `Przypomnienie o ${calendarEventDocument.name}`;

  return await Notification.create({
    type: "calendarEvent",
    text,
    photo: null,
    receiver,
    calendarEvent,
  });
});
const createInvitationNotification = catchAsync(async (req, next) => {
  const { invitation, receiver } = req.body;
  const invitationDocument = Invitation.findById(invitation).populate("family");

  if (!invitationDocument) {
    return next(
      new AppError("Invitation document with provided id not found!", 404)
    );
  }

  const text = `${req.user.name} ${req.user.surname} wysłał Ci zaproszenie do rodziny ${invitation.family.name}`;

  return await Notification.create({
    type: "invitation",
    text,
    photo: null,
    invitation,
    receiver,
  });
});
const createNewTaskNotification = catchAsync(async (req, next) => {
  const { task, receiver } = req.body;
  const newTaskDocument = Task.findById(task);

  if (!newTaskDocument) {
    return next(new AppError("Task document with provided id not found!", 404));
  }

  const text = "Przypisano Ci nowe zadanie!";

  return await Notification.create({
    type: "newTask",
    text,
    photo: null,
    task,
    receiver,
  });
});
const createTaskCompletedNotification = catchAsync(async (req, next) => {
  const { task, receiver } = req.body;
  const taskCompletedDocument = Task.findById(task);

  if (!taskCompletedDocument) {
    return next(new AppError("Task document with provided id not found!", 404));
  }

  const text = `${req.user.name} ${req.user.surname} ukończył zadanie ${taskCompletedDocument.name}`;

  return await Notification.create({
    type: "taskCompleted",
    text,
    photo: null,
    task,
    receiver,
  });
});

exports.getNotifications = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "notifications",
  });
  return res.status(200).json({ status: "success", data: user.notifications });
});

exports.createNotification = catchAsync(async (req, next) => {
  const { type, receiver } = req.body;

  const receiverDocument = User.findById(receiver);

  if (!receiverDocument) {
    return next(new AppError("Receiver with that id does not exist!", 404));
  }

  let newNotification;

  switch (type) {
    case "calendarEvent":
      newNotification = await createCalendarEventNotification(req, next);
      break;
    case "invitation":
      newNotification = await createInvitationNotification(req, next);
      break;
    case "newTask":
      newNotification = await createNewTaskNotification(req, next);
      break;
    case "taskCompleted":
      newNotification = await createTaskCompletedNotification(req, next);
      break;
    default:
      return next(new AppError("Uknown type of notification provided!", 400));
  }

  if (!newNotification instanceof Notification) {
    return next(
      new AppError("Created notification is not a Notification model instance")
    );
  }

  emitNotification(newNotification);
});
