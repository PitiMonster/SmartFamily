const CalendarEvent = require("./model");
const Family = require("../Family/model");
const catchAsync = require("../utils/catchAsync");
const crudHandlers = require("../controllers/handlers");

exports.getCalendarEvents = catchAsync(async (req, res, next) => {
  const family = await Family.findById(req.params.familyId).populate({
    path: "calendarEvents",
    select: "name date",
  });
  res.status(200).json({ status: "success", data: family.calendarEvents });
});

exports.createCalendarEvent = catchAsync(async (req, res, next) => {
  const { name, date, description } = req.body;
  const newCalendarEvent = await CalendarEvent.create({
    name,
    uniqueName: req.family._id.toString() + name.toString(),
    date,
    description,
  });

  req.family.calendarEvents.push(newCalendarEvent);
  req.family.save({ validateBeforeSave: false });

  res.status(201).json({ status: "success", data: newCalendarEvent });
});

exports.getCalendarEvent = crudHandlers.getOne(CalendarEvent);
