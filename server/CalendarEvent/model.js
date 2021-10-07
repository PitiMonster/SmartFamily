const mongoose = require("mongoose");

const calendarEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Calendar event must have name"],
  },
  uniqueName: {
    type: String,
    required: [true, "Calendar event must have unique name"],
    unique: true,
    select: false,
  },
  date: {
    type: Date,
  },
  description: String,
});

const CalendarEvent = mongoose.model("CalendarEvent", calendarEventSchema);

module.exports = CalendarEvent;
