const expect = require("chai").expect;
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const Notification = require("../Notification/model");
const User = require("../User/model");
const CalendarEvent = require("../CalendarEvent/model");
const Invitation = require("../Invitation/model");
const Task = require("../Task/model");
const Family = require("../Family/model");
const notificationController = require("../Notification/controller");

describe("Notification Controller ", () => {
  before((done) => {
    const DB = process.env.TEST_DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD
    );
    mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => {
        console.log("BD CONNECTED SUCCESSFUL");
        return Notification.create({
          type: "calendarEvent",
          receiver: "5c0f66b979af55031b34728d",
          _id: "5c0f66b979af55031b34728c",
        });
      })
      .then(() => {
        return CalendarEvent.create({
          name: "Test calendar event",
          uniqueName: "5c0f66b979af55031b34728aTest calendar event",
          date: "12/12/2021",
          _id: "5c0f66b979af55031b34728b",
        });
      })
      .then(() => {
        return Family.create({
          name: "Test family",
          chat: "5c0f66b979af55031b34728b",
          _id: "5c0f66b979af55031b34728f",
        });
      })
      .then(() => {
        return Invitation.create({
          family: "5c0f66b979af55031b34728f",
          sender: "5c0f66b979af55031b34728d",
          receiver: "5c0f66b979af55031b34728e",
          _id: "5c0f66b979af55031b34728a",
        });
      })
      .then(() => {
        return Task.create({
          name: "Test task",
          uniqueName: "5c0f66b979af55031b34728aTest task",
          completionDate: "12/12/2021",
          points: 12,
          principal: "5c0f66b979af55031b34728d",
          contractor: "5c0f66b979af55031b34728e",
          _id: "5c0f66b979af55031b34728e",
        });
      })
      .then(() => {
        return User.create({
          email: "test@test.com",
          name: "test",
          surname: "tester",
          sex: "male",
          role: "parent",
          notifications: ["5c0f66b979af55031b34728c"],
          password: "tester1234",
          passwordConfirm: "tester1234",
          _id: "5c0f66b979af55031b34728d",
        });
      })
      .then(() => {
        done();
      })
      .catch((err) => console.log(err));
  });

  it("Test if getNotifications returns list of user notifications", (done) => {
    const req = {
      user: {
        id: "5c0f66b979af55031b34728d",
      },
    };
    const res = {
      status: (val) => {
        return {
          json: (object) => {
            return { ...object, statusCode: val };
          },
        };
      },
    };
    notificationController
      .getNotifications(req, res, () => {})
      .then((response) => {
        expect(response).to.has.property("statusCode");
        expect(response).to.has.property("status");
        expect(response).to.has.property("data");
        expect(response.statusCode).to.be.equal(200);
        expect(response.status).to.be.equal("success");
        expect(response.data).to.be.an("array");
        expect(response.data[0]._id.toString()).to.be.equal(
          "5c0f66b979af55031b34728c"
        );

        done();
      })
      .catch((err) => console.log(err));
  });

  describe("Test createNotification", () => {
    it("Test incorrect receiver id error", (done) => {
      const req = {
        notificationData: {
          type: "",
          receiver: "5c0f66b979af55031b34728e",
        },
      };
      const next = (err) => err;
      notificationController
        .createNotification(req, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(404);
          expect(res.message).to.equal("Receiver with that id does not exist!");
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test incorrect notification type error", (done) => {
      const req = {
        notificationData: {
          type: "incorrect",
          receiver: "5c0f66b979af55031b34728d",
        },
      };
      const next = (err) => err;
      notificationController
        .createNotification(req, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(400);
          expect(res.message).to.equal("Uknown type of notification provided!");
          done();
        })
        .catch((err) => console.log(err));
    });
  });

  describe("Test create calendarEvent notification", () => {
    before((done) => {
      User.findById("5c0f66b979af55031b34728d")
        .then((user) => {
          user.notifications = [];
          user.save({ validateBeforeSave: false });
        })
        .then(() => done());
    });

    it("Test incorrect calendarEvent id", (done) => {
      const req = {
        notificationData: {
          type: "calendarEvent",
          receiver: "5c0f66b979af55031b34728d",
          calendarEvent: "5c0f66b979af55031b34728a",
        },
      };
      const next = (err) => err;
      notificationController
        .createNotification(req, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(404);
          expect(res.message).to.equal(
            "CalendarEvent document with provided id not found!"
          );
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test create properly", (done) => {
      const req = {
        notificationData: {
          type: "calendarEvent",
          receiver: "5c0f66b979af55031b34728d",
          calendarEvent: "5c0f66b979af55031b34728b",
        },
      };
      const next = (err) => err;
      notificationController
        .createNotification(req, next)
        .then((response) => {
          expect(response).to.have.property("_id");

          User.findById("5c0f66b979af55031b34728d")
            .populate("notifications")
            .then((user) => {
              expect(user.notifications).to.be.an("array");
              expect(user.notifications.length).to.equal(1);
              expect(user.notifications[0]).to.has.property("_id");
              expect(user.notifications[0]._id.toString()).to.equal(
                response._id.toString()
              );
              done();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  });

  describe("Test create invitation notification", () => {
    before((done) => {
      User.findById("5c0f66b979af55031b34728d")
        .then((user) => {
          user.notifications = [];
          user.save({ validateBeforeSave: false });
        })
        .then(() => done());
    });

    it("Test incorrect notification id", (done) => {
      const req = {
        notificationData: {
          type: "invitation",
          receiver: "5c0f66b979af55031b34728d",
          invitation: "5c0f66b979af55031b34728b",
        },
      };
      const next = (err) => err;
      notificationController
        .createNotification(req, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(404);
          expect(res.message).to.equal(
            "Invitation document with provided id not found!"
          );
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test create properly", (done) => {
      const req = {
        notificationData: {
          type: "invitation",
          receiver: "5c0f66b979af55031b34728d",
          invitation: "5c0f66b979af55031b34728a",
        },
        user: {
          name: "Sender",
          surname: "sender",
        },
      };
      const next = (err) => err;
      notificationController
        .createNotification(req, next)
        .then((response) => {
          expect(response).to.have.property("_id");

          User.findById("5c0f66b979af55031b34728d")
            .populate("notifications")
            .then((user) => {
              expect(user.notifications).to.be.an("array");
              expect(user.notifications.length).to.equal(1);
              expect(user.notifications[0]).to.has.property("_id");
              expect(user.notifications[0]._id.toString()).to.equal(
                response._id.toString()
              );
              done();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  });
  describe("Test create newTask notification", () => {
    before((done) => {
      User.findById("5c0f66b979af55031b34728d")
        .then((user) => {
          user.notifications = [];
          user.save({ validateBeforeSave: false });
        })
        .then(() => done());
    });

    it("Test incorrect task id", (done) => {
      const req = {
        notificationData: {
          type: "newTask",
          receiver: "5c0f66b979af55031b34728d",
          task: "5c0f66b979af55031b34728b",
        },
      };
      const next = (err) => err;
      notificationController
        .createNotification(req, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(404);
          expect(res.message).to.equal(
            "Task document with provided id not found!"
          );
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test create properly", (done) => {
      const req = {
        notificationData: {
          type: "newTask",
          receiver: "5c0f66b979af55031b34728d",
          task: "5c0f66b979af55031b34728e",
        },
      };
      const next = (err) => err;
      notificationController
        .createNotification(req, next)
        .then((response) => {
          expect(response).to.have.property("_id");

          User.findById("5c0f66b979af55031b34728d")
            .populate("notifications")
            .then((user) => {
              expect(user.notifications).to.be.an("array");
              expect(user.notifications.length).to.equal(1);
              expect(user.notifications[0]).to.has.property("_id");
              expect(user.notifications[0]._id.toString()).to.equal(
                response._id.toString()
              );
              done();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  });
  describe("Test create taskCompleted notification", () => {
    before((done) => {
      User.findById("5c0f66b979af55031b34728d")
        .then((user) => {
          user.notifications = [];
          user.save({ validateBeforeSave: false });
        })
        .then(() => done());
    });

    it("Test incorrect task id", (done) => {
      const req = {
        notificationData: {
          type: "taskCompleted",
          receiver: "5c0f66b979af55031b34728d",
          task: "5c0f66b979af55031b34728b",
        },
      };
      const next = (err) => err;
      notificationController
        .createNotification(req, next)
        .then((res) => {
          expect(res).to.be.an("error");
          expect(res).to.has.property("statusCode");
          expect(res).to.has.property("message");
          expect(res.statusCode).to.equal(404);
          expect(res.message).to.equal(
            "Task document with provided id not found!"
          );
          done();
        })
        .catch((err) => console.log(err));
    });
    it("Test create properly", (done) => {
      const req = {
        notificationData: {
          type: "taskCompleted",
          receiver: "5c0f66b979af55031b34728d",
          task: "5c0f66b979af55031b34728e",
        },
        user: {
          name: "Sender",
          surname: "sender",
        },
      };
      const next = (err) => err;
      notificationController
        .createNotification(req, next)
        .then((response) => {
          expect(response).to.have.property("_id");

          User.findById("5c0f66b979af55031b34728d")
            .populate("notifications")
            .then((user) => {
              expect(user.notifications).to.be.an("array");
              expect(user.notifications.length).to.equal(1);
              expect(user.notifications[0]).to.has.property("_id");
              expect(user.notifications[0]._id.toString()).to.equal(
                response._id.toString()
              );
              done();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  });

  after((done) => {
    Notification.deleteMany()
      .then(() => User.deleteMany())
      .then(() => CalendarEvent.deleteMany())
      .then(() => Invitation.deleteMany())
      .then(() => Task.deleteMany())
      .then(() => Family.deleteMany())
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
