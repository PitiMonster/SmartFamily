const CalendarEvent = require("./model");
const Family = require("../Family/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");

const schedule = require("node-schedule");
const moment = require("moment");

const notificationController = require("../Notification/controller");

exports.getCalendarEvents = catchAsync(async (req, res, next) => {
  const family = await Family.findById(req.params.familyId).populate({
    path: "calendarEvents",
    select: "name date",
  });
  return res
    .status(200)
    .json({ status: "success", data: family.calendarEvents });
});

exports.createCalendarEvent = catchAsync(async (req, res, next) => {
  const { name, date, description } = req.body;
  const newCalendarEvent = await CalendarEvent.create({
    name,
    uniqueName: req.family._id.toString() + name.toString(),
    date,
    description,
    author: req.user._id,
  });

  req.family.calendarEvents.push(newCalendarEvent);
  req.family.save({ validateBeforeSave: false });

  if (process.env.NODE_ENV !== "test")
    schedule.scheduleJob(moment(date).toDate(), async () => {
      // create notification calendarEvent and send it to author
      req.notificationData = {
        type: "calendarEvent",
        receiver: req.user._id,
        calendarEvent: newCalendarEvent._id,
      };

      await notificationController.createNotification(req, next);
    });

  return res.status(201).json({ status: "success", data: newCalendarEvent });
});

exports.updateCalendarEvent = catchAsync(async (req, res, next) => {
  const calendarEvent = await CalendarEvent.findById(req.params.id);

  if (!calendarEvent) {
    return next(new AppError("Not calendar event found with provided id", 404));
  }

  const { name, date, description } = req.body;
  if (name) calendarEvent.name = name;
  if (date) calendarEvent.date = date;
  if (description) calendarEvent.description = description;
  calendarEvent.save();
  return res.status(200).json({ status: "success", data: calendarEvent });
});

exports.getCalendarEvent = crudHandlers.getOne(CalendarEvent);
