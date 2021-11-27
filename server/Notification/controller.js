const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Notification = require("./model");
const User = require("../User/model");
const CalendarEvent = require("../CalendarEvent/model");
const Invitation = require("../Invitation/model");
const Task = require("../Task/model");
const Reward = require("../Reward/model");
const Budget = require("../Budget/model");

const emitNotification =
  require("../Websockets/notifications").emitNotification;

const createCalendarEventNotification = catchAsync(async (req, next) => {
  const { calendarEvent, receiver } = req.notificationData;
  const calendarEventDocument = await CalendarEvent.findById(calendarEvent);
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
  const { invitation, receiver } = req.notificationData;
  const invitationDocument = await Invitation.findById(invitation).populate(
    "family"
  );

  if (!invitationDocument) {
    return next(
      new AppError("Invitation document with provided id not found!", 404)
    );
  }

  const text = `${req.user.name} ${req.user.surname} wysłał Ci zaproszenie do rodziny ${invitationDocument.family.name}`;

  const notification = await Notification.create({
    type: "invitation",
    text,
    photo: null,
    invitation,
    receiver,
  });

  return await notification
    .populate({
      path: "invitation",
      populate: { path: "sender", select: "name surname profilePhoto" },
    })
    .execPopulate();
});
const createNewTaskNotification = catchAsync(async (req, next) => {
  const { task, receiver } = req.notificationData;
  const newTaskDocument = await Task.findById(task);

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
  const { task, receiver } = req.notificationData;
  const taskCompletedDocument = await Task.findById(task);

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

const createTaskOneHourLeftNotification = catchAsync(async (req, next) => {
  const { task, receiver } = req.notificationData;

  const taskDocument = await Task.findById(task);

  if (!taskDocument) {
    return next(new AppError("Task document with provided id not found!", 404));
  }

  text = `Pozostała jedna godzina na wykonanie zadania ${taskDocument.name}`;

  return await Notification.create({
    type: "taskOneHourLeft",
    text,
    photo: null,
    task,
    receiver,
  });
});

const createTaskTimeIsUpNotification = catchAsync(async (req, next) => {
  const { task, receiver } = req.notificationData;

  const taskDocument = await Task.findById(task);

  if (!taskDocument) {
    return next(new AppError("Task document with provided id not found!", 404));
  }

  const text = `Skończył się czas na wykonanie zadania: ${taskDocument.name}`;

  return await Notification.create({
    type: "taskTimeIsUp",
    text,
    photo: null,
    task,
    receiver,
  });
});
const createTaskApprovedNotification = catchAsync(async (req, next) => {
  const { task, receiver } = req.notificationData;

  const taskDocument = await Task.findById(task);

  if (!taskDocument) {
    return next(new AppError("Task document with provided id not found!", 404));
  }

  const text = `Potwierdzono wykonanie zadania: ${taskDocument.name}`;

  return await Notification.create({
    type: "taskApproved",
    text,
    photo: null,
    task,
    receiver,
  });
});
const createTaskRejectedNotification = catchAsync(async (req, next) => {
  const { task, receiver } = req.notificationData;

  const taskDocument = await Task.findById(task);

  if (!taskDocument) {
    return next(new AppError("Task document with provided id not found!", 404));
  }

  const text = `Odrzucono wykonanie zadania: ${taskDocument.name}`;

  return await Notification.create({
    type: "taskRejected",
    text,
    photo: null,
    task,
    receiver,
  });
});

const createRewardPurchasedNotification = catchAsync(async (req, next) => {
  const { reward, receiver } = req.notificationData;

  const rewardDocument = await Reward.findById(reward);

  if (!rewardDocument) {
    return next(
      new AppError("Reward document with provided id not found!", 404)
    );
  }

  const text = `${req.user.name} has purchased a reward ${rewardDocument.name}`;

  return await Notification.create({
    type: "rewardPurchased",
    text,
    photo: null,
    reward,
    receiver,
  });
});

const createBudgetValueExceededNotification = catchAsync(async (req, next) => {
  const { budget, receiver } = req.notificationData;

  const budgetDocument = await Budget.findById(budget);

  if (!budgetDocument) {
    return next(
      new AppError("Budget document with provided id not found!", 404)
    );
  }

  const text = `Budget ${budgetDocument.name} has been exceeded`;

  const notification = await Notification.create({
    type: "budgetExceeded",
    text,
    photo: null,
    budget,
    receiver,
  });
  return await notification.populate({ path: "budget" }).execPopulate();
});

exports.getNotifications = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate({
      path: "notifications",
    })
    .sort({ createdAt: -1 });
  return res
    .status(200)
    .json({ status: "success", data: user.notifications.reverse() });
});

exports.createNotification = catchAsync(async (req, next) => {
  const { type, receiver } = req.notificationData;

  const receiverDocument = await User.findById(receiver).populate(
    "notifications"
  );
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
    case "taskOneHourLeft":
      newNotification = await createTaskOneHourLeftNotification(req, next);
      break;
    case "taskTimeIsUp":
      newNotification = await createTaskTimeIsUpNotification(req, next);
      break;
    case "taskApproved":
      newNotification = await createTaskApprovedNotification(req, next);
      break;
    case "taskRejected":
      newNotification = await createTaskRejectedNotification(req, next);
      break;
    case "rewardPurchased":
      newNotification = await createRewardPurchasedNotification(req, next);
      break;
    case "budgetExceeded":
      newNotification = await createBudgetValueExceededNotification(req, next);
      break;
    default:
      return next(new AppError("Uknown type of notification provided!", 400));
  }

  if (!newNotification instanceof Notification) {
    return next(
      new AppError("Created notification is not a Notification model instance")
    );
  }

  if (newNotification instanceof AppError) {
    return newNotification;
  }

  receiverDocument.notifications.push(newNotification);
  await receiverDocument.save({ validateBeforeSave: false });

  emitNotification(newNotification);

  return newNotification;
});
