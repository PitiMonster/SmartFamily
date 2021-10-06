const mongoose = require("mongoose");

const calendarEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Calendar event must have name"],
  },
  date: {
    type: Date,
  },
  description: String,
});

const CalendarEvent = mongoose.model("CalendarEvent", calendarEventSchema);

module.exports = CalendarEvent;
