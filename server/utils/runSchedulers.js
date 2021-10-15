const moment = require("moment");
const schedule = require("node-schedule");

const Task = require("../Task/model");
const CalendarEvent = require("../CalendarEvent/model");

const runSchedulers = async () => {
  const allFutureTasks = await Task.find({
    completionDate: { $gt: moment().toDate() },
  }).select("completionDate name");
  const allFutureCalendarEvents = await CalendarEvent.find({
    date: { $gt: moment().toDate() },
  }).select("date name");

  for (const task of allFutureTasks) {
    if (
      moment(task.completionDate, "MM-DD-YYYY").subtract(1, "h") >=
      moment().toDate()
    )
      schedule.scheduleJob(
        moment(task.completionDate, "MM-DD-YYYY").subtract(1, "h").toDate(),
        () => {
          console.log(`${task.name}: one hour notification`);
          // create notification oneHourToCompleteTask for contractor
        }
      );

    schedule.scheduleJob(
      moment(task.completionDate, "MM-DD-YYYY").toDate(),
      () => {
        console.log(`${task.name}: run out of time notification`);

        // create notification runOutOfTimeToCompleteTask for contractor
      }
    );
  }

  for (const event of allFutureCalendarEvents) {
    schedule.scheduleJob(moment(event.date, "MM-DD-YYYY").toDate(), () => {
      console.log(`${event.name}: calendar event notification`);
      // create notification calendarEvent and send it to author
    });
  }
};

module.exports = runSchedulers;
