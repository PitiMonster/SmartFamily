const CalendarEvent = require("./model");
const Family = require("../Family/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");

const schedule = require("node-schedule");
const moment = require("moment");

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

  schedule.scheduleJob(moment(date, "MM-DD-YYYY").toDate(), async () => {
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

exports.getCalendarEvent = crudHandlers.getOne(CalendarEvent);
