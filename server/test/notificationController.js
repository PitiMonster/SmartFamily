const expect = require("chai").expect;
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const Notification = require("../Notification/model");
const User = require("../User/model");
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

  after((done) => {
    Notification.deleteMany()
      .then(() => User.deleteMany())
      .then(() => mongoose.disconnect())
      .then(() => done());
  });
});
