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

  const next = (err) => {
    throw err;
  };

  for (const task of allFutureTasks) {
    if (
      moment(task.completionDate).subtract(1, "h").toDate() >= moment().toDate()
    )
      schedule.scheduleJob(
        moment(task.completionDate).subtract(1, "h").toDate(),
        async () => {
          // create notification oneHourToCompleteTask for contractor
          const req = {
            notificationData: {
              type: "taskOneHourLeft",
              receiver: task.contractor,
              task: task._id,
            },
          };

          await notificationController.createNotification(req, next);
        }
      );
    if (moment(task.completionDate).toDate() >= moment().toDate())
      schedule.scheduleJob(moment(task.completionDate).toDate(), async () => {
        // create notification runOutOfTimeToCompleteTask for contractor
        const req = {
          notificationData: {
            type: "taskTimeIsUp",
            receiver: task.contractor,
            task: task._id,
          },
        };

        await notificationController.createNotification(req, next);
      });
  }

  for (const event of allFutureCalendarEvents) {
    if (moment(event.date).toDate() >= moment().toDate())
      schedule.scheduleJob(moment(event.date).toDate(), async () => {
        console.log(`${event.name}: calendar event notification`);
        // create notification calendarEvent and send it to author
        const req = {
          notificationData: {
            type: "calendarEvent",
            receiver: event.author,
            calendarEvent: newCalendarEvent._id,
          },
        };

        await notificationController.createNotification(req, next);
      });
  }
};

module.exports = runSchedulers;
